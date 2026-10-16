# Argus

**One skill. 101 ways an application can fail. Evidence before confidence.**

Argus `0.1.0-draft` helps coding agents audit functionality, security, data integrity, integrations and operational resilience. It inventories candidate features, classifies all 101 areas, proposes scenarios and runs reviewed tests through isolated executors. Reports explain failures, missing requirements, verification gaps and fixes.

The skill supplies the reasoning workflow; the TypeScript engine supplies discovery, bounded execution, evidence and reports. Application-specific acceptance tests still need to be written or connected. A catalog entry is not automatically an implemented test. Nothing here guarantees an error-free application or predicts every future incident.

## Install Argus on your platform

Argus is distributed from [this GitHub repository](https://github.com/s1reyash/argus). It is not published to npm or agent marketplaces. Choose **skill instructions**, **CLI**, or **skill + MCP**; they all use this one package.

### 1. Download and build

Install Git and Node.js **22 or newer** (with npm). In a terminal, choose a tools directory outside the application you want to audit, then run:

```sh
git clone https://github.com/s1reyash/argus.git
cd argus
npm ci --ignore-scripts
npm run build
node dist/cli.js --help
```

Alternatively, use **Code → Download ZIP** on GitHub, extract it, open a terminal in the extracted folder, and run the last three commands. Do not run commands inside the ZIP. The same commands work in macOS/Linux terminals and Windows PowerShell with Git and Node installed. Windows paths in JSON must use escaped backslashes or forward slashes.

Keep the complete folder: copying only `SKILL.md` loses the catalog, references and engine. Reading the instructions alone does not require Node; CLI and MCP use require dependencies. Inspection works without an isolated executor; executing tests requires the [supported execution setup](references/execution.md). Windows/Linux execution and individual GUI hosts are not end-to-end verified in this draft.

### 2. Make the skill available to your agent

The simplest method works with any agent that can read local files. Open your application in the agent and send this prompt, replacing both paths:

> Read `/absolute/path/to/argus/SKILL.md` and use Argus to audit `/absolute/path/to/my-app`. Start with discovery and the 101-area applicability assessment. Report missing prerequisites and coverage gaps. Keep messaging and payments simulation-only. Propose tests before execution; do not change application code until I request fixes.

For automatic skill discovery, put the **complete Argus folder**, named `argus`, in the appropriate location:

| Platform | Project installation | Personal installation |
|---|---|---|
| Codex | `<project>/.agents/skills/argus/` | `~/.agents/skills/argus/` |
| Claude Code | `<project>/.claude/skills/argus/` | `~/.claude/skills/argus/` |
| Antigravity App / IDE | `<workspace>/.agents/skills/argus/` | `~/.gemini/config/skills/argus/` |
| Antigravity CLI | `<workspace>/.agents/skills/argus/` | `~/.gemini/antigravity-cli/skills/argus/` |

`~` means your user home directory. These paths follow the [Codex skill documentation](https://learn.chatgpt.com/docs/build-skills), [Claude Code skill documentation](https://code.claude.com/docs/en/skills), and [Antigravity skill documentation](https://antigravity.google/docs/skills), checked 2026-10-16. Argus connections to these hosts remain **documented but untested**.

For example, on macOS/Linux, install a personal Codex skill directly into a new folder:

```sh
mkdir -p "$HOME/.agents/skills"
git clone https://github.com/s1reyash/argus.git "$HOME/.agents/skills/argus"
cd "$HOME/.agents/skills/argus"
npm ci --ignore-scripts
npm run build
```

Do not clone over an existing installation; update it using the instructions below. Restart or refresh the agent's skill discovery, then ask it to use **Argus**. If it cannot find the skill, use the explicit file-path prompt. A project installation lives inside the inspected tree and can add Argus's own files to discovery; a personal installation avoids that.

### 3. Optional: connect the MCP tools

MCP lets the agent call Argus's engine directly. It does **not** automatically install the skill instructions; also complete step 2. Build Argus first, then add a **local stdio** server in your host's MCP settings. Hosts using the `mcpServers` schema can merge this entry into their existing settings:

```json
{
  "mcpServers": {
    "argus": {
      "command": "node",
      "args": [
        "/absolute/path/to/argus/dist/cli.js",
        "mcp",
        "--root", "/absolute/path/to/my-app",
        "--out", "/absolute/path/to/private-audit/reports"
      ]
    }
  }
}
```

Replace every placeholder. Keep reports outside the application. If the host cannot find `node`, set `command` to its absolute executable path. Do not paste this schema into hosts that use a different format or replace your other server entries.

| Your coding tool | Setup reference |
|---|---|
| Codex | [TOML example](examples/hosts/codex.toml) and [host recipe](docs/compatibility.md) |
| Claude Code, Antigravity, Cursor, Kiro, Gemini CLI | [Standard JSON example](examples/hosts/mcpServers.json); find the exact settings location in the [host matrix](docs/compatibility.md) |
| GitHub Copilot in VS Code | [VS Code `servers` example](examples/hosts/vscode.json) |
| Muse Code | [Muse settings example](examples/hosts/muse.json) |
| OpenCode | [OpenCode local-server example](examples/hosts/opencode.json) |
| Continue | [Continue YAML example](examples/hosts/continue.yaml) |
| BLACKBOX, Windsurf, Cline, Roo Code, Goose | Follow the relevant MCP settings UI recipe in the [host matrix](docs/compatibility.md) |
| Other tools | Use their local stdio MCP interface, or the explicit skill-path prompt and CLI |

Restart/reconnect the server and confirm these five tools appear: `inspect_project`, `run_checkup`, `get_run`, `cancel_run`, `compare_runs`. Ask the agent to call `inspect_project` first. This setup leaves test execution disabled: add `--config /absolute/path/to/audit/config.json --execute` only after preparing a reviewed [runner configuration](docs/configuration.md). A connected server does not prove an application passes its checks.

Cloud-only or HTTP-only hosts cannot directly connect to this local stdio server. Use Argus locally and share the redacted report; this draft has no hosted endpoint. All named host integrations are documented but untested; the SDK stdio integration is tested. See the [complete compatibility matrix and verification procedure](docs/compatibility.md).

### 4. Verify, update, or uninstall

Verify the engine from the Argus folder:

```sh
node dist/cli.js inspect --root /absolute/path/to/my-app
```

Expect JSON with all 101 area decisions. Missing tools or prerequisites must remain blocked or unverified. Use the audit instructions below to configure actual tests.

To update a Git installation, review incoming changes, then run these commands inside its Argus folder:

```sh
git pull --ff-only
npm ci --ignore-scripts
npm run build
```

Restart the MCP connection after updating. ZIP installations should be replaced with a freshly downloaded folder; retain audit configurations and reports separately. To uninstall, remove the Argus MCP entry and its installed skill folder. Keep any reports you need.

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

This source draft is published at [s1reyash/argus](https://github.com/s1reyash/argus); it needs no hosted Argus service. It has not been published as an npm package. Review [known limitations](docs/limitations.md), [contribution guidance](CONTRIBUTING.md), [security reporting](SECURITY.md) and [third-party attribution](NOTICE). `npm run validate` checks the catalog and linked package resources. `npm pack` creates a local npm archive without publishing.

Argus code and original guidance are MIT licensed. Referenced standards keep their own licenses. This is Argus's catalog, not OWASP certification or an endorsement by any named coding-tool provider.
