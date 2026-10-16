import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    deliveryMode: z.ZodDefault<z.ZodLiteral<"simulation-only">>;
    applicability: z.ZodDefault<z.ZodRecord<z.ZodEffects<z.ZodString, string, string>, z.ZodObject<{
        status: z.ZodEnum<["applicable", "not_applicable"]>;
        reason: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        status: "not_applicable" | "applicable";
        reason: string;
    }, {
        status: "not_applicable" | "applicable";
        reason: string;
    }>>>;
    features: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        source: z.ZodDefault<z.ZodString>;
        areaIds: z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
        required: z.ZodDefault<z.ZodBoolean>;
        implementation: z.ZodDefault<z.ZodEnum<["present", "missing", "unknown"]>>;
        evidence: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        required: boolean;
        id: string;
        title: string;
        source: string;
        areaIds: string[];
        implementation: "unknown" | "present" | "missing";
        evidence: string;
    }, {
        id: string;
        title: string;
        areaIds: string[];
        required?: boolean | undefined;
        source?: string | undefined;
        implementation?: "unknown" | "present" | "missing" | undefined;
        evidence?: string | undefined;
    }>, "many">>;
    runners: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        adapter: z.ZodEnum<["project", "playwright", "gitleaks", "semgrep", "osv"]>;
        sandbox: z.ZodEnum<["docker", "macos-offline-node"]>;
        command: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        image: z.ZodOptional<z.ZodString>;
        rules: z.ZodOptional<z.ZodString>;
        harnessDirectory: z.ZodOptional<z.ZodString>;
        timeoutMs: z.ZodDefault<z.ZodNumber>;
        memoryMb: z.ZodDefault<z.ZodNumber>;
        cpus: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        adapter: "project" | "playwright" | "gitleaks" | "semgrep" | "osv";
        sandbox: "docker" | "macos-offline-node";
        timeoutMs: number;
        memoryMb: number;
        cpus: number;
        command?: string[] | undefined;
        image?: string | undefined;
        rules?: string | undefined;
        harnessDirectory?: string | undefined;
    }, {
        id: string;
        adapter: "project" | "playwright" | "gitleaks" | "semgrep" | "osv";
        sandbox: "docker" | "macos-offline-node";
        command?: string[] | undefined;
        image?: string | undefined;
        rules?: string | undefined;
        harnessDirectory?: string | undefined;
        timeoutMs?: number | undefined;
        memoryMb?: number | undefined;
        cpus?: number | undefined;
    }>, "many">>;
    scenarios: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        areaIds: z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
        featureIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        expected: z.ZodString;
        required: z.ZodDefault<z.ZodBoolean>;
        severity: z.ZodDefault<z.ZodEnum<["critical", "high", "medium", "low", "info"]>>;
        evidenceType: z.ZodDefault<z.ZodEnum<["observed", "simulated", "static_review"]>>;
        runner: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        expected: string;
        required: boolean;
        id: string;
        title: string;
        areaIds: string[];
        featureIds: string[];
        severity: "critical" | "high" | "medium" | "low" | "info";
        evidenceType: "observed" | "simulated" | "static_review";
        runner: string;
    }, {
        expected: string;
        id: string;
        title: string;
        areaIds: string[];
        runner: string;
        required?: boolean | undefined;
        featureIds?: string[] | undefined;
        severity?: "critical" | "high" | "medium" | "low" | "info" | undefined;
        evidenceType?: "observed" | "simulated" | "static_review" | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    schemaVersion: 1;
    deliveryMode: "simulation-only";
    applicability: Record<string, {
        status: "not_applicable" | "applicable";
        reason: string;
    }>;
    features: {
        required: boolean;
        id: string;
        title: string;
        source: string;
        areaIds: string[];
        implementation: "unknown" | "present" | "missing";
        evidence: string;
    }[];
    runners: {
        id: string;
        adapter: "project" | "playwright" | "gitleaks" | "semgrep" | "osv";
        sandbox: "docker" | "macos-offline-node";
        timeoutMs: number;
        memoryMb: number;
        cpus: number;
        command?: string[] | undefined;
        image?: string | undefined;
        rules?: string | undefined;
        harnessDirectory?: string | undefined;
    }[];
    scenarios: {
        expected: string;
        required: boolean;
        id: string;
        title: string;
        areaIds: string[];
        featureIds: string[];
        severity: "critical" | "high" | "medium" | "low" | "info";
        evidenceType: "observed" | "simulated" | "static_review";
        runner: string;
    }[];
}, {
    schemaVersion: 1;
    deliveryMode?: "simulation-only" | undefined;
    applicability?: Record<string, {
        status: "not_applicable" | "applicable";
        reason: string;
    }> | undefined;
    features?: {
        id: string;
        title: string;
        areaIds: string[];
        required?: boolean | undefined;
        source?: string | undefined;
        implementation?: "unknown" | "present" | "missing" | undefined;
        evidence?: string | undefined;
    }[] | undefined;
    runners?: {
        id: string;
        adapter: "project" | "playwright" | "gitleaks" | "semgrep" | "osv";
        sandbox: "docker" | "macos-offline-node";
        command?: string[] | undefined;
        image?: string | undefined;
        rules?: string | undefined;
        harnessDirectory?: string | undefined;
        timeoutMs?: number | undefined;
        memoryMb?: number | undefined;
        cpus?: number | undefined;
    }[] | undefined;
    scenarios?: {
        expected: string;
        id: string;
        title: string;
        areaIds: string[];
        runner: string;
        required?: boolean | undefined;
        featureIds?: string[] | undefined;
        severity?: "critical" | "high" | "medium" | "low" | "info" | undefined;
        evidenceType?: "observed" | "simulated" | "static_review" | undefined;
    }[] | undefined;
}>;
export type Config = z.infer<typeof configSchema>;
export type RunnerConfig = Config['runners'][number];
export declare function validateConfig(raw: unknown): Config;
export declare function loadConfig(file?: string): Promise<{
    config: Config;
    configHash: string;
}>;
