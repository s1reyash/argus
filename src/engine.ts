import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { areaById, VERSION } from './catalog.js';
import type { Config } from './config.js';
import { inspectProject } from './inspect.js';
import { runIsolated } from './runner.js';
import { hash, inside, sanitize } from './safety.js';
import { reportMarkdown, compareRuns } from './report.js';
import type { Inspection, Run, Scenario, ScenarioResult } from './types.js';

export class Engine {
  private active=new Map<string,{run:Run;abort:AbortController;done:Promise<Run>}>();
  private launching=false;
  private constructor(readonly root:string,readonly out:string,readonly config:Config,readonly configHash:string,readonly execute:boolean) {}
  static async create(rootInput:string,outInput:string,config:Config,configHash:string,execute=false):Promise<Engine> {
    const root=await fs.realpath(rootInput);
    let ancestor=path.resolve(outInput);
    while(!(await fs.lstat(ancestor).catch(()=>null))) ancestor=path.dirname(ancestor);
    if(inside(root,path.resolve(outInput)) || inside(root,await fs.realpath(ancestor))) throw new Error('Report directory must be outside the application root');
    await fs.mkdir(outInput,{recursive:true,mode:0o700});
    const out=await fs.realpath(outInput);
    if(inside(root,out)) throw new Error('Report directory must be outside the application root to avoid recursive inspection or snapshotting');
    if((await fs.lstat(outInput)).isSymbolicLink()) throw new Error('Report directory cannot be a symlink');
    const stat=await fs.stat(out);
    if(process.platform!=='win32' && ((stat.mode & 0o077)!==0 || stat.uid!==process.getuid?.())) throw new Error('Use a new private report directory owned by the current user; existing shared directory permissions are never changed');
    return new Engine(root,out,config,configHash,execute);
  }
  inspect():Promise<Inspection> { return inspectProject(this.root,this.config,this.execute); }
  private async persist(run:Run):Promise<void> {
    const safe=sanitize(run), base=path.join(this.out,run.id);
    const temporary=base+'.'+randomUUID();
    await fs.writeFile(temporary+'.json',JSON.stringify(safe,null,2)+'\n',{mode:0o600,flag:'wx'});await fs.rename(temporary+'.json',base+'.json');
    await fs.writeFile(temporary+'.md',reportMarkdown(safe),{mode:0o600,flag:'wx'});await fs.rename(temporary+'.md',base+'.md');
  }
  async start(profile:'full'|'affected'='full',selected?:string[]):Promise<{runId:string;status:string}> {
    if(this.launching || [...this.active.values()].some(x=>x.run.status==='running')) throw new Error('One run at a time per server; cancel or wait for the active run');
    if(profile==='affected' && !selected?.length) throw new Error('Affected profile requires explicit scenario ids selected by the host/CI');
    if(selected?.some(id=>!this.config.scenarios.some(s=>s.id===id))) throw new Error('Unknown selected scenario identifier');
    if(profile==='full' && selected) throw new Error('Full profile cannot silently omit configured scenarios');
    this.launching=true;
    try {
    const inspection=await this.inspect(), id=randomUUID();
    const run:Run={schemaVersion:1,catalogVersion:VERSION,id,status:'running',startedAt:new Date().toISOString(),revision:inspection.revision,configHash:this.configHash,profile,inspection,results:[],findings:[...inspection.findings],areas:inspection.areas,readiness:'incomplete',realExternalDelivery:'unverified',errors:[],featureCoverage:[],prioritizedFixes:[]};
    this.recompute(run);
    const abort=new AbortController();await this.persist(run);
    const entry={run,abort,done:Promise.resolve(run)};this.active.set(id,entry);
    entry.done=this.perform(run,abort.signal,selected).finally(()=>{this.active.delete(id);});
    return {runId:id,status:'running'};
    } finally { this.launching=false; }
  }
  private async perform(run:Run,signal:AbortSignal,selected?:string[]):Promise<Run> {
    try {
      const scenarios=this.config.scenarios;
      for(const runner of this.config.runners) {
        // A runner is an indivisible suite: never hide other cases it actually executes.
        const assigned=scenarios.filter(s=>s.runner===runner.id);
        if(selected && !assigned.some(s=>selected.includes(s.id))) continue;
        if(!assigned.length) continue;
        let results:ScenarioResult[];
        if(signal.aborted || !this.execute) results=assigned.map(s=>({...s,evidenceType:'unverified',outcome:'blocked',observed:signal.aborted?'Cancelled':'Execution disabled: start the CLI/server with --execute and reviewed configuration',evidence:'No execution performed',durationMs:0}));
        else results=await runIsolated(this.root,runner,assigned,signal);
        run.results.push(...results);this.recompute(run);await this.persist(run);
      }
      for(const s of scenarios) if(!run.results.some(r=>r.id===s.id)) run.results.push({...s,evidenceType:'unverified',outcome:'not_run',observed:'Not selected in this run',evidence:'No fresh execution evidence',durationMs:0});
      const end=await this.inspect();
      if(end.revision!==run.revision) { run.errors.push('Inspected source changed during the run; results are not a verification of the current revision.');run.status='error'; }
      else run.status=signal.aborted?'cancelled':'completed';
    } catch(error) { run.status=signal.aborted?'cancelled':'error';run.errors.push(error instanceof Error?error.message:String(error)); }
    this.recompute(run);run.finishedAt=new Date().toISOString();await this.persist(run);return sanitize(run);
  }
  private recompute(run:Run):void {
    run.findings=[...run.inspection.findings];
    for(const r of run.results.filter(r=>r.outcome==='failed')) {
      const area=areaById(r.areaIds[0]!);
      const scanner=this.config.runners.find(x=>x.id===r.runner)?.adapter;
      const suspected=scanner && ['gitleaks','semgrep','osv'].includes(scanner);
      run.findings.push({id:'scenario-'+r.id,fingerprint:hash('scenario:'+r.id),areaIds:r.areaIds,featureIds:r.featureIds,title:r.title,kind:suspected?'suspected_weakness':'functional_defect',severity:r.severity,confidence:suspected?'medium':'high',location:'scenario:'+r.id,expected:r.expected,observed:r.observed,evidence:r.evidence,reproduction:'Run the reviewed scenario '+r.id+' through its isolated runner '+r.runner+'.',likelyCause:'The configured acceptance assertion failed; review evidence before choosing a root cause.',remediation:area.remediation,verification:'Re-run '+r.id+' with unchanged acceptance criteria after correction.'});
    }
    const priority=['critical','high','medium','low','info'];
    run.findings.sort((a,b)=>priority.indexOf(a.severity)-priority.indexOf(b.severity));
    run.prioritizedFixes=run.findings.map(f=>({findingId:f.id,severity:f.severity,correction:f.remediation,verification:f.verification}));
    run.featureCoverage=run.inspection.features.map(f=>{
      const results=run.results.filter(r=>r.featureIds.includes(f.id));
      return {featureId:f.id,scenarioIds:results.map(r=>r.id),verificationGap:!results.length?'No configured scenario executed for this feature':results.some(r=>['blocked','not_run'].includes(r.outcome))?'Some feature scenarios are blocked or untested':null};
    });
    run.areas=run.inspection.areas.map(a=>{
      const relevant=run.results.filter(r=>r.areaIds.includes(a.id));
      let outcome=a.outcome;
      if(a.applicability==='not_applicable') outcome='not_applicable';
      else if(relevant.some(r=>r.outcome==='failed') || run.findings.some(f=>f.areaIds.includes(a.id))) outcome='failed';
      else if(relevant.some(r=>r.outcome==='blocked')) outcome='blocked';
      else if(!relevant.length || relevant.some(r=>r.outcome==='not_run')) outcome='not_run';
      else if(relevant.every(r=>r.outcome==='passed')) outcome='passed';
      const evidenceTypes=relevant.map(r=>r.evidenceType);
      if(run.inspection.findings.some(f=>f.areaIds.includes(a.id)))evidenceTypes.push('static_review');
      return {...a,outcome,evidenceTypes:[...new Set(evidenceTypes)]};
    });
    const requiredFeatures=run.inspection.features.filter(f=>f.required);
    const featureGap=requiredFeatures.some(f=>!run.results.some(r=>r.featureIds.includes(f.id) && r.outcome==='passed'));
    const hardFailure=run.findings.some(f=>['critical','high'].includes(f.severity)) || run.results.some(r=>r.required && r.outcome==='failed');
    const incomplete=run.status!=='completed' || run.errors.length>0 || run.inspection.truncated || !run.inspection.filesScanned || !run.results.length || featureGap || run.areas.some(a=>a.applicability==='unknown' || ['not_run','blocked','failed'].includes(a.outcome)) || run.results.some(r=>r.required && r.outcome!=='passed');
    run.readiness=hardFailure?'blocked':incomplete?'incomplete':'meets_configured_checks';
  }
  async get(id:string):Promise<Run> {
    if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(id)) throw new Error('Invalid run identifier');
    const live=this.active.get(id);if(live) return sanitize(structuredClone(live.run));
    const file=path.join(this.out,id+'.json');const stat=await fs.lstat(file);
    if(!stat.isFile() || stat.isSymbolicLink() || stat.size>30_000_000) throw new Error('Invalid report file');
    const run=JSON.parse(await fs.readFile(file,'utf8')) as Run;
    if(run.id!==id || run.inspection?.root!==this.root || run.schemaVersion!==1) throw new Error('Report does not belong to the authorized project');
    if(run.status==='running') {run.status='error';run.readiness='incomplete';run.errors.push('Run was interrupted by server/process shutdown; no completion established.');}
    return sanitize(run);
  }
  async wait(id:string):Promise<Run> { return this.active.get(id)?.done ?? this.get(id); }
  async cancel(id:string):Promise<object> {await this.get(id);const live=this.active.get(id);const running=live?.run.status==='running';if(running)live.abort.abort();return {runId:id,cancellationRequested:running};}
  async close():Promise<void> {const entries=[...this.active.values()];for(const e of entries)e.abort.abort();await Promise.allSettled(entries.map(e=>e.done));}
  async compare(before:string,after:string):Promise<object> {return compareRuns(await this.get(before),await this.get(after));}
}
