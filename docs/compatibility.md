# Compatibility and host installation

Release: **Argus 0.1.0-draft**. Runtime tested: **Node 22.23.1**, MCP TypeScript SDK **1.32.1**, macOS **26.6.2** offline executor. Configuration documentation checked **2026-10-16**. This is a dated interface matrix, not a claim of testing every client version. Public rolling documentation does not establish a specific installed client build; those builds remain **unverified** until the smoke test below is recorded.

**Tested** means executed here. **Documented but untested** means an official host interface is documented, but this Argus release was not connected to that host. **Unsupported** means this draft provides no verified integration path for that surface. The universal fallback is to give a file-reading agent `SKILL.md` and use the CLI if a local Node runtime is available.

## Skill-only installation

Run `npx skills add https://github.com/s1reyash/argus/tree/main/skills/argus` and select a supported host. Only the standalone skill folder is installed. No engine build is required. For manual installation, copy `skills/argus`, not the repository root. The recipes below configure the optional MCP engine separately.

## Shared MCP engine setup

Build the package first with `npm ci --ignore-scripts` and `npm run build`. Use an absolute Node executable if the GUI cannot find Node. Every host starts the same process:

```text
node /absolute/argus/dist/cli.js mcp --root /absolute/application --out /absolute/audit/reports
```

All examples start with execution disabled. Append `--config /absolute/audit/config.json --execute` only after reviewing the isolation and runner configuration. Do not put credentials in host configuration. Merge entries with your existing settings; do not overwrite other servers.

The standard `mcpServers` example is [mcpServers.json](../examples/hosts/mcpServers.json). Other schemas have separate templates in the same directory. Example paths must be replaced with actual absolute paths. Keep reports outside the inspected app. If the skill is installed inside the application itself, narrow the inspected root or expect discovery to include the skill files too.

## Host matrix and version-specific interface recipes

