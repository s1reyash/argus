import type { Config } from './config.js';
import type { Inspection, Run } from './types.js';
export declare class Engine {
    readonly root: string;
    readonly out: string;
    readonly config: Config;
    readonly configHash: string;
    readonly execute: boolean;
    private active;
    private launching;
    private constructor();
    static create(rootInput: string, outInput: string, config: Config, configHash: string, execute?: boolean): Promise<Engine>;
    inspect(): Promise<Inspection>;
    private persist;
    start(profile?: 'full' | 'affected', selected?: string[]): Promise<{
        runId: string;
        status: string;
    }>;
    private perform;
    private recompute;
    get(id: string): Promise<Run>;
    wait(id: string): Promise<Run>;
    cancel(id: string): Promise<object>;
    close(): Promise<void>;
    compare(before: string, after: string): Promise<object>;
}
