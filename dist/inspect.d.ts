import type { Config } from './config.js';
import type { Inspection } from './types.js';
export declare function inspectProject(rootInput: string, config: Config, execute?: boolean): Promise<Inspection>;
