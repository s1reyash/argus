# CI templates

The templates are deliberately not activated automatically. Copy `self-test.yml` to `.github/workflows/argus-self-test.yml` in the Argus repository to validate this package. It runs the macOS executor, unit tests and MCP integration. Review/pin action revisions according to repository policy.

For your application, use `application-audit.yml` as a reviewed integration template. It expects Argus to be built at a trusted path outside the application checkout, and a reviewed configuration/harness plus preloaded digest-pinned images. Configure runner variables before enabling it. No application package installation runs on the host.

On pull requests, set `ARGUS_AFFECTED_SCENARIOS` to a comma-separated list determined by your reviewed change-impact mapping. Selection happens at runner-suite granularity. Omitted required/full-audit checks keep readiness incomplete; the strict gate fails rather than counting historical results as current. Use a complete bounded critical suite per PR if a passing release gate is required. On-demand and scheduled runs use full scope. Broader load/restore cases require their disposable fixtures and budgets.

Do not use `pull_request_target` to execute untrusted application code, do not give audit jobs provider credentials, and do not check out unreviewed changes to the engine/configuration on a privileged runner. Hosted disposable jobs with no deployment permissions are preferred. Protect report artifacts as application data; review before publishing.

Exit 0 means configured checks met; 1 means blocking findings/required failures; 2 means incomplete/error. Do not mask exit 1/2 with `continue-on-error`, a successful artifact upload, or `|| true`. An agent's own successful exit is not a substitute for the Argus gate.