| Host / documented interface snapshot | Status | Setup recipe and source |
|---|---|---|
| SDK stdio client 1.32.1 | **tested** | `tests/mcp.test.mjs`: handshake, tool discovery, all five tools, resource and prompt. This is protocol testing, not a GUI-host certification. |
| Antigravity App / CLI / IDE, 2026-10-16 docs | documented but untested | Use **Manage MCP Servers → View raw config**, or merge `mcpServers.json` into `.agents/mcp_config.json`. Documented global path: `~/.gemini/config/mcp_config.json`. Skills use `.agents/skills/argus`; older `.agent` layouts need that version's docs. [MCP](https://antigravity.google/docs/mcp), [skills](https://antigravity.google/docs/skills). |
| Claude Code, 2026-10-16 stdio interface | documented but untested | `claude mcp add --transport stdio argus -- node /absolute/argus/dist/cli.js mcp --root /absolute/app --out /absolute/audit/reports`; copy skill into `.claude/skills/argus`. Check with `/mcp`. [MCP guide](https://code.claude.com/docs/en/mcp). |
| Codex desktop / CLI / IDE, 2026-10-16 interface | documented but untested | Merge [codex.toml](../examples/hosts/codex.toml) into the supported user or trusted project config; or `codex mcp add argus -- node /absolute/argus/dist/cli.js mcp --root /absolute/app --out /absolute/audit/reports`. Install the folder in `.agents/skills/argus` where supported. [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [skills](https://learn.chatgpt.com/docs/build-skills). |
| BLACKBOX VS Code extension, documented MCP UI | documented but untested | Add a custom local server through the extension's MCP interface with the shared command and args. A specific persisted schema and extension build were not verified; do not assume another host's JSON filename. Read `SKILL.md` explicitly or use CLI. [Official extension guide](https://docs.blackbox.chat/blackbox-ai-1/extensions/blackbox-ai-on-vscode). |
| Muse Code, 2026-10-16 `mcp_servers` interface | documented but untested | Merge [muse.json](../examples/hosts/muse.json) into Muse settings; uses `transport: stdio`, not the common `mcpServers` key. Skills: `.agents/skills/argus`; `muse skills validate /absolute/argus`, then `/mcp` to inspect connection. [Extending Muse Code](https://dev.meta.ai/docs/muse-code/extending). |
| Kiro IDE / CLI, documented workspace interface | documented but untested | Merge `mcpServers.json` into `.kiro/settings/mcp.json`; enable MCP in settings. Keep auto-approval lists unchanged. Read the skill by path if skill discovery differs. [Configuration](https://kiro.dev/docs/mcp/configuration/). |
| Cursor, documented project MCP interface | documented but untested | Merge `mcpServers.json` into `.cursor/mcp.json`; enable Argus in the tools UI. Give the agent `SKILL.md`. [MCP documentation](https://cursor.com/docs/mcp). |
| GitHub Copilot in VS Code Agent mode | documented but untested | Merge [vscode.json](../examples/hosts/vscode.json) into `.vscode/mcp.json`; this uses `servers` and `type: stdio`. Enable in the tools picker. Hosted coding-agent support is a separate environment, unverified here. [VS Code MCP](https://code.visualstudio.com/docs/agent-customization/mcp-servers). |
| Gemini CLI, documented settings interface | documented but untested | Merge `mcpServers.json` into `.gemini/settings.json`; inspect via `/mcp`. Supply the skill by path when native discovery is unavailable. [MCP guide](https://geminicli.com/docs/tools/mcp-server/). |
| Windsurf / Cascade; docs currently under Devin Desktop | documented but untested | Open the installed version's MCP raw-configuration editor and add the standard `mcpServers` entry. Confirm the actual product/build before selecting its settings path. [Current documentation](https://docs.devin.ai/desktop/cascade/mcp). |
| OpenCode, documented local MCP interface | documented but untested | Merge [opencode.json](../examples/hosts/opencode.json) into OpenCode configuration: `mcp.argus.type=local`, and command is an argv array. [MCP servers](https://opencode.ai/docs/mcp-servers/). |
| Cline, documented MCP server UI | documented but untested | Use MCP Servers → Configure MCP Servers; merge the standard `mcpServers` entry. Retain normal host tool approvals. [MCP overview](https://docs.cline.bot/mcp/mcp-overview). |
| Roo Code, documented MCP server UI | documented but untested | Open MCP server settings and add the standard local command/args entry; give the agent the skill path. [Using MCP](https://roocodeinc.github.io/Roo-Code/features/mcp/using-mcp-in-roo/). |
| Continue, documented YAML MCP interface | documented but untested | Add [continue.yaml](../examples/hosts/continue.yaml) in the supported `.continue/mcpServers` configuration location; uses a named YAML `mcpServers` list. [MCP tools](https://docs.continue.dev/customize/mcp-tools). |
| Goose, documented stdio extension interface | documented but untested | Add a custom **Standard IO** extension, executable Node and shared Argus arguments. Give the agent `SKILL.md`. If the UI takes one command string, quote absolute paths containing spaces. [Extensions](https://github.com/aaif-goose/goose/blob/main/documentation/docs/getting-started/using-extensions.md). |
| Other local stdio MCP hosts | documented but untested | Configure the shared process and run the smoke test. Tools/resources/prompts may be exposed differently; the CLI provides the same engine. [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk). |
| HTTP-only, mobile-only or cloud-only hosts without local execution | **unsupported** by this draft | Argus exposes no HTTP endpoint, tunnel or hosted service. Use a separate authorized local CLI environment and share a redacted report. |
| “Plot” or another ambiguous product name | **unsupported pending identification** | No host schema is invented. The skill text and CLI are available if the actual tool can read files and run local commands. |

## Verify a specific host build

Record host name and exact version/build from About or its version command; OS; Node version; Argus version; SDK lockfile; settings schema; and date. Start with a synthetic fixture and no `--execute`.

Confirm the five tools appear. Call `inspect_project`; check the fixed root and 101 areas. Start a run, fetch its report, verify missing execution is blocked/incomplete, cancel a running job, compare reports and restart the host. Only then enable a reviewed fixture runner, prove a failed assertion is detected and the correction passes, and confirm real delivery remains unverified. Save evidence in a version-specific compatibility entry before changing its status to tested.

An agent acknowledging the skill or an MCP server showing “connected” is not sufficient evidence that application tests work in that host's sandbox.
