# Argus

**One skill. 101 ways an application can fail. Evidence before confidence.**

Argus `0.1.0-draft` helps coding agents audit functionality, security, data integrity, integrations and operational resilience. It inventories candidate features, classifies all 101 areas, proposes scenarios and runs reviewed tests through isolated executors. Reports explain failures, missing requirements, verification gaps and fixes.

The skill supplies the reasoning workflow; the TypeScript engine supplies discovery, bounded execution, evidence and reports. Application-specific acceptance tests still need to be written or connected. A catalog entry is not automatically an implemented test. Nothing here guarantees an error-free application or predicts every future incident.

## Quick start

Requires Node.js 22 or newer. Run these commands **inside this Argus package**, not an unreviewed application:

```sh
npm ci --ignore-scripts
npm run build
node dist/cli.js --help
node dist/cli.js inspect --root /absolute/path/to/application
```

Inspection does not execute application code. It emits JSON with 101 applicability decisions, feature candidates, scenario proposals and source-pattern hypotheses. Confirm the feature inventory and requirements before interpreting coverage.

For a runnable, synthetic demonstration on macOS:

```sh
npm test
node scripts/demo.mjs
```

The demo copies the vulnerable fixture into a temporary workspace, runs its 14 assertions, replaces it with the corrected fixture, and reruns the same assertions. It saves example Markdown/JSON reports and a comparison under `examples/reports`. It never modifies your application. Other platforms need a local digest-pinned Docker image; see [execution](references/execution.md).

## Audit your application

1. Ask your coding agent to use [SKILL.md](SKILL.md). Confirm requirements, critical journeys, roles and scoped artifacts.
2. Keep a reviewed audit configuration and new test harness outside application source. Use the [configuration guide](docs/configuration.md), [catalog](references/catalog.md) and [example harness](examples/harness/audit.mjs).
3. Run the configured audit:

```sh
node /absolute/path/to/argus/dist/cli.js run \
  --root /absolute/path/to/application \
  --config /absolute/path/to/audit/config.json \
  --out /absolute/path/to/audit/reports --execute
```

`--execute` enables only the configured isolated runners. Without it, scenarios are blocked and source review remains available. Configurations are never auto-discovered from an application. Report storage must be outside the application root in a new or already-private directory. Existing shared directory permissions are never changed. Tests get a disposable source snapshot, no provider credentials and no external network.

Readiness is `blocked`, `incomplete`, or `meets_configured_checks`. Run exit codes are **1**, **2**, or **0**, respectively. Missing tools, unknown scope and omitted required checks do not pass. An area passes only its configured assertions.

Affected runs select whole runner suites containing the requested scenarios. Argus reports every configured case in those suites; cases in unselected suites stay `not_run`.

```sh
node dist/cli.js run --root /absolute/app --config /absolute/audit/config.json \
  --out /absolute/audit/reports --execute --profile affected --scenarios login,checkout
node dist/cli.js get RUN_UUID --root /absolute/app --out /absolute/audit/reports
node dist/cli.js compare BEFORE_UUID AFTER_UUID --root /absolute/app --out /absolute/audit/reports
```

## One skill across agents

Copy this complete folder into the host's supported skill directory as `argus`, or ask the agent to read its `SKILL.md` by absolute path. Hosts without skill discovery can use the same instructions and CLI. No second skill is required.

For MCP, start the **local stdio** server with a fixed project/configuration:

```sh
node /absolute/path/to/argus/dist/cli.js mcp \
  --root /absolute/path/to/application --out /absolute/path/to/audit/reports
```

Add `--config /absolute/audit/config.json --execute` after reviewing the runner definitions. The five tools are `inspect_project`, `run_checkup`, `get_run`, `cancel_run`, and `compare_runs`. The catalog is also available at `argus://catalog`. No tool accepts a new root, a shell command or delivery credentials. [Client setup and compatibility](docs/compatibility.md) covers Antigravity, Claude Code, Codex, BLACKBOX, Muse Code, Kiro, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode, Cline, Roo Code, Continue and Goose.

## What is included

- One [skill entrypoint](SKILL.md) and [101-area machine-readable catalog](references/catalog.json).
- CLI, MCP server, reviewed-runner configuration and isolated execution.
- Adapters for existing project suites, Playwright JSON reports, Gitleaks, Semgrep CE and OSV-Scanner. Scanner/browser execution has not been verified end to end in this draft.
- Synthetic messaging/payment assertions; actual WhatsApp, email, SMS, push and payment delivery always remains **unverified**.
- Vulnerable/corrected fixtures, sample reports, [validation record](docs/validation.md), [CI templates](ci/README.md) and remediation guidance.

The demo checks small functions. Its save/reload assertion does not prove process-restart durability; its chat helper does not prove two-user message delivery. Production acceptance scenarios must exercise those boundaries explicitly.

## Publishing and contributing

This is an unpublished source draft. Upload the contents of this directory to your GitHub repository; it needs no hosted Argus service. Review [known limitations](docs/limitations.md), [contribution guidance](CONTRIBUTING.md), [security reporting](SECURITY.md) and [third-party attribution](NOTICE). `npm run validate` checks the catalog and linked package resources. `npm pack` creates a local npm archive without publishing.

Argus code and original guidance are MIT licensed. Referenced standards keep their own licenses. This is Argus's catalog, not OWASP certification or an endorsement by any named coding-tool provider.
