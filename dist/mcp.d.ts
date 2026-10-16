import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Engine } from './engine.js';
export declare function serve(engine: Engine): Promise<McpServer>;
