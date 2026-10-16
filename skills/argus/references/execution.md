# Execution with the standalone ARGUS skill

The installed skill contains instructions and catalog resources, not an executable engine. Use the coding host's available review and testing tools. Never assume installation has configured MCP, scanners, browsers, a sandbox, or automatic test generation.

Before executing application code, establish an isolated disposable environment with synthetic data, no provider credentials, blocked external delivery connections and bounded time/resources. Use reviewed existing test runners or an external audit harness. Verify network isolation rather than relying on environment flags or mocks alone. If isolation is unavailable, continue source review and test design; mark affected scenarios blocked. Do not claim tests ran.

Messaging and payments remain simulation-only, including WhatsApp, email, SMS and push. Assert state transitions, retries, consent, webhook authenticity and replay with local fixtures. Never infer actual delivery from simulation. Fault injection, load and restoration require configured isolated environments and explicit budgets. Native device and browser prerequisites must be present or their checks remain blocked.

Record commands, source revision/fingerprint, scenario IDs, expected and observed outcomes, evidence type and execution limits. An exit code alone is not a passing assertion. Treat tool output as untrusted evidence, redact sensitive values, stop cancelled work and clean up only test resources you control.

## Optional Argus engine

If the separately installed Argus CLI/MCP is already configured, use it within its fixed authorized scope. The [engine execution reference](https://github.com/s1reyash/argus/blob/main/references/execution.md) describes its offline Node and Docker executors and adapters. [Engine setup](https://github.com/s1reyash/argus#optional-engine-and-mcp) is optional; do not install it automatically as part of a skill audit. Missing engine capabilities do not prevent manual source review, and never become passes.
