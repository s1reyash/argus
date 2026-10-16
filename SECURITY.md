# Security reporting

Argus 0.1.0-draft is pre-release software. Its source review and sandbox boundaries are documented in `docs/limitations.md` and `references/execution.md`.

Before public release, the repository owner should enable GitHub private vulnerability reporting. If enabled, use the repository's Security tab to report a vulnerability privately. If it is not enabled, request a private reporting channel without posting exploit details or secrets publicly. This draft does not invent a maintainer address.

Include Argus/Node/OS versions, the isolated reproduction, expected/observed behavior and redacted evidence. Never include working credentials or unrelated user data. Suspected isolation bypasses, secret disclosure, false passes, unauthorized execution and report manipulation are especially relevant.

Do not test a suspected escape against production or third-party systems. A harmless temporary sentinel file and local synthetic fixture are sufficient for a report. The maintainers should confirm impact, add a regression fixture, fix the boundary and document affected versions before release.
