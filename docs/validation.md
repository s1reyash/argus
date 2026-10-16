# Validation record — 0.1.0-draft

Validated locally on 2026-10-16 with Node 22.23.1, TypeScript 5.9.3, MCP SDK 1.32.1 and macOS 26.6.2 and its offline executor. Tests used synthetic data only. No named commercial coding host, real provider, production application, mobile device or scanner binary was used for this validation.

## Executed results

`npm test`: **25 tests discovered; 24 passed, 0 failed, 1 skipped**. The skipped case is specifically the unavailable-macOS-executor behavior on a non-macOS platform. [Raw test transcript](validation.tap).

Coverage includes:

- Exactly 101 unique stable areas with applicability, examples, prerequisites, expected results, evidence and remediation guidance.
- Strict configuration validation; known runner/feature references; rejection of live-delivery mode and false observed-delivery labels.
- No implicit application lifecycle execution; exclusion of credential files and symlinks; output-root and run-ID boundaries.
- Credential redaction; malformed, missing and duplicate evidence; exit-zero/nonzero inconsistencies; malicious output retained as data.
- Playwright skipped/flaky/unmatched results and scanner error/result parsing. These are parser tests, not execution of installed browsers/scanners.
- All 14 vulnerable fixture assertions fail, the corrected fixture passes the same assertions, and comparison identifies 14 resolved scenario findings. The disappearing static credential warning remains no-longer-verified.
- Whole-suite affected execution is reported accurately. No hidden omission of the other configured tests in that suite.
- OS-enforced network denial, unrelated file-content-read denial, source-write denial and child-process denial; execution deadline and cancellation.
- External audit harness execution without changing application source, with harness changes reflected in the fingerprint.
- Actual stdio MCP handshake, five-tool discovery and calls, catalog resource, audit prompt and invalid run-path rejection.

`node scripts/demo.mjs` generated [vulnerable](../examples/reports/vulnerable.md), [corrected](../examples/reports/corrected.md), [comparison](../examples/reports/comparison.json) and [demo validation](../examples/reports/demo-validation.json) artifacts. Local fixture paths are anonymized in the exported samples. The corrected result means only that the fixture meets its configured checks. Real external delivery remains unverified.

The package also receives TypeScript compilation, catalog regeneration, local-link/required-resource validation and skill frontmatter validation. The final structural results are recorded in [package-validation.json](package-validation.json).

## Independent forward test

A separate agent used the skill against the vulnerable fixture without being given the expected defects. Its enclosing sandbox denied nested macOS sandbox creation, so it correctly reported 14 blocked dynamic scenarios and separate static evidence. It did not fabricate runtime passes. The main validation ran the same fixtures in the permitted offline executor and produced the runtime results above.

That review identified affected-suite underreporting, temporarily missing linked documentation, conservative false-positive handling and overbroad interpretations of the fixture. The suite reporting and documentation were corrected; fixture limitations and the absence of a false-positive disposition API are explicit. Redaction and MCP completion/cancellation edge cases discovered during testing were also corrected and retested.

## Scope of confidence

This proves the listed invariants in this environment. Docker execution, scanner binaries, browser sessions, native UI workflows and individual coding-host integrations remain documented but untested. The supplied CI templates have not run in GitHub Actions. Passing this package validation is not a full audit of an arbitrary application or an independent security certification.
