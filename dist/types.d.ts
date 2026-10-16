export type Outcome = 'passed' | 'failed' | 'blocked' | 'not_run' | 'not_applicable';
export type EvidenceType = 'observed' | 'simulated' | 'static_review' | 'unverified';
export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export interface Area {
    id: string;
    number: number;
    title: string;
    group: string;
    signals: string[];
    applicability: string;
    prerequisites: string[];
    failureExamples: string[];
    testApproaches: string[];
    expectedOutcome: string;
    evidenceRequirements: string[];
    remediation: string;
    verification: string;
    references: string[];
}
export interface Feature {
    id: string;
    title: string;
    source: string;
    areaIds: string[];
    origin: 'discovered' | 'declared';
    required: boolean;
}
export interface Scenario {
    id: string;
    title: string;
    areaIds: string[];
    featureIds: string[];
    expected: string;
    required: boolean;
    severity: Severity;
    evidenceType: EvidenceType;
    runner: string;
}
export interface Finding {
    id: string;
    fingerprint: string;
    areaIds: string[];
    featureIds: string[];
    title: string;
    kind: 'functional_defect' | 'security_vulnerability' | 'suspected_weakness' | 'missing_requirement' | 'suggested_improvement' | 'verification_gap';
    severity: Severity;
    confidence: 'high' | 'medium' | 'low';
    location: string;
    expected: string;
    observed: string;
    evidence: string;
    reproduction: string;
    likelyCause: string;
    remediation: string;
    verification: string;
}
export interface ScenarioResult extends Scenario {
    outcome: Outcome;
    observed: string;
    evidence: string;
    durationMs: number;
}
export interface Coverage {
    id: string;
    title: string;
    applicability: 'applicable' | 'unknown' | 'not_applicable';
    reason: string;
    outcome: Outcome;
    scenarioIds: string[];
    evidenceTypes: EvidenceType[];
}
export interface Inspection {
    root: string;
    revision: string;
    filesScanned: number;
    truncated: boolean;
    limitations: string[];
    features: Feature[];
    areas: Coverage[];
    scenarios: Scenario[];
    findings: Finding[];
    proposedScenarios: {
        id: string;
        areaId: string;
        featureIds: string[];
        target: string;
        failureExample: string;
        expected: string;
        steps: string[];
        prerequisites: string[];
    }[];
    capabilities: {
        node: string;
        platform: string;
        executionEnabled: boolean;
        sandbox: string;
        runners: string[];
    };
}
export interface Run {
    schemaVersion: 1;
    catalogVersion: string;
    id: string;
    status: 'running' | 'completed' | 'cancelled' | 'error';
    startedAt: string;
    finishedAt?: string;
    revision: string;
    configHash: string;
    profile: 'full' | 'affected';
    inspection: Inspection;
    results: ScenarioResult[];
    findings: Finding[];
    areas: Coverage[];
    readiness: 'blocked' | 'incomplete' | 'meets_configured_checks';
    featureCoverage: {
        featureId: string;
        scenarioIds: string[];
        verificationGap: string | null;
    }[];
    prioritizedFixes: {
        findingId: string;
        severity: Severity;
        correction: string;
        verification: string;
    }[];
    realExternalDelivery: 'unverified';
    errors: string[];
}
