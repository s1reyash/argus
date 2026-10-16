# Application audit workflow

## Establish product behavior

Collect requirements and the declared support matrix before testing. Trace screens, URLs, commands, APIs, data stores, workers and providers. Record who can perform each action and what durable effect should follow. Code shows what is implemented; requirements establish what ought to happen. Neither a TODO nor a competitor feature alone proves a missing requirement.

The engine's file inventory is intentionally conservative. Review it and declare product features in the configuration with stable IDs. Candidate source modules that have no mapped executed case remain explicit verification gaps. Add configuration `features` with `implementation: "missing"` and supporting `evidence` only after confirming a required capability is absent. Suggested improvements belong in a separately labeled agent-authored section; they are not automatic launch blockers.

## Classify coverage

All 101 catalog entries must appear. Signals suggest applicability but cannot justify exclusions. Use explicit not-applicable reasons after reviewing the product architecture. If a source finding conflicts with an exclusion, investigate the finding before accepting that exclusion. A limited snapshot, absent simulator, undocumented requirement or offline vulnerability database is a limitation, never proof of correctness.

For each applicable area, define concrete expected outcomes and scenarios for the actual features. The JSON inventory includes 101-area scenario proposals; these are test design inputs, not executable tests. The host agent must implement the application-specific assertions in a reviewed isolated harness. Prefer existing test infrastructure over building a replacement.

## Scenario design

Use separate synthetic identities for actor/owner/administrator/other tenant. Test positive controls alongside rejected inputs and unauthorized requests. Assert business effects and persistence rather than UI clicks or HTTP status alone. Exercise empty and malformed data, concurrency, duplicate requests, interruptions and recovery where relevant. For performance, define workload and budgets first; arbitrary delays are not a benchmark.

Payment and messaging fixtures must model asynchronous events and idempotency. A local mock's delivery event establishes application event-handling behavior only. For chat, two isolated test users may exercise a local app within a network-disabled container; external communication remains blocked.

## Agent review and automation

The CLI performs bounded discovery, six source-pattern checks and configured scenario execution. It does not contain an independent LLM or a universal automatic test generator. You, the coding agent using this skill, supply semantic review, app-specific assertions and contextual fixes. CI executes the configured deterministic tests without substituting for this review.

Use current primary documentation when framework/provider behavior matters. Cross-reference the catalog's pinned standards in `sources.json`; references are standard-level mappings, not a claim that every ASVS/MASVS control was evaluated.

## Without the optional engine

Maintain the feature register, all 101 applicability decisions, scenario outcomes and findings in Markdown and JSON using host file tools. Use stable IDs and record the inspected revision and evidence types. Engine-specific configuration and fingerprint behavior above applies only when that engine is actually used. Never fabricate a run ID, automatic gate, fingerprint or machine report.
