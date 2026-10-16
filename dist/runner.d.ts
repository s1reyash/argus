import type { RunnerConfig } from './config.js';
import type { Scenario, ScenarioResult } from './types.js';
interface ProcessResult {
    code: number | null;
    output: string;
    stopped: string;
}
export declare function parseAdapterResults(raw: unknown, r: RunnerConfig, scenarios: Scenario[], execution: ProcessResult, elapsed: number): ScenarioResult[];
export declare function runIsolated(root: string, runner: RunnerConfig, scenarios: Scenario[], signal: AbortSignal): Promise<ScenarioResult[]>;
export {};
