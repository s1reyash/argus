# Evidence, readiness and remediation

Use five outcomes: passed, failed, blocked, not_run, not_applicable. Classify evidence as observed, simulated, static_review or unverified. Applicability is applicable, unknown or explicitly not_applicable. Report unknown applicability as incomplete.

An area passes only its configured assertions; the report must retain that qualifier. A clean scanner run covers the configured rules, files and database vintage, not the entire security area. A returned status 200, mocked success or absence of a warning never proves full user-journey success.

For each finding supply affected feature/area, location, expected and observed behavior, reproduction, evidence, severity, confidence, likely cause, correction and verification. Rank by impact and exposure. Separate confirmed defects from source-pattern hypotheses. Contextual improvements and missing requirements are separate categories. Do not create product requirements merely to fill the catalog.

Engine gates: high/critical findings or failed required scenarios yield blocked; required unverified results, unknown or untested areas, no execution, source truncation/drift or a missing required feature scenario yield incomplete. Otherwise the result is meets_configured_checks. No numeric overall safety score is calculated. Affected runs execute entire runner suites containing selected cases and report every configured case in those suites. Cases in unselected suites stay not_run and keep full-audit readiness incomplete. Optional failures also prevent a meets_configured_checks verdict.

Reports contain a source-content fingerprint and configuration hash. They are tied to those artifacts and are not an assessment of a later revision. Compare by stable scenario/finding IDs. A prior scenario failure resolves only when a fresh matching scenario passes with unchanged configuration, expected behavior and evidence type. An absent static warning is no_longer_verified rather than a proven fix.

Keep agent-authored semantic findings alongside the machine report as `agent-review.md`, with the same run ID and fingerprint. Do not edit generated JSON to pretend an unexecuted assertion passed. The host may add confirmed missing requirements to a reviewed config and rerun inspection. Source fixes are made only after the user's remediation request, with unchanged acceptance assertions and fresh adjacent regression checks.

Before sharing publicly, review redacted artifacts for business-sensitive context. Automatic credential patterns cannot identify every domain-specific secret or personal datum. Example reports shipped with Argus contain synthetic fixtures only.
