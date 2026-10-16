# Argus application audit

**Readiness:** meets_configured_checks  
**Run:** 828fddb1-db7b-4310-b78e-9c5d1a944fe8  
**Status:** completed  
**Source fingerprint:** c3f24b5032519a4ff1fc59325d38b9e8bdaf922605f3f2dfbbc08e92b7408252  
**Configuration fingerprint:** f457fec73aab3a9e3e5addf0913eae5de4d2cac9f7fa33e3c825fedc4b63c429  
**Profile:** full

Real external message/payment delivery: **unverified**. External providers are simulated. Passing scenarios establish only the tested behavior.

## Findings

No findings were produced by the checks that ran. Read the coverage gaps below.

## Feature register

| Feature | Origin | Areas | Scenarios / gap |
|---|---|---|---|
| fixture-app: Synthetic application acceptance behavior | declared | ARG-001, ARG-012, ARG-020, ARG-027, ARG-029, ARG-035, ARG-039, ARG-063, ARG-064, ARG-065, ARG-067, ARG-068, ARG-071, ARG-072, ARG-073, ARG-078, ARG-079 | login: passed; tenant-isolation: passed; field-validation: passed; durability: passed; chat-dedupe: passed; email-state: passed; whatsapp-state: passed; sms-expiry: passed; webhook-auth: passed; webhook-order: passed; payment-failure: passed; duplicate-payment: passed; outage-fallback: passed; export-feature: passed |

## 101-area coverage

A passed area means its configured scenarios passed; it does not establish exhaustive coverage of all possible inputs. Unknown applicability remains incomplete.

| Area | Applicability | Outcome | Evidence type | Reason |
|---|---|---|---|---|
| ARG-001 Feature completeness | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-002 Complete user journeys | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-003 Startup and configuration | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-004 URLs and routing | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-005 Buttons, navigation, and commands | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-006 Forms and input validation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-007 Loading, empty, and success states | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-008 Error recovery and user progress | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-009 Search, filtering, and sorting | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-010 Pagination and large collections | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-011 Upload functionality | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-012 Downloads and exports | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-013 Imports and bulk ingestion | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-014 Reports and business calculations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-015 Languages and regional formats | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-016 Dates, time zones, and calendars | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-017 Accessibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-018 Browser, screen, and input compatibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-019 Registration and invitations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-020 Login correctness | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-021 Password handling | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-022 Account recovery | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-023 MFA and passkeys | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-024 OAuth, SSO, and account linking | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-025 Sessions, cookies, and tokens | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-026 Logout and access revocation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-027 Record-level authorization | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-028 Roles and privileged actions | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-029 Tenant and organization isolation | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-030 Authentication abuse defenses | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-031 Sensitive-data protection | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-032 Retention, deletion, and privacy lifecycle | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-033 Secrets and credential exposure | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-034 Transport and certificate security | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-035 Missing fields and schema completeness | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-036 Data types and value boundaries | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-037 Empty and insufficient datasets | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-038 Relationships and referential integrity | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-039 Persistence and durability | applicable | passed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-040 Transactions and partial writes | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-041 Concurrent modifications | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-042 Operation idempotency | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-043 Numeric precision and units | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-044 Encoding and serialization | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-045 Schema migrations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-046 Database connectivity and connection pools | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-047 Database permissions and access policies | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-048 Query performance | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-049 Cache correctness and isolation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-050 Backup and restoration | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-051 API contracts and version compatibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-052 API error semantics | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-053 API quotas and resource abuse | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-054 SQL and NoSQL injection | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-055 Command and template injection | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-056 Cross-site scripting | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-057 Cross-site request forgery | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-058 Cross-origin access rules | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-059 Server-side request forgery | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-060 Path traversal and filesystem boundaries | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-061 Uploaded-content safety | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-062 Redirects and deep-link validation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-063 Webhook authenticity | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-064 Webhook replay and event ordering | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-065 Third-party failures and timeouts | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-066 Retry and circuit-breaker behavior | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-067 Chat sending and receiving | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-068 Chat history and ordering | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-069 Realtime connection lifecycle | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-070 Chat media and attachments | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-071 WhatsApp integration | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-072 Email integration | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-073 SMS and OTP delivery workflows | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-074 Push notifications | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-075 Message queues and dead-letter handling | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-076 Notification preferences and consent | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-077 Checkout prices and totals | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-078 Payment state transitions | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-079 Duplicate-charge prevention | applicable | passed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-080 Refunds and cancellations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-081 Subscription lifecycle | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-082 Payment reconciliation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-083 Inventory and reservations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-084 Business rules and workflow transitions | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-085 Dependencies and supply-chain exposure | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-086 Builds and deployment configuration | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-087 Release and rollback compatibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-088 Load and capacity | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-089 Resource exhaustion and leaks | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-090 Health checks, logs, metrics, and alerts | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-091 Scheduled and background jobs | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-092 Shutdown and crash recovery | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-093 Offline synchronization and conflicts | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-094 Mobile permissions and local storage | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-095 Desktop IPC and native privileges | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-096 Installation, signing, and updates | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-097 AI output handling and fallback | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-098 AI prompt injection | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-099 AI retrieval and knowledge isolation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-100 MCP tool permissions and response trust | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-101 Feature flags and cross-feature regressions | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |

## Scenario results

| Scenario | Outcome | Evidence | Observation |
|---|---|---|---|
| login: Reject invalid credentials | passed | observed | Expected acceptance assertion held. |
| tenant-isolation: Deny another tenant and owner | passed | observed | Expected acceptance assertion held. |
| field-validation: Reject missing required name | passed | observed | Expected acceptance assertion held. |
| durability: Reload a persisted value | passed | observed | Expected acceptance assertion held. |
| chat-dedupe: Deduplicate and order chat messages | passed | simulated | Expected acceptance assertion held. |
| email-state: Keep acceptance distinct from delivery and bounce | passed | simulated | Expected acceptance assertion held. |
| whatsapp-state: Handle rejected WhatsApp templates | passed | simulated | Expected acceptance assertion held. |
| sms-expiry: Reject expired simulated OTPs | passed | simulated | Expected acceptance assertion held. |
| webhook-auth: Reject forged webhook signature | passed | simulated | Expected acceptance assertion held. |
| webhook-order: Ignore older webhook events | passed | simulated | Expected acceptance assertion held. |
| payment-failure: Deny paid access after failed payment | passed | simulated | Expected acceptance assertion held. |
| duplicate-payment: Avoid duplicate simulated charges | passed | simulated | Expected acceptance assertion held. |
| outage-fallback: Return explicit failure during provider outage | passed | simulated | Expected acceptance assertion held. |
| export-feature: Implement required export function | passed | observed | Expected acceptance assertion held. |

## Limitations and errors

- Discovery uses bounded source and documentation signals, not complete semantic analysis. Confirm requirements and expand candidate modules into user journeys.
- Ignored: secrets files, symlinks, dependencies, Git history, generated builds and binary artifacts. Inspect those separately when in scope.
- No credential, provider or production connection is attempted. Real delivery remains unverified.

## Suggested next steps

Resolve failed required journeys first. Confirm suspected security findings by tracing the affected source. Supply missing acceptance scenarios or infrastructure for blocked and untested features. Treat optional product improvements separately from confirmed requirements.
