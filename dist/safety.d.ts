export declare const hash: (text: string | Buffer) => string;
export declare function inside(root: string, target: string): boolean;
export declare function contained(root: string, target: string): Promise<string>;
export declare const OMIT: Set<string>;
export declare function excluded(name: string): boolean;
export declare function redact(value: string): string;
export declare function sanitize<T>(value: T): T;
export interface SourceFile {
    relative: string;
    absolute: string;
    content: string;
}
export declare function readSources(root: string, limits?: {
    files: number;
    bytes: number;
}): Promise<{
    files: SourceFile[];
    truncated: boolean;
}>;
export declare function snapshot(root: string, dest: string): Promise<void>;
export declare function markdown(value: string): string;
