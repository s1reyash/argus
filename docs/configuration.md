# Configuration

Pass a reviewed JSON file explicitly with `--config`. Schema version is 1; unknown properties, IDs, conflicting applicability declarations, duplicate identifiers and missing references are rejected. The complete runtime schema is in `src/config.ts`.

- `deliveryMode`: `simulation-only` (only supported value).
- `applicability`: map from `ARG-001`…`ARG-101` to `{status: applicable|not_applicable, reason}`. Each reason needs at least 10 characters. Omit uncertain decisions; they remain unknown or candidate-applicable, never implicitly irrelevant.
- `features`: `id`, `title`, `source`, `areaIds`, `required`, `implementation` (`present`, `missing`, `unknown`), `evidence`. Missing requirements require evidence, not guesses. `source` matching a relative source filename folds that module into the declared feature. Otherwise discovery adds a candidate and the report exposes its gap.
- `runners`: `id`, `adapter`, `sandbox`, optional `command`, `image`, `rules`, `harnessDirectory`, plus `timeoutMs`, `memoryMb`, `cpus`. Commands are argv arrays. Images require SHA-256 digests. No environment-variable or credential passthrough is offered.
- `scenarios`: `id`, `title`, `areaIds`, `featureIds`, `expected`, `required`, `severity`, `evidenceType`, `runner`. IDs stay stable across revisions. Features must be declared before scenarios refer to them. Link one assertion to multiple areas only when it actually tests their invariants.

A source pattern that contradicts an exclusion reopens that area. Applicability is a claim to justify, not a way to suppress a defect. This draft has no false-positive suppression mechanism: document an evidence-backed disposition in `agent-review.md`; the machine gate stays conservative until the rule/configuration is improved and retested.

See [fixture.config.json](../examples/fixture.config.json) for a complete, executable example. Its broad exclusions apply only to the tiny fixture, never to a production app. Do not copy those exclusions to make your application pass.

Example partial app configuration:

```json
{
  "schemaVersion": 1,
  "deliveryMode": "simulation-only",
  "features": [{"id":"accounts","title":"Account login","source":"src/auth.mjs","areaIds":["ARG-020"],"required":true}],
  "runners": [{"id":"auth-suite","adapter":"project","sandbox":"macos-offline-node","harnessDirectory":"/absolute/audit/harness","command":["node",".argus-harness/audit.mjs"],"timeoutMs":10000}],
  "scenarios": [{"id":"login","title":"Valid and invalid login","areaIds":["ARG-020"],"featureIds":["accounts"],"expected":"Invalid credentials rejected and valid controls accepted","evidenceType":"observed","required":true,"severity":"high","runner":"auth-suite"}]
}
```

Unconfigured areas stay visible and keep a full audit incomplete. The host agent should expand `inspect` proposals into meaningful assertions and explain unsupported/inaccessible features. Suggested improvements belong in the semantic report; they do not silently become mandatory acceptance criteria.
