# Contributing to Argus

Use Node 22+, `npm ci --ignore-scripts`, `npm test`, `npm run catalog` and `npm run validate`. Read the limitations before changing readiness or isolation. Never add real credentials, personal data or real-delivery tests to fixtures.

Preserve the one-skill architecture. Edit the machine-readable catalog as the single source; regenerate its Markdown view. Keep exactly 101 stable IDs in this version. Extend application-specific scenarios without renumbering catalog areas; propose a versioned migration for catalog changes.

For a fix, include a reproducible failing synthetic fixture and an independent acceptance assertion. Demonstrate that the unchanged assertion passes after correction. Test blocked/missing/error paths as well as positive controls. Never equate skipped checks, empty output, exit zero or mocked delivery with complete success.

Adapter changes need exact binary/image versions, redacted sample outputs, known-vulnerable and clean controls, offline execution, missing-tool behavior, cancellation, output bounds and cleanup. Do not automatically download or execute code proposed by the audited application or a tool response.

Compatibility contributions must record the actual client build, OS, runtime, configuration format and the smoke test in `docs/compatibility.md`. Do not promote a documented integration to tested just because its config parses.

Submit focused changes with the problem, resulting behavior, validation and remaining limitations. Contributions to original Argus code/guidance are MIT licensed; preserve third-party notices. Maintainers should pin CI actions to reviewed commit SHAs when adopting the templates and review dependency/license changes in the lockfile.

## Standalone skill packaging

The installable skill is `skills/argus`. Keep it independent of engine source and runtime dependencies. After editing the canonical catalog under `references/`, run `node scripts/sync-skill.mjs`; `node scripts/sync-skill.mjs --check` and package validation detect drift. Keep standalone instructions and engine instructions consistent without assuming the engine is installed.
