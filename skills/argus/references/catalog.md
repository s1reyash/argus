# Argus 101-area catalog

Generated from `catalog.json`. Edit the JSON source, then run `npm run catalog`. Stable IDs must not be renumbered. These are Argus guidance, not an official certification checklist.

## Index

- [ARG-001: Feature completeness](#arg-001)
- [ARG-002: Complete user journeys](#arg-002)
- [ARG-003: Startup and configuration](#arg-003)
- [ARG-004: URLs and routing](#arg-004)
- [ARG-005: Buttons, navigation, and commands](#arg-005)
- [ARG-006: Forms and input validation](#arg-006)
- [ARG-007: Loading, empty, and success states](#arg-007)
- [ARG-008: Error recovery and user progress](#arg-008)
- [ARG-009: Search, filtering, and sorting](#arg-009)
- [ARG-010: Pagination and large collections](#arg-010)
- [ARG-011: Upload functionality](#arg-011)
- [ARG-012: Downloads and exports](#arg-012)
- [ARG-013: Imports and bulk ingestion](#arg-013)
- [ARG-014: Reports and business calculations](#arg-014)
- [ARG-015: Languages and regional formats](#arg-015)
- [ARG-016: Dates, time zones, and calendars](#arg-016)
- [ARG-017: Accessibility](#arg-017)
- [ARG-018: Browser, screen, and input compatibility](#arg-018)
- [ARG-019: Registration and invitations](#arg-019)
- [ARG-020: Login correctness](#arg-020)
- [ARG-021: Password handling](#arg-021)
- [ARG-022: Account recovery](#arg-022)
- [ARG-023: MFA and passkeys](#arg-023)
- [ARG-024: OAuth, SSO, and account linking](#arg-024)
- [ARG-025: Sessions, cookies, and tokens](#arg-025)
- [ARG-026: Logout and access revocation](#arg-026)
- [ARG-027: Record-level authorization](#arg-027)
- [ARG-028: Roles and privileged actions](#arg-028)
- [ARG-029: Tenant and organization isolation](#arg-029)
- [ARG-030: Authentication abuse defenses](#arg-030)
- [ARG-031: Sensitive-data protection](#arg-031)
- [ARG-032: Retention, deletion, and privacy lifecycle](#arg-032)
- [ARG-033: Secrets and credential exposure](#arg-033)
- [ARG-034: Transport and certificate security](#arg-034)
- [ARG-035: Missing fields and schema completeness](#arg-035)
- [ARG-036: Data types and value boundaries](#arg-036)
- [ARG-037: Empty and insufficient datasets](#arg-037)
- [ARG-038: Relationships and referential integrity](#arg-038)
- [ARG-039: Persistence and durability](#arg-039)
- [ARG-040: Transactions and partial writes](#arg-040)
- [ARG-041: Concurrent modifications](#arg-041)
- [ARG-042: Operation idempotency](#arg-042)
- [ARG-043: Numeric precision and units](#arg-043)
- [ARG-044: Encoding and serialization](#arg-044)
- [ARG-045: Schema migrations](#arg-045)
- [ARG-046: Database connectivity and connection pools](#arg-046)
- [ARG-047: Database permissions and access policies](#arg-047)
- [ARG-048: Query performance](#arg-048)
- [ARG-049: Cache correctness and isolation](#arg-049)
- [ARG-050: Backup and restoration](#arg-050)
- [ARG-051: API contracts and version compatibility](#arg-051)
- [ARG-052: API error semantics](#arg-052)
- [ARG-053: API quotas and resource abuse](#arg-053)
- [ARG-054: SQL and NoSQL injection](#arg-054)
- [ARG-055: Command and template injection](#arg-055)
- [ARG-056: Cross-site scripting](#arg-056)
- [ARG-057: Cross-site request forgery](#arg-057)
- [ARG-058: Cross-origin access rules](#arg-058)
- [ARG-059: Server-side request forgery](#arg-059)
- [ARG-060: Path traversal and filesystem boundaries](#arg-060)
- [ARG-061: Uploaded-content safety](#arg-061)
- [ARG-062: Redirects and deep-link validation](#arg-062)
- [ARG-063: Webhook authenticity](#arg-063)
- [ARG-064: Webhook replay and event ordering](#arg-064)
- [ARG-065: Third-party failures and timeouts](#arg-065)
- [ARG-066: Retry and circuit-breaker behavior](#arg-066)
- [ARG-067: Chat sending and receiving](#arg-067)
- [ARG-068: Chat history and ordering](#arg-068)
- [ARG-069: Realtime connection lifecycle](#arg-069)
- [ARG-070: Chat media and attachments](#arg-070)
- [ARG-071: WhatsApp integration](#arg-071)
- [ARG-072: Email integration](#arg-072)
- [ARG-073: SMS and OTP delivery workflows](#arg-073)
- [ARG-074: Push notifications](#arg-074)
- [ARG-075: Message queues and dead-letter handling](#arg-075)
- [ARG-076: Notification preferences and consent](#arg-076)
- [ARG-077: Checkout prices and totals](#arg-077)
- [ARG-078: Payment state transitions](#arg-078)
- [ARG-079: Duplicate-charge prevention](#arg-079)
- [ARG-080: Refunds and cancellations](#arg-080)
- [ARG-081: Subscription lifecycle](#arg-081)
- [ARG-082: Payment reconciliation](#arg-082)
- [ARG-083: Inventory and reservations](#arg-083)
- [ARG-084: Business rules and workflow transitions](#arg-084)
- [ARG-085: Dependencies and supply-chain exposure](#arg-085)
- [ARG-086: Builds and deployment configuration](#arg-086)
- [ARG-087: Release and rollback compatibility](#arg-087)
- [ARG-088: Load and capacity](#arg-088)
- [ARG-089: Resource exhaustion and leaks](#arg-089)
- [ARG-090: Health checks, logs, metrics, and alerts](#arg-090)
- [ARG-091: Scheduled and background jobs](#arg-091)
- [ARG-092: Shutdown and crash recovery](#arg-092)
- [ARG-093: Offline synchronization and conflicts](#arg-093)
- [ARG-094: Mobile permissions and local storage](#arg-094)
- [ARG-095: Desktop IPC and native privileges](#arg-095)
- [ARG-096: Installation, signing, and updates](#arg-096)
- [ARG-097: AI output handling and fallback](#arg-097)
- [ARG-098: AI prompt injection](#arg-098)
- [ARG-099: AI retrieval and knowledge isolation](#arg-099)
- [ARG-100: MCP tool permissions and response trust](#arg-100)
- [ARG-101: Feature flags and cross-feature regressions](#arg-101)

## ARG-001

**Feature completeness** (functional)

Applicability: Apply when the inventory contains behavior related to feature completeness. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A promised export or account-management feature is absent or a placeholder.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A promised export or account-management feature is absent or a placeholder.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Every confirmed requirement maps to implemented behavior or a reported gap.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Implement the missing acceptance criteria; keep optional ideas separate from requirements.

Verify: Reproduce the original failure, apply the correction, and assert: Every confirmed requirement maps to implemented behavior or a reported gap. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-002

**Complete user journeys** (functional)

Applicability: Apply when the inventory contains behavior related to complete user journeys. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Signup succeeds but onboarding or purchased access fails.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Signup succeeds but onboarding or purchased access fails.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: A user can complete each documented critical journey end to end.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Repair the first broken transition and add a journey regression test.

Verify: Reproduce the original failure, apply the correction, and assert: A user can complete each documented critical journey end to end. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-003

**Startup and configuration** (functional)

Applicability: Apply when the inventory contains behavior related to startup and configuration. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A missing environment variable crashes startup or selects the wrong backend.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A missing environment variable crashes startup or selects the wrong backend.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Required configuration is validated before serving traffic with actionable errors.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate configuration centrally and fail safely on missing or conflicting values.

Verify: Reproduce the original failure, apply the correction, and assert: Required configuration is validated before serving traffic with actionable errors. Include an authorized/valid control case.

References: ASVS-v5.0.0/V13

## ARG-004

**URLs and routing** (functional)

Applicability: Apply when the inventory contains behavior related to urls and routing. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Refreshing a nested URL returns a 404 or the wrong screen.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Refreshing a nested URL returns a 404 or the wrong screen.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Supported direct URLs, refreshes and unknown routes behave as specified.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Correct route registration, deployment rewrites and not-found handling.

Verify: Reproduce the original failure, apply the correction, and assert: Supported direct URLs, refreshes and unknown routes behave as specified. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-005

**Buttons, navigation, and commands** (functional)

Applicability: Apply when the inventory contains behavior related to buttons, navigation, and commands. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An action reports success without performing its operation.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An action reports success without performing its operation.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Each visible action or CLI command performs its documented effect.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Connect handlers to real operations and assert their effects, not only clicks.

Verify: Reproduce the original failure, apply the correction, and assert: Each visible action or CLI command performs its documented effect. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-006

**Forms and input validation** (functional)

Applicability: Apply when the inventory contains behavior related to forms and input validation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Client and server accept different invalid values.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Client and server accept different invalid values.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Client feedback and authoritative server validation enforce the same contract.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Centralize schemas where practical and validate on the server regardless of client checks.

Verify: Reproduce the original failure, apply the correction, and assert: Client feedback and authoritative server validation enforce the same contract. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-007

**Loading, empty, and success states** (functional)

Applicability: Apply when the inventory contains behavior related to loading, empty, and success states. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A spinner never ends or an error appears as success.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A spinner never ends or an error appears as success.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: All request outcomes lead to accurate usable interface states.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Handle pending, empty, success and failure explicitly and clear loading in all paths.

Verify: Reproduce the original failure, apply the correction, and assert: All request outcomes lead to accurate usable interface states. Include an authorized/valid control case.

References: ASVS-v5.0.0/V16

## ARG-008

**Error recovery and user progress** (functional)

Applicability: Apply when the inventory contains behavior related to error recovery and user progress. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Retrying erases entered data or repeats completed work.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Retrying erases entered data or repeats completed work.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Recoverable failures preserve safe user progress without duplicate effects.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Persist drafts appropriately and make retries idempotent.

Verify: Reproduce the original failure, apply the correction, and assert: Recoverable failures preserve safe user progress without duplicate effects. Include an authorized/valid control case.

References: ASVS-v5.0.0/V16

## ARG-009

**Search, filtering, and sorting** (functional)

Applicability: Apply when the inventory contains behavior related to search, filtering, and sorting. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Search misses matching records or sorts numbers as strings.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Search misses matching records or sorts numbers as strings.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Results and ordering match the documented query and access rules.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Fix query normalization, typed sorting and permission filtering.

Verify: Reproduce the original failure, apply the correction, and assert: Results and ordering match the documented query and access rules. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-010

**Pagination and large collections** (functional)

Applicability: Apply when the inventory contains behavior related to pagination and large collections. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Records repeat or disappear between pages.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Records repeat or disappear between pages.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Pagination visits the intended records without gaps or duplicates.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use stable ordering and consistent cursor semantics under concurrent updates.

Verify: Reproduce the original failure, apply the correction, and assert: Pagination visits the intended records without gaps or duplicates. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-011

**Upload functionality** (functional)

Applicability: Apply when the inventory contains behavior related to upload functionality. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Interrupted uploads leave partial files indefinitely.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Interrupted uploads leave partial files indefinitely.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Valid uploads finish; rejected or interrupted uploads clean up safely.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bound sizes, expose progress and implement resumable or cleanup behavior.

Verify: Reproduce the original failure, apply the correction, and assert: Valid uploads finish; rejected or interrupted uploads clean up safely. Include an authorized/valid control case.

References: ASVS-v5.0.0/V5

## ARG-012

**Downloads and exports** (functional)

Applicability: Apply when the inventory contains behavior related to downloads and exports. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Exports are corrupt, incomplete or contain the wrong records.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Exports are corrupt, incomplete or contain the wrong records.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Exported content is valid, complete and authorized for the requesting user.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Stream validated exports with explicit encoding and correct access filters.

Verify: Reproduce the original failure, apply the correction, and assert: Exported content is valid, complete and authorized for the requesting user. Include an authorized/valid control case.

References: ASVS-v5.0.0/V5

## ARG-013

**Imports and bulk ingestion** (functional)

Applicability: Apply when the inventory contains behavior related to imports and bulk ingestion. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: One malformed row causes unexplained partial completion.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: One malformed row causes unexplained partial completion.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Malformed rows have clear outcomes and valid records preserve defined atomicity.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate before committing; report row-level errors and define rollback semantics.

Verify: Reproduce the original failure, apply the correction, and assert: Malformed rows have clear outcomes and valid records preserve defined atomicity. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-014

**Reports and business calculations** (functional)

Applicability: Apply when the inventory contains behavior related to reports and business calculations. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Dashboard totals disagree with source transactions.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Dashboard totals disagree with source transactions.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Calculations match independent expected results and include each record correctly.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Define calculation rules and test independently calculated fixtures.

Verify: Reproduce the original failure, apply the correction, and assert: Calculations match independent expected results and include each record correctly. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-015

**Languages and regional formats** (functional)

Applicability: Apply when the inventory contains behavior related to languages and regional formats. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Unicode or right-to-left text breaks the interface.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Unicode or right-to-left text breaks the interface.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Supported locales preserve content, layout and correct formatting.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use locale-aware formatting and test translations, text expansion and directionality.

Verify: Reproduce the original failure, apply the correction, and assert: Supported locales preserve content, layout and correct formatting. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-016

**Dates, time zones, and calendars** (functional)

Applicability: Apply when the inventory contains behavior related to dates, time zones, and calendars. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Daylight-saving or timezone conversion moves an appointment.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Daylight-saving or timezone conversion moves an appointment.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Dates, durations and recurrence obey explicit timezone rules.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Store instants and timezone intent separately and test ambiguous or missing local times.

Verify: Reproduce the original failure, apply the correction, and assert: Dates, durations and recurrence obey explicit timezone rules. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-017

**Accessibility** (functional)

Applicability: Apply when the inventory contains behavior related to accessibility. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A keyboard user cannot complete a form.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A keyboard user cannot complete a form.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Critical workflows have usable focus, labels, semantics and keyboard operation.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Repair semantic controls, focus management, labels and announced error feedback.

Verify: Reproduce the original failure, apply the correction, and assert: Critical workflows have usable focus, labels, semantics and keyboard operation. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-018

**Browser, screen, and input compatibility** (functional)

Applicability: Apply when the inventory contains behavior related to browser, screen, and input compatibility. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Checkout breaks on a supported small screen or input method.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Checkout breaks on a supported small screen or input method.
- Trace the documented behavior from entrypoint to persisted effect.
- Exercise success, invalid input and interrupted/retry paths with synthetic fixtures.
- Compare actual UI/API effects to independently specified acceptance criteria.

Expected: Supported environments complete required workflows without hidden controls.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Fix responsive behavior and test the declared browser and input matrix.

Verify: Reproduce the original failure, apply the correction, and assert: Supported environments complete required workflows without hidden controls. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-019

**Registration and invitations** (identity)

Applicability: Apply when the inventory contains behavior related to registration and invitations. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An invitation enrolls a user in the wrong organization.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An invitation enrolls a user in the wrong organization.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Registration and invitation consumption preserve identity and organization boundaries.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bind invitations to intended context, expiry and single-use consumption.

Verify: Reproduce the original failure, apply the correction, and assert: Registration and invitation consumption preserve identity and organization boundaries. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-020

**Login correctness** (identity)

Applicability: Apply when the inventory contains behavior related to login correctness. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Incorrect credentials grant access or valid users are rejected.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Incorrect credentials grant access or valid users are rejected.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Valid identities succeed and invalid credentials fail without revealing sensitive details.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Repair credential verification and add positive and negative authentication tests.

Verify: Reproduce the original failure, apply the correction, and assert: Valid identities succeed and invalid credentials fail without revealing sensitive details. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-021

**Password handling** (identity)

Applicability: Apply when the inventory contains behavior related to password handling. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Passwords are stored in plaintext or exposed during changes.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Passwords are stored in plaintext or exposed during changes.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Passwords use appropriate one-way storage and never appear in outputs.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use maintained password-hashing libraries and remove plaintext persistence and logging.

Verify: Reproduce the original failure, apply the correction, and assert: Passwords use appropriate one-way storage and never appear in outputs. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6, ASVS-v5.0.0/V11

## ARG-022

**Account recovery** (identity)

Applicability: Apply when the inventory contains behavior related to account recovery. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Expired or reused reset tokens remain valid.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Expired or reused reset tokens remain valid.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Recovery tokens expire, are single use and affect only the intended account.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bind tokens to the account and operation, expire them and revoke after consumption.

Verify: Reproduce the original failure, apply the correction, and assert: Recovery tokens expire, are single use and affect only the intended account. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-023

**MFA and passkeys** (identity)

Applicability: Apply when the inventory contains behavior related to mfa and passkeys. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A backup route bypasses required verification.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A backup route bypasses required verification.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Every relevant login and recovery route enforces the required assurance level.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Close bypass paths, revoke authenticators correctly and protect recovery codes.

Verify: Reproduce the original failure, apply the correction, and assert: Every relevant login and recovery route enforces the required assurance level. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-024

**OAuth, SSO, and account linking** (identity)

Applicability: Apply when the inventory contains behavior related to oauth, sso, and account linking. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An invalid callback links the wrong identity.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An invalid callback links the wrong identity.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Identity callbacks and linking bind to the initiating session and verified identity.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate state, issuer, audience and redirect bindings using the provider's current guidance.

Verify: Reproduce the original failure, apply the correction, and assert: Identity callbacks and linking bind to the initiating session and verified identity. Include an authorized/valid control case.

References: ASVS-v5.0.0/V10

## ARG-025

**Sessions, cookies, and tokens** (identity)

Applicability: Apply when the inventory contains behavior related to sessions, cookies, and tokens. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Expired tokens work or cookies lack required protections.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Expired tokens work or cookies lack required protections.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Session lifetime, token validation and cookie protections match the threat model.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate token claims and configure secure session transport, scope and expiry.

Verify: Reproduce the original failure, apply the correction, and assert: Session lifetime, token validation and cookie protections match the threat model. Include an authorized/valid control case.

References: ASVS-v5.0.0/V7, ASVS-v5.0.0/V9

## ARG-026

**Logout and access revocation** (identity)

Applicability: Apply when the inventory contains behavior related to logout and access revocation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A suspended user keeps access through an old session.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A suspended user keeps access through an old session.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Logout and privilege revocation invalidate the intended active access.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Invalidate server-side state or use bounded token lifetimes with revocation handling.

Verify: Reproduce the original failure, apply the correction, and assert: Logout and privilege revocation invalidate the intended active access. Include an authorized/valid control case.

References: ASVS-v5.0.0/V7

## ARG-027

**Record-level authorization** (identity)

Applicability: Apply when the inventory contains behavior related to record-level authorization. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Changing an ID exposes another user's record.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Changing an ID exposes another user's record.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Every record operation verifies the current actor's rights.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Enforce authorization on server-side reads and writes, not only in the UI.

Verify: Reproduce the original failure, apply the correction, and assert: Every record operation verifies the current actor's rights. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-028

**Roles and privileged actions** (identity)

Applicability: Apply when the inventory contains behavior related to roles and privileged actions. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A regular user invokes an administrator endpoint.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A regular user invokes an administrator endpoint.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Privileged actions require the appropriate role at execution time.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Centralize permission checks and test direct API access for every role.

Verify: Reproduce the original failure, apply the correction, and assert: Privileged actions require the appropriate role at execution time. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-029

**Tenant and organization isolation** (identity)

Applicability: Apply when the inventory contains behavior related to tenant and organization isolation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An export exposes another organization's data.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An export exposes another organization's data.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: All data paths bind to the active authorized tenant.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Scope queries, cache keys, queues and exports by validated tenant context.

Verify: Reproduce the original failure, apply the correction, and assert: All data paths bind to the active authorized tenant. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-030

**Authentication abuse defenses** (identity)

Applicability: Apply when the inventory contains behavior related to authentication abuse defenses. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Repeated login or recovery attempts face no controls.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Repeated login or recovery attempts face no controls.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Abusive attempts are bounded without exposing account existence.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Add risk-appropriate throttling, safe errors and monitoring without locking out legitimate users indiscriminately.

Verify: Reproduce the original failure, apply the correction, and assert: Abusive attempts are bounded without exposing account existence. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-031

**Sensitive-data protection** (identity)

Applicability: Apply when the inventory contains behavior related to sensitive-data protection. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Private values are exposed in storage or excessive response fields.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Private values are exposed in storage or excessive response fields.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Sensitive data is protected at rest and minimized in responses.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Apply appropriate encryption and explicit response projections; remove unnecessary collection.

Verify: Reproduce the original failure, apply the correction, and assert: Sensitive data is protected at rest and minimized in responses. Include an authorized/valid control case.

References: ASVS-v5.0.0/V11, ASVS-v5.0.0/V14

## ARG-032

**Retention, deletion, and privacy lifecycle** (identity)

Applicability: Apply when the inventory contains behavior related to retention, deletion, and privacy lifecycle. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Deleted data remains accessible in caches or downstream systems.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Deleted data remains accessible in caches or downstream systems.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Deletion and retention fulfill documented obligations across data copies.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Implement lifecycle propagation with auditable completion and documented backup retention.

Verify: Reproduce the original failure, apply the correction, and assert: Deletion and retention fulfill documented obligations across data copies. Include an authorized/valid control case.

References: ASVS-v5.0.0/V14

## ARG-033

**Secrets and credential exposure** (identity)

Applicability: Apply when the inventory contains behavior related to secrets and credential exposure. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Credentials appear in source, bundles, logs or reports.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Credentials appear in source, bundles, logs or reports.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Secrets are not exposed in artifacts or unprivileged interfaces.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Remove exposed values, rotate affected credentials and prevent their reintroduction.

Verify: Reproduce the original failure, apply the correction, and assert: Secrets are not exposed in artifacts or unprivileged interfaces. Include an authorized/valid control case.

References: ASVS-v5.0.0/V11, ASVS-v5.0.0/V14

## ARG-034

**Transport and certificate security** (identity)

Applicability: Apply when the inventory contains behavior related to transport and certificate security. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Sensitive traffic uses plaintext or accepts invalid certificates.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Sensitive traffic uses plaintext or accepts invalid certificates.
- Use distinct synthetic identities, roles and tenants.
- Exercise both the supported flow and direct access to the protected operation.
- Verify negative cases fail without exposing secrets and authorized cases still succeed.

Expected: Protected communication verifies endpoint identity and uses secure transport.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Enforce TLS and certificate verification without bypass flags.

Verify: Reproduce the original failure, apply the correction, and assert: Protected communication verifies endpoint identity and uses secure transport. Include an authorized/valid control case.

References: ASVS-v5.0.0/V12

## ARG-035

**Missing fields and schema completeness** (data)

Applicability: Apply when the inventory contains behavior related to missing fields and schema completeness. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Missing required fields or unexpected nulls crash a workflow.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Missing required fields or unexpected nulls crash a workflow.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Absent, null and present values have explicit validated behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Define required fields, defaults and nullability at API and persistence boundaries.

Verify: Reproduce the original failure, apply the correction, and assert: Absent, null and present values have explicit validated behavior. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-036

**Data types and value boundaries** (data)

Applicability: Apply when the inventory contains behavior related to data types and value boundaries. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Negative quantities or wrong types bypass validation.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Negative quantities or wrong types bypass validation.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Inputs remain within documented types, ranges and sizes.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate types and limits before processing and enforce essential storage constraints.

Verify: Reproduce the original failure, apply the correction, and assert: Inputs remain within documented types, ranges and sizes. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-037

**Empty and insufficient datasets** (data)

Applicability: Apply when the inventory contains behavior related to empty and insufficient datasets. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Empty data causes division by zero or unjustified conclusions.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Empty data causes division by zero or unjustified conclusions.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Empty or sparse data produces honest, usable results.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Add minimum-data checks, empty states and statistical sufficiency rules where relevant.

Verify: Reproduce the original failure, apply the correction, and assert: Empty or sparse data produces honest, usable results. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-038

**Relationships and referential integrity** (data)

Applicability: Apply when the inventory contains behavior related to relationships and referential integrity. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An order references a missing customer.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An order references a missing customer.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Required relationships remain consistent after create, update and delete.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use database constraints and explicit deletion or archival rules.

Verify: Reproduce the original failure, apply the correction, and assert: Required relationships remain consistent after create, update and delete. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-039

**Persistence and durability** (data)

Applicability: Apply when the inventory contains behavior related to persistence and durability. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A saved change disappears after restart.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A saved change disappears after restart.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Acknowledged writes survive the promised restart or failure boundary.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Acknowledge only durable writes and verify restart recovery on an isolated copy.

Verify: Reproduce the original failure, apply the correction, and assert: Acknowledged writes survive the promised restart or failure boundary. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-040

**Transactions and partial writes** (data)

Applicability: Apply when the inventory contains behavior related to transactions and partial writes. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Related writes only partially commit.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Related writes only partially commit.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Multi-step changes meet the documented atomicity requirements.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use transactions or explicit compensating actions and test failure between writes.

Verify: Reproduce the original failure, apply the correction, and assert: Multi-step changes meet the documented atomicity requirements. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-041

**Concurrent modifications** (data)

Applicability: Apply when the inventory contains behavior related to concurrent modifications. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Two edits overwrite one another silently.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Two edits overwrite one another silently.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Concurrent changes preserve invariants or surface a resolvable conflict.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use suitable locking, version checks or conflict-resolution rules.

Verify: Reproduce the original failure, apply the correction, and assert: Concurrent changes preserve invariants or surface a resolvable conflict. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-042

**Operation idempotency** (data)

Applicability: Apply when the inventory contains behavior related to operation idempotency. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Repeated requests create duplicate business objects.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Repeated requests create duplicate business objects.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Repeated operation identifiers cause at most the intended effect.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Persist idempotency decisions atomically with the operation.

Verify: Reproduce the original failure, apply the correction, and assert: Repeated operation identifiers cause at most the intended effect. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-043

**Numeric precision and units** (data)

Applicability: Apply when the inventory contains behavior related to numeric precision and units. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Rounding or unit conversion changes balances.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Rounding or unit conversion changes balances.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Financial and measured values preserve specified precision and units.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use suitable decimal or integer representations and explicit conversion rules.

Verify: Reproduce the original failure, apply the correction, and assert: Financial and measured values preserve specified precision and units. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-044

**Encoding and serialization** (data)

Applicability: Apply when the inventory contains behavior related to encoding and serialization. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Large IDs or Unicode change in transit.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Large IDs or Unicode change in transit.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Round trips preserve the required meaning and precision.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Choose lossless encodings and test boundary values across languages and interfaces.

Verify: Reproduce the original failure, apply the correction, and assert: Round trips preserve the required meaning and precision. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-045

**Schema migrations** (data)

Applicability: Apply when the inventory contains behavior related to schema migrations. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An upgrade drops records or leaves incompatible data.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An upgrade drops records or leaves incompatible data.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Migrations preserve required data and have tested recovery behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use staged compatible migrations and validate on disposable representative datasets.

Verify: Reproduce the original failure, apply the correction, and assert: Migrations preserve required data and have tested recovery behavior. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-046

**Database connectivity and connection pools** (data)

Applicability: Apply when the inventory contains behavior related to database connectivity and connection pools. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Leaked connections exhaust the database pool.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Leaked connections exhaust the database pool.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Connections are bounded, released and fail with controlled timeouts.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Manage connection lifetimes and apply pool limits and acquisition timeouts.

Verify: Reproduce the original failure, apply the correction, and assert: Connections are bounded, released and fail with controlled timeouts. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-047

**Database permissions and access policies** (data)

Applicability: Apply when the inventory contains behavior related to database permissions and access policies. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: The application identity accesses unauthorized records.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: The application identity accesses unauthorized records.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Database privileges enforce the intended minimum access.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Restrict grants and validate row-level policies with distinct synthetic roles.

Verify: Reproduce the original failure, apply the correction, and assert: Database privileges enforce the intended minimum access. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-048

**Query performance** (data)

Applicability: Apply when the inventory contains behavior related to query performance. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Missing indexes or repeated queries cause excessive latency.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Missing indexes or repeated queries cause excessive latency.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Representative queries remain within an explicit performance budget.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Inspect plans, add justified indexes and eliminate repeated or unbounded queries.

Verify: Reproduce the original failure, apply the correction, and assert: Representative queries remain within an explicit performance budget. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-049

**Cache correctness and isolation** (data)

Applicability: Apply when the inventory contains behavior related to cache correctness and isolation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A user sees stale permissions or another user's cached data.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A user sees stale permissions or another user's cached data.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: Cache entries respect identity, freshness and invalidation requirements.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Include the correct scope in keys and invalidate security-sensitive entries promptly.

Verify: Reproduce the original failure, apply the correction, and assert: Cache entries respect identity, freshness and invalidation requirements. Include an authorized/valid control case.

References: ASVS-v5.0.0/V14

## ARG-050

**Backup and restoration** (data)

Applicability: Apply when the inventory contains behavior related to backup and restoration. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A backup cannot restore a consistent working app.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A backup cannot restore a consistent working app.
- Use absent, null, malformed, boundary and representative datasets.
- Inject a controlled failure or concurrent operation in an isolated fixture.
- Verify state and invariants after completion, restart or rollback.

Expected: An isolated restore recovers the required data and service behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Test restoration regularly and define recovery objectives with verified procedures.

Verify: Reproduce the original failure, apply the correction, and assert: An isolated restore recovers the required data and service behavior. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-051

**API contracts and version compatibility** (security)

Applicability: Apply when the inventory contains behavior related to api contracts and version compatibility. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A changed response breaks an existing client.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A changed response breaks an existing client.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Supported clients and servers agree on the declared contract.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Version breaking changes and add consumer/server contract tests.

Verify: Reproduce the original failure, apply the correction, and assert: Supported clients and servers agree on the declared contract. Include an authorized/valid control case.

References: ASVS-v5.0.0/V4

## ARG-052

**API error semantics** (security)

Applicability: Apply when the inventory contains behavior related to api error semantics. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An API returns success for a failed operation.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An API returns success for a failed operation.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Status and error bodies accurately describe outcomes without sensitive internals.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use consistent error contracts and sanitize internal exceptions.

Verify: Reproduce the original failure, apply the correction, and assert: Status and error bodies accurately describe outcomes without sensitive internals. Include an authorized/valid control case.

References: ASVS-v5.0.0/V16

## ARG-053

**API quotas and resource abuse** (security)

Applicability: Apply when the inventory contains behavior related to api quotas and resource abuse. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Unbounded requests exhaust service capacity.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Unbounded requests exhaust service capacity.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Request cost, size and concurrency stay within defined limits.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bound expensive operations and apply suitable per-actor quotas.

Verify: Reproduce the original failure, apply the correction, and assert: Request cost, size and concurrency stay within defined limits. Include an authorized/valid control case.

References: ASVS-v5.0.0/V4

## ARG-054

**SQL and NoSQL injection** (security)

Applicability: Apply when the inventory contains behavior related to sql and nosql injection. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: User input changes a database query's meaning.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: User input changes a database query's meaning.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Untrusted data cannot alter query structure.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use parameterized queries and constrained operators rather than string concatenation.

Verify: Reproduce the original failure, apply the correction, and assert: Untrusted data cannot alter query structure. Include an authorized/valid control case.

References: ASVS-v5.0.0/V1

## ARG-055

**Command and template injection** (security)

Applicability: Apply when the inventory contains behavior related to command and template injection. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A filename causes unintended shell or template execution.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A filename causes unintended shell or template execution.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Untrusted values remain data at execution boundaries.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Avoid shell interpolation; use argv and restricted template capabilities.

Verify: Reproduce the original failure, apply the correction, and assert: Untrusted values remain data at execution boundaries. Include an authorized/valid control case.

References: ASVS-v5.0.0/V1

## ARG-056

**Cross-site scripting** (security)

Applicability: Apply when the inventory contains behavior related to cross-site scripting. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Stored content executes unintended browser script.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Stored content executes unintended browser script.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Untrusted content is rendered with context-appropriate protection.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Prefer safe text rendering and maintained context-aware sanitization when HTML is required.

Verify: Reproduce the original failure, apply the correction, and assert: Untrusted content is rendered with context-appropriate protection. Include an authorized/valid control case.

References: ASVS-v5.0.0/V1

## ARG-057

**Cross-site request forgery** (security)

Applicability: Apply when the inventory contains behavior related to cross-site request forgery. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An unrelated site triggers a sensitive session action.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An unrelated site triggers a sensitive session action.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: State changes require the intended request origin and anti-forgery controls.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Apply appropriate CSRF defenses and secure cookie settings.

Verify: Reproduce the original failure, apply the correction, and assert: State changes require the intended request origin and anti-forgery controls. Include an authorized/valid control case.

References: ASVS-v5.0.0/V3

## ARG-058

**Cross-origin access rules** (security)

Applicability: Apply when the inventory contains behavior related to cross-origin access rules. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An untrusted origin reads credentialed responses.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An untrusted origin reads credentialed responses.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Cross-origin access is limited to explicitly intended callers.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use precise origin rules and avoid reflecting arbitrary origins with credentials.

Verify: Reproduce the original failure, apply the correction, and assert: Cross-origin access is limited to explicitly intended callers. Include an authorized/valid control case.

References: ASVS-v5.0.0/V3

## ARG-059

**Server-side request forgery** (security)

Applicability: Apply when the inventory contains behavior related to server-side request forgery. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A user URL reaches an unauthorized internal endpoint in a fixture.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A user URL reaches an unauthorized internal endpoint in a fixture.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Outbound destinations remain within authorized network boundaries.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate resolved destinations, redirects and protocols and enforce egress restrictions.

Verify: Reproduce the original failure, apply the correction, and assert: Outbound destinations remain within authorized network boundaries. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-060

**Path traversal and filesystem boundaries** (security)

Applicability: Apply when the inventory contains behavior related to path traversal and filesystem boundaries. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A download or extraction escapes its allowed directory.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A download or extraction escapes its allowed directory.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Canonical paths stay inside approved roots including symlink handling.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Resolve and validate paths; reject traversal, unsafe links and archive escapes.

Verify: Reproduce the original failure, apply the correction, and assert: Canonical paths stay inside approved roots including symlink handling. Include an authorized/valid control case.

References: ASVS-v5.0.0/V5

## ARG-061

**Uploaded-content safety** (security)

Applicability: Apply when the inventory contains behavior related to uploaded-content safety. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A fake extension allows active content to be served.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A fake extension allows active content to be served.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Accepted files satisfy content, size and serving restrictions.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Inspect content, isolate uploads and serve them with safe headers and permissions.

Verify: Reproduce the original failure, apply the correction, and assert: Accepted files satisfy content, size and serving restrictions. Include an authorized/valid control case.

References: ASVS-v5.0.0/V5

## ARG-062

**Redirects and deep-link validation** (security)

Applicability: Apply when the inventory contains behavior related to redirects and deep-link validation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A link redirects to an untrusted destination or privileged action.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A link redirects to an untrusted destination or privileged action.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Redirects and deep links allow only documented destinations and actions.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate destinations and recheck authorization after deep-link entry.

Verify: Reproduce the original failure, apply the correction, and assert: Redirects and deep links allow only documented destinations and actions. Include an authorized/valid control case.

References: ASVS-v5.0.0/V3

## ARG-063

**Webhook authenticity** (security)

Applicability: Apply when the inventory contains behavior related to webhook authenticity. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A forged callback changes account or payment status.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A forged callback changes account or payment status.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Callbacks are authenticated before any state change.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Verify provider signatures over the correct raw payload and protect verification secrets.

Verify: Reproduce the original failure, apply the correction, and assert: Callbacks are authenticated before any state change. Include an authorized/valid control case.

References: ASVS-v5.0.0/V4, ASVS-v5.0.0/V11

## ARG-064

**Webhook replay and event ordering** (security)

Applicability: Apply when the inventory contains behavior related to webhook replay and event ordering. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: An old or duplicate event overwrites a newer state.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An old or duplicate event overwrites a newer state.
- Trace attacker-controlled input across the trust boundary.
- Use harmless sentinel payloads in an isolated fixture to test the invariant.
- Record exploit prerequisites and corroborating evidence; static matches are hypotheses.

Expected: Duplicate and out-of-order events preserve valid state transitions.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Deduplicate events and enforce a versioned transition model.

Verify: Reproduce the original failure, apply the correction, and assert: Duplicate and out-of-order events preserve valid state transitions. Include an authorized/valid control case.

References: ASVS-v5.0.0/V4

## ARG-065

**Third-party failures and timeouts** (integration)

Applicability: Apply when the inventory contains behavior related to third-party failures and timeouts. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: One unavailable provider blocks unrelated functions.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: One unavailable provider blocks unrelated functions.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Provider failures terminate within bounded time and degrade only intended features.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Apply timeouts, isolation and meaningful fallback behavior.

Verify: Reproduce the original failure, apply the correction, and assert: Provider failures terminate within bounded time and degrade only intended features. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-066

**Retry and circuit-breaker behavior** (integration)

Applicability: Apply when the inventory contains behavior related to retry and circuit-breaker behavior. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Retries amplify an outage or repeat irreversible effects.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Retries amplify an outage or repeat irreversible effects.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Retries are bounded, appropriate and safe for the operation.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use capped backoff with jitter, idempotency and circuit breaking where useful.

Verify: Reproduce the original failure, apply the correction, and assert: Retries are bounded, appropriate and safe for the operation. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-067

**Chat sending and receiving** (integration)

Applicability: Apply when the inventory contains behavior related to chat sending and receiving. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A message appears sent but never reaches the other test user.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A message appears sent but never reaches the other test user.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Authorized isolated test users exchange messages with accurate state.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Trace message persistence, fanout and acknowledgement and fix the first failed boundary.

Verify: Reproduce the original failure, apply the correction, and assert: Authorized isolated test users exchange messages with accurate state. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-068

**Chat history and ordering** (integration)

Applicability: Apply when the inventory contains behavior related to chat history and ordering. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Reconnect loses history or duplicates messages.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Reconnect loses history or duplicates messages.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: History and sequence remain consistent through reconnect and pagination.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use stable message identifiers and reconciliation with server state.

Verify: Reproduce the original failure, apply the correction, and assert: History and sequence remain consistent through reconnect and pagination. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-069

**Realtime connection lifecycle** (integration)

Applicability: Apply when the inventory contains behavior related to realtime connection lifecycle. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A dropped socket still appears connected.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A dropped socket still appears connected.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Connection state, reconnect and authorization reflect actual transport state.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Handle disconnects, bounded reconnect and resubscription with renewed authorization.

Verify: Reproduce the original failure, apply the correction, and assert: Connection state, reconnect and authorization reflect actual transport state. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-070

**Chat media and attachments** (integration)

Applicability: Apply when the inventory contains behavior related to chat media and attachments. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Attachments are inaccessible to recipients or visible to outsiders.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Attachments are inaccessible to recipients or visible to outsiders.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Only intended participants access valid attachments.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bind attachment access to conversation authorization and handle incomplete uploads.

Verify: Reproduce the original failure, apply the correction, and assert: Only intended participants access valid attachments. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-071

**WhatsApp integration** (integration)

Applicability: Apply when the inventory contains behavior related to whatsapp integration. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A simulated template rejection is displayed as delivered.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A simulated template rejection is displayed as delivered.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Provider simulations produce correct WhatsApp workflow state and failure feedback.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Map provider responses and webhook states explicitly; keep real delivery unverified.

Verify: Reproduce the original failure, apply the correction, and assert: Provider simulations produce correct WhatsApp workflow state and failure feedback. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-072

**Email integration** (integration)

Applicability: Apply when the inventory contains behavior related to email integration. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A simulated bounce is marked delivered.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A simulated bounce is marked delivered.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Email queues and simulated provider events produce accurate application state.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Separate queued, accepted, delivered and failure states with bounded retry rules.

Verify: Reproduce the original failure, apply the correction, and assert: Email queues and simulated provider events produce accurate application state. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-073

**SMS and OTP delivery workflows** (integration)

Applicability: Apply when the inventory contains behavior related to sms and otp delivery workflows. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A delayed simulated OTP remains usable after expiry.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A delayed simulated OTP remains usable after expiry.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Delivery retries do not extend or conflict with authentication token validity.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Bind OTP expiry to issuance and handle delayed or failed sends independently.

Verify: Reproduce the original failure, apply the correction, and assert: Delivery retries do not extend or conflict with authentication token validity. Include an authorized/valid control case.

References: ASVS-v5.0.0/V6

## ARG-074

**Push notifications** (integration)

Applicability: Apply when the inventory contains behavior related to push notifications. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Invalid device tokens crash processing or target the wrong account.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Invalid device tokens crash processing or target the wrong account.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Simulated push failures are isolated and device tokens belong to the correct user.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Revoke invalid tokens and validate ownership and platform response handling.

Verify: Reproduce the original failure, apply the correction, and assert: Simulated push failures are isolated and device tokens belong to the correct user. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-075

**Message queues and dead-letter handling** (integration)

Applicability: Apply when the inventory contains behavior related to message queues and dead-letter handling. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: One invalid message blocks a queue or silently vanishes.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: One invalid message blocks a queue or silently vanishes.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Poison messages are bounded, observable and recoverable without blocking valid work.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Limit attempts and provide dead-letter inspection and controlled replay.

Verify: Reproduce the original failure, apply the correction, and assert: Poison messages are bounded, observable and recoverable without blocking valid work. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-076

**Notification preferences and consent** (integration)

Applicability: Apply when the inventory contains behavior related to notification preferences and consent. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: An unsubscribed user enters a simulated marketing send.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An unsubscribed user enters a simulated marketing send.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Applicable communication preferences are enforced at send time.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Check current preferences in the send path and process unsubscribe changes reliably.

Verify: Reproduce the original failure, apply the correction, and assert: Applicable communication preferences are enforced at send time. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-077

**Checkout prices and totals** (integration)

Applicability: Apply when the inventory contains behavior related to checkout prices and totals. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Client changes alter the authoritative payable amount.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Client changes alter the authoritative payable amount.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: The server calculates and validates prices, taxes and discounts.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Recalculate totals from trusted server data and bind them to payment intent.

Verify: Reproduce the original failure, apply the correction, and assert: The server calculates and validates prices, taxes and discounts. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-078

**Payment state transitions** (integration)

Applicability: Apply when the inventory contains behavior related to payment state transitions. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: A failed simulated payment grants access.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A failed simulated payment grants access.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Only valid authoritative payment transitions grant entitlements.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Implement an explicit payment state machine and verify trusted completion events.

Verify: Reproduce the original failure, apply the correction, and assert: Only valid authoritative payment transitions grant entitlements. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-079

**Duplicate-charge prevention** (integration)

Applicability: Apply when the inventory contains behavior related to duplicate-charge prevention. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Timeout retries create two simulated charges.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Timeout retries create two simulated charges.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Repeated attempts produce at most the intended charge.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Reuse provider idempotency keys and persist operation identity across retries.

Verify: Reproduce the original failure, apply the correction, and assert: Repeated attempts produce at most the intended charge. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-080

**Refunds and cancellations** (integration)

Applicability: Apply when the inventory contains behavior related to refunds and cancellations. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Refunds leave inventory or access inconsistent.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Refunds leave inventory or access inconsistent.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Refund and cancellation workflows update all required business state.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Define compensations and reconcile money, orders, inventory and access.

Verify: Reproduce the original failure, apply the correction, and assert: Refund and cancellation workflows update all required business state. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-081

**Subscription lifecycle** (integration)

Applicability: Apply when the inventory contains behavior related to subscription lifecycle. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: An expired subscription retains paid privileges.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An expired subscription retains paid privileges.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Entitlements match valid renewal, cancellation and plan transitions.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Derive access from authoritative subscription state with explicit grace rules.

Verify: Reproduce the original failure, apply the correction, and assert: Entitlements match valid renewal, cancellation and plan transitions. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-082

**Payment reconciliation** (integration)

Applicability: Apply when the inventory contains behavior related to payment reconciliation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks; A simulated provider; external delivery must remain blocked

Failure examples: Provider success remains permanently pending internally.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Provider success remains permanently pending internally.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Reconciliation detects and resolves inconsistent simulated payment records.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Implement idempotent reconciliation using authoritative events and stable identifiers.

Verify: Reproduce the original failure, apply the correction, and assert: Reconciliation detects and resolves inconsistent simulated payment records. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-083

**Inventory and reservations** (integration)

Applicability: Apply when the inventory contains behavior related to inventory and reservations. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Concurrent orders oversell stock.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Concurrent orders oversell stock.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Reservations and purchases preserve available inventory constraints.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use atomic capacity updates and reliably expire unused reservations.

Verify: Reproduce the original failure, apply the correction, and assert: Reservations and purchases preserve available inventory constraints. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-084

**Business rules and workflow transitions** (integration)

Applicability: Apply when the inventory contains behavior related to business rules and workflow transitions. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A user bypasses required approval or approves their own request.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A user bypasses required approval or approves their own request.
- Replace external providers with local fixtures; deny all external delivery.
- Replay accepted, failed, delayed, duplicate and out-of-order events as applicable.
- Assert persisted state and visible feedback; real delivery remains unverified.

Expected: Transitions obey documented business and separation-of-duty rules.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Enforce business invariants centrally and test forbidden transitions.

Verify: Reproduce the original failure, apply the correction, and assert: Transitions obey documented business and separation-of-duty rules. Include an authorized/valid control case.

References: ASVS-v5.0.0/V2

## ARG-085

**Dependencies and supply-chain exposure** (operations)

Applicability: Apply when the inventory contains behavior related to dependencies and supply-chain exposure. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A vulnerable dependency or unsafe install script introduces risk.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A vulnerable dependency or unsafe install script introduces risk.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Dependency provenance and known vulnerability results are reviewed with current evidence.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Update or mitigate affected packages, pin dependencies and review installation behavior.

Verify: Reproduce the original failure, apply the correction, and assert: Dependency provenance and known vulnerability results are reviewed with current evidence. Include an authorized/valid control case.

References: ASVS-v5.0.0/V13

## ARG-086

**Builds and deployment configuration** (operations)

Applicability: Apply when the inventory contains behavior related to builds and deployment configuration. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Production builds omit assets or expose debug settings.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Production builds omit assets or expose debug settings.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: The intended production artifact builds and uses correct public configuration.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate production builds and distinguish public configuration from secrets.

Verify: Reproduce the original failure, apply the correction, and assert: The intended production artifact builds and uses correct public configuration. Include an authorized/valid control case.

References: ASVS-v5.0.0/V13

## ARG-087

**Release and rollback compatibility** (operations)

Applicability: Apply when the inventory contains behavior related to release and rollback compatibility. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A rollback cannot read the current schema or queued work.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A rollback cannot read the current schema or queued work.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Supported rollout and rollback combinations preserve required service behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use compatible staged releases and exercise rollback against representative state.

Verify: Reproduce the original failure, apply the correction, and assert: Supported rollout and rollback combinations preserve required service behavior. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-088

**Load and capacity** (operations)

Applicability: Apply when the inventory contains behavior related to load and capacity. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Expected peak activity causes unacceptable latency or cost.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Expected peak activity causes unacceptable latency or cost.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Declared workload and cost budgets hold under bounded isolated load.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Measure bottlenecks, bound work and add capacity based on tested assumptions.

Verify: Reproduce the original failure, apply the correction, and assert: Declared workload and cost budgets hold under bounded isolated load. Include an authorized/valid control case.

References: Google-SRE-monitoring

## ARG-089

**Resource exhaustion and leaks** (operations)

Applicability: Apply when the inventory contains behavior related to resource exhaustion and leaks. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Memory, disk or handles are progressively exhausted.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Memory, disk or handles are progressively exhausted.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Resources are bounded and released on success, failure and cancellation.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Fix resource lifecycle leaks and add limits with observable failure behavior.

Verify: Reproduce the original failure, apply the correction, and assert: Resources are bounded and released on success, failure and cancellation. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15, Google-SRE-monitoring

## ARG-090

**Health checks, logs, metrics, and alerts** (operations)

Applicability: Apply when the inventory contains behavior related to health checks, logs, metrics, and alerts. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Health remains green during a critical outage.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Health remains green during a critical outage.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Health and telemetry reveal actionable failures without exposing secrets.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Separate liveness/readiness and instrument critical dependencies and user journeys.

Verify: Reproduce the original failure, apply the correction, and assert: Health and telemetry reveal actionable failures without exposing secrets. Include an authorized/valid control case.

References: ASVS-v5.0.0/V16, Google-SRE-monitoring

## ARG-091

**Scheduled and background jobs** (operations)

Applicability: Apply when the inventory contains behavior related to scheduled and background jobs. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A job silently stops or runs twice.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A job silently stops or runs twice.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Jobs execute with documented scheduling and duplicate-handling semantics.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Persist job state and implement overlap control, retries and failure visibility.

Verify: Reproduce the original failure, apply the correction, and assert: Jobs execute with documented scheduling and duplicate-handling semantics. Include an authorized/valid control case.

References: Google-SRE-monitoring

## ARG-092

**Shutdown and crash recovery** (operations)

Applicability: Apply when the inventory contains behavior related to shutdown and crash recovery. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Termination loses acknowledged work or prevents restart.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Termination loses acknowledged work or prevents restart.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Shutdown and restart preserve documented durability and recovery guarantees.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Drain safely, checkpoint durable work and verify interrupted-operation recovery.

Verify: Reproduce the original failure, apply the correction, and assert: Shutdown and restart preserve documented durability and recovery guarantees. Include an authorized/valid control case.

References: Google-SRE-monitoring

## ARG-093

**Offline synchronization and conflicts** (operations)

Applicability: Apply when the inventory contains behavior related to offline synchronization and conflicts. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Reconnect overwrites newer data or duplicates actions.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Reconnect overwrites newer data or duplicates actions.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Synchronization preserves identity and resolves conflicts explicitly.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Use stable operation IDs, versioning and documented merge rules.

Verify: Reproduce the original failure, apply the correction, and assert: Synchronization preserves identity and resolves conflicts explicitly. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-094

**Mobile permissions and local storage** (operations)

Applicability: Apply when the inventory contains behavior related to mobile permissions and local storage. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Denied permissions crash the app or local backups expose tokens.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Denied permissions crash the app or local backups expose tokens.
- For mobile targets, map secure storage to MASVS-STORAGE, permission/IPC boundaries to MASVS-PLATFORM, and permission minimization to MASVS-PRIVACY in version 2.1.0; select exact controls before making a control-level claim.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Permission denial is handled and local sensitive data uses appropriate platform protection.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Minimize permissions and use platform secure storage with controlled backup behavior.

Verify: Reproduce the original failure, apply the correction, and assert: Permission denial is handled and local sensitive data uses appropriate platform protection. Include an authorized/valid control case.

References: MASVS-v2.1.0

## ARG-095

**Desktop IPC and native privileges** (operations)

Applicability: Apply when the inventory contains behavior related to desktop ipc and native privileges. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Renderer input invokes privileged native functions.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Renderer input invokes privileged native functions.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: IPC validates sender, operation and data before privileged effects.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Expose a minimal validated bridge and isolate untrusted renderer content.

Verify: Reproduce the original failure, apply the correction, and assert: IPC validates sender, operation and data before privileged effects. Include an authorized/valid control case.

References: Argus functional guidance.

## ARG-096

**Installation, signing, and updates** (operations)

Applicability: Apply when the inventory contains behavior related to installation, signing, and updates. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: An untrusted update is accepted or installation cannot recover.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: An untrusted update is accepted or installation cannot recover.
- For mobile targets only, review MASVS-CODE and MASVS-RESILIENCE in version 2.1.0 when selecting signing/update tests; desktop installers require their own platform evidence.
- Define an explicit workload, resource or recovery objective first.
- Exercise a bounded failure on a disposable copy using available infrastructure.
- Compare measured outcomes to the objective and verify cleanup and recovery.

Expected: Artifacts are verified and interrupted updates preserve a recoverable installation.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate signatures and use atomic installation with tested recovery.

Verify: Reproduce the original failure, apply the correction, and assert: Artifacts are verified and interrupted updates preserve a recoverable installation. Include an authorized/valid control case.

References: MASVS-v2.1.0

## ARG-097

**AI output handling and fallback** (ai)

Applicability: Apply when the inventory contains behavior related to ai output handling and fallback. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Invalid model output crashes a workflow or an outage traps users.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Invalid model output crashes a workflow or an outage traps users.
- Use synthetic protected data and adversarial untrusted content.
- Observe actual authorization and output boundaries rather than model promises.
- Record uncertainty, provenance and unavailable execution evidence.

Expected: Model output is validated and unavailable models have explicit failure behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Validate structured outputs, bound resource usage and implement task-appropriate fallback.

Verify: Reproduce the original failure, apply the correction, and assert: Model output is validated and unavailable models have explicit failure behavior. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-098

**AI prompt injection** (ai)

Applicability: Apply when the inventory contains behavior related to ai prompt injection. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Uploaded instructions attempt to expose protected data.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Uploaded instructions attempt to expose protected data.
- Use synthetic protected data and adversarial untrusted content.
- Observe actual authorization and output boundaries rather than model promises.
- Record uncertainty, provenance and unavailable execution evidence.

Expected: Untrusted content cannot redefine authority or trigger unauthorized actions.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Separate instructions from data and enforce tool/data boundaries outside model text.

Verify: Reproduce the original failure, apply the correction, and assert: Untrusted content cannot redefine authority or trigger unauthorized actions. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15

## ARG-099

**AI retrieval and knowledge isolation** (ai)

Applicability: Apply when the inventory contains behavior related to ai retrieval and knowledge isolation. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Retrieval supplies another tenant's or outdated documents.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Retrieval supplies another tenant's or outdated documents.
- Use synthetic protected data and adversarial untrusted content.
- Observe actual authorization and output boundaries rather than model promises.
- Record uncertainty, provenance and unavailable execution evidence.

Expected: Retrieval enforces access controls and communicates provenance and freshness.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Filter by authenticated scope before retrieval and validate source lifecycle controls.

Verify: Reproduce the original failure, apply the correction, and assert: Retrieval enforces access controls and communicates provenance and freshness. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-100

**MCP tool permissions and response trust** (ai)

Applicability: Apply when the inventory contains behavior related to mcp tool permissions and response trust. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: A tool has excessive access or malicious output becomes an instruction.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: A tool has excessive access or malicious output becomes an instruction.
- Use synthetic protected data and adversarial untrusted content.
- Observe actual authorization and output boundaries rather than model promises.
- Record uncertainty, provenance and unavailable execution evidence.

Expected: Tool capabilities remain scoped and responses are treated as untrusted evidence.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Enforce permissions in the host, constrain arguments and never execute returned instructions.

Verify: Reproduce the original failure, apply the correction, and assert: Tool capabilities remain scoped and responses are treated as untrusted evidence. Include an authorized/valid control case.

References: ASVS-v5.0.0/V8

## ARG-101

**Feature flags and cross-feature regressions** (ai)

Applicability: Apply when the inventory contains behavior related to feature flags and cross-feature regressions. Absence of a signal is unknown, not proof of non-applicability.

Prerequisites: Confirmed expected behavior and scoped application artifacts; Synthetic fixtures and an isolated runner for dynamic checks

Failure examples: Combining two working features breaks a critical journey.

- Create an application-specific reproduction of this failure using the mapped feature and an independent expected result: Combining two working features breaks a critical journey.
- Use synthetic protected data and adversarial untrusted content.
- Observe actual authorization and output boundaries rather than model promises.
- Record uncertainty, provenance and unavailable execution evidence.

Expected: Relevant flag combinations preserve existing required behavior.

Evidence: Affected feature and location; Expected versus observed behavior; Reproduction command or source-trace details; Evidence type, revision, limitations and sanitized output

Remediation: Test high-risk interactions and rollouts with explicit compatibility assumptions.

Verify: Reproduce the original failure, apply the correction, and assert: Relevant flag combinations preserve existing required behavior. Include an authorized/valid control case.

References: ASVS-v5.0.0/V15
