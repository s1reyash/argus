# Argus application audit

**Readiness:** blocked  
**Run:** 3467a95f-22c2-46c1-95b9-478709f9aa0e  
**Status:** completed  
**Source fingerprint:** 3d418af2a8172845adb2c8f161c1c8bc6db8d0f04a3b64ea02f3a13dc88131cb  
**Configuration fingerprint:** f457fec73aab3a9e3e5addf0913eae5de4d2cac9f7fa33e3c825fedc4b63c429  
**Profile:** full

Real external message/payment delivery: **unverified**. External providers are simulated. Passing scenarios establish only the tested behavior.

## Findings

### HIGH — Possible embedded credential

- Kind / confidence: suspected_weakness / medium
- Areas: ARG-033
- Location: app.mjs:4
- Expected: Secrets are not exposed in artifacts or unprivileged interfaces.
- Observed: A source pattern matched. Reachability and exploitability are not established.
- Evidence: Rule embedded-credential matched at app.mjs:4; raw matched values are deliberately omitted.
- Reproduce: Inspect the indicated location and trace the data flow in an isolated fixture.
- Likely cause: Potential unsafe configuration or trust-boundary handling; source review required.
- Fix: Remove exposed values, rotate affected credentials and prevent their reintroduction.
- Verify: Reproduce the original failure, apply the correction, and assert: Secrets are not exposed in artifacts or unprivileged interfaces. Include an authorized/valid control case.

### HIGH — Reject invalid credentials

- Kind / confidence: functional_defect / high
- Areas: ARG-020
- Location: scenario:login
- Expected: Reject invalid credentials in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: true !== false 
- Evidence: Assertion failed in login
- Reproduce: Run the reviewed scenario login through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Repair credential verification and add positive and negative authentication tests.
- Verify: Re-run login with unchanged acceptance criteria after correction.

### HIGH — Deny another tenant and owner

- Kind / confidence: functional_defect / high
- Areas: ARG-027, ARG-029
- Location: scenario:tenant-isolation
- Expected: Deny another tenant and owner in the isolated synthetic fixture.
- Observed: Missing expected exception.
- Evidence: Assertion failed in tenant-isolation
- Reproduce: Run the reviewed scenario tenant-isolation through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Enforce authorization on server-side reads and writes, not only in the UI.
- Verify: Re-run tenant-isolation with unchanged acceptance criteria after correction.

### HIGH — Reject missing required name

- Kind / confidence: functional_defect / high
- Areas: ARG-035
- Location: scenario:field-validation
- Expected: Reject missing required name in the isolated synthetic fixture.
- Observed: Missing expected exception.
- Evidence: Assertion failed in field-validation
- Reproduce: Run the reviewed scenario field-validation through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Define required fields, defaults and nullability at API and persistence boundaries.
- Verify: Re-run field-validation with unchanged acceptance criteria after correction.

### HIGH — Reload a persisted value

- Kind / confidence: functional_defect / high
- Areas: ARG-039
- Location: scenario:durability
- Expected: Reload a persisted value in the isolated synthetic fixture.
- Observed: Expected values to be strictly deep-equal: + actual - expected + null - { -   name: 'synthetic' - } 
- Evidence: Assertion failed in durability
- Reproduce: Run the reviewed scenario durability through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Acknowledge only durable writes and verify restart recovery on an isolated copy.
- Verify: Re-run durability with unchanged acceptance criteria after correction.

### HIGH — Deduplicate and order chat messages

- Kind / confidence: functional_defect / high
- Areas: ARG-067, ARG-068
- Location: scenario:chat-dedupe
- Expected: Deduplicate and order chat messages in the isolated synthetic fixture.
- Observed: Expected values to be strictly deep-equal: + actual - expected   [ +   'b',     'a', +   'a' -   'b'   ] 
- Evidence: Assertion failed in chat-dedupe
- Reproduce: Run the reviewed scenario chat-dedupe through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Trace message persistence, fanout and acknowledgement and fix the first failed boundary.
- Verify: Re-run chat-dedupe with unchanged acceptance criteria after correction.

### HIGH — Keep acceptance distinct from delivery and bounce

- Kind / confidence: functional_defect / high
- Areas: ARG-072
- Location: scenario:email-state
- Expected: Keep acceptance distinct from delivery and bounce in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: + actual - expected + 'delivered' - 'queued' 
- Evidence: Assertion failed in email-state
- Reproduce: Run the reviewed scenario email-state through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Separate queued, accepted, delivered and failure states with bounded retry rules.
- Verify: Re-run email-state with unchanged acceptance criteria after correction.

### HIGH — Handle rejected WhatsApp templates

- Kind / confidence: functional_defect / high
- Areas: ARG-071
- Location: scenario:whatsapp-state
- Expected: Handle rejected WhatsApp templates in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: + actual - expected + 'delivered' - 'failed' 
- Evidence: Assertion failed in whatsapp-state
- Reproduce: Run the reviewed scenario whatsapp-state through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Map provider responses and webhook states explicitly; keep real delivery unverified.
- Verify: Re-run whatsapp-state with unchanged acceptance criteria after correction.

### HIGH — Reject expired simulated OTPs

- Kind / confidence: functional_defect / high
- Areas: ARG-073
- Location: scenario:sms-expiry
- Expected: Reject expired simulated OTPs in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: true !== false 
- Evidence: Assertion failed in sms-expiry
- Reproduce: Run the reviewed scenario sms-expiry through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Bind OTP expiry to issuance and handle delayed or failed sends independently.
- Verify: Re-run sms-expiry with unchanged acceptance criteria after correction.

### HIGH — Reject forged webhook signature

- Kind / confidence: functional_defect / high
- Areas: ARG-063
- Location: scenario:webhook-auth
- Expected: Reject forged webhook signature in the isolated synthetic fixture.
- Observed: Missing expected exception.
- Evidence: Assertion failed in webhook-auth
- Reproduce: Run the reviewed scenario webhook-auth through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Verify provider signatures over the correct raw payload and protect verification secrets.
- Verify: Re-run webhook-auth with unchanged acceptance criteria after correction.

### HIGH — Ignore older webhook events

- Kind / confidence: functional_defect / high
- Areas: ARG-064
- Location: scenario:webhook-order
- Expected: Ignore older webhook events in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: 1 !== 2 
- Evidence: Assertion failed in webhook-order
- Reproduce: Run the reviewed scenario webhook-order through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Deduplicate events and enforce a versioned transition model.
- Verify: Re-run webhook-order with unchanged acceptance criteria after correction.

### HIGH — Deny paid access after failed payment

- Kind / confidence: functional_defect / high
- Areas: ARG-078
- Location: scenario:payment-failure
- Expected: Deny paid access after failed payment in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: true !== false 
- Evidence: Assertion failed in payment-failure
- Reproduce: Run the reviewed scenario payment-failure through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Implement an explicit payment state machine and verify trusted completion events.
- Verify: Re-run payment-failure with unchanged acceptance criteria after correction.

### HIGH — Avoid duplicate simulated charges

- Kind / confidence: functional_defect / high
- Areas: ARG-079
- Location: scenario:duplicate-payment
- Expected: Avoid duplicate simulated charges in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: + actual - expected + 'charge-0' - 'charge-1'           ^ 
- Evidence: Assertion failed in duplicate-payment
- Reproduce: Run the reviewed scenario duplicate-payment through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Reuse provider idempotency keys and persist operation identity across retries.
- Verify: Re-run duplicate-payment with unchanged acceptance criteria after correction.

### HIGH — Return explicit failure during provider outage

- Kind / confidence: functional_defect / high
- Areas: ARG-065
- Location: scenario:outage-fallback
- Expected: Return explicit failure during provider outage in the isolated synthetic fixture.
- Observed: simulated outage
- Evidence: Assertion failed in outage-fallback
- Reproduce: Run the reviewed scenario outage-fallback through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Apply timeouts, isolation and meaningful fallback behavior.
- Verify: Re-run outage-fallback with unchanged acceptance criteria after correction.

### HIGH — Implement required export function

- Kind / confidence: functional_defect / high
- Areas: ARG-001, ARG-012
- Location: scenario:export-feature
- Expected: Implement required export function in the isolated synthetic fixture.
- Observed: Expected values to be strictly equal: + actual - expected + 'undefined' - 'function' 
- Evidence: Assertion failed in export-feature
- Reproduce: Run the reviewed scenario export-feature through its isolated runner fixture.
- Likely cause: The configured acceptance assertion failed; review evidence before choosing a root cause.
- Fix: Implement the missing acceptance criteria; keep optional ideas separate from requirements.
- Verify: Re-run export-feature with unchanged acceptance criteria after correction.

## Feature register

| Feature | Origin | Areas | Scenarios / gap |
|---|---|---|---|
| fixture-app: Synthetic application acceptance behavior | declared | ARG-001, ARG-012, ARG-020, ARG-027, ARG-029, ARG-035, ARG-039, ARG-063, ARG-064, ARG-065, ARG-067, ARG-068, ARG-071, ARG-072, ARG-073, ARG-078, ARG-079 | login: failed; tenant-isolation: failed; field-validation: failed; durability: failed; chat-dedupe: failed; email-state: failed; whatsapp-state: failed; sms-expiry: failed; webhook-auth: failed; webhook-order: failed; payment-failure: failed; duplicate-payment: failed; outage-fallback: failed; export-feature: failed |

## 101-area coverage

A passed area means its configured scenarios passed; it does not establish exhaustive coverage of all possible inputs. Unknown applicability remains incomplete.

| Area | Applicability | Outcome | Evidence type | Reason |
|---|---|---|---|---|
| ARG-001 Feature completeness | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
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
| ARG-012 Downloads and exports | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-013 Imports and bulk ingestion | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-014 Reports and business calculations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-015 Languages and regional formats | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-016 Dates, time zones, and calendars | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-017 Accessibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-018 Browser, screen, and input compatibility | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-019 Registration and invitations | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-020 Login correctness | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-021 Password handling | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-022 Account recovery | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-023 MFA and passkeys | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-024 OAuth, SSO, and account linking | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-025 Sessions, cookies, and tokens | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-026 Logout and access revocation | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-027 Record-level authorization | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-028 Roles and privileged actions | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-029 Tenant and organization isolation | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-030 Authentication abuse defenses | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-031 Sensitive-data protection | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-032 Retention, deletion, and privacy lifecycle | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-033 Secrets and credential exposure | applicable | failed | static_review | Source evidence conflicts with a configured exclusion; review the finding and applicability. |
| ARG-034 Transport and certificate security | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-035 Missing fields and schema completeness | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-036 Data types and value boundaries | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-037 Empty and insufficient datasets | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-038 Relationships and referential integrity | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-039 Persistence and durability | applicable | failed | observed | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
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
| ARG-063 Webhook authenticity | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-064 Webhook replay and event ordering | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-065 Third-party failures and timeouts | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-066 Retry and circuit-breaker behavior | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-067 Chat sending and receiving | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-068 Chat history and ordering | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-069 Realtime connection lifecycle | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-070 Chat media and attachments | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-071 WhatsApp integration | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-072 Email integration | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-073 SMS and OTP delivery workflows | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-074 Push notifications | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-075 Message queues and dead-letter handling | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-076 Notification preferences and consent | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-077 Checkout prices and totals | not_applicable | not_applicable |  | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-078 Payment state transitions | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
| ARG-079 Duplicate-charge prevention | applicable | failed | simulated | This is a deliberately tiny synthetic fixture. Its explicit acceptance scope is limited to the mapped fixture behaviors, not a production application. |
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
| login: Reject invalid credentials | failed | observed | Expected values to be strictly equal: true !== false  |
| tenant-isolation: Deny another tenant and owner | failed | observed | Missing expected exception. |
| field-validation: Reject missing required name | failed | observed | Missing expected exception. |
| durability: Reload a persisted value | failed | observed | Expected values to be strictly deep-equal: + actual - expected + null - { -   name: 'synthetic' - }  |
| chat-dedupe: Deduplicate and order chat messages | failed | simulated | Expected values to be strictly deep-equal: + actual - expected   [ +   'b',     'a', +   'a' -   'b'   ]  |
| email-state: Keep acceptance distinct from delivery and bounce | failed | simulated | Expected values to be strictly equal: + actual - expected + 'delivered' - 'queued'  |
| whatsapp-state: Handle rejected WhatsApp templates | failed | simulated | Expected values to be strictly equal: + actual - expected + 'delivered' - 'failed'  |
| sms-expiry: Reject expired simulated OTPs | failed | simulated | Expected values to be strictly equal: true !== false  |
| webhook-auth: Reject forged webhook signature | failed | simulated | Missing expected exception. |
| webhook-order: Ignore older webhook events | failed | simulated | Expected values to be strictly equal: 1 !== 2  |
| payment-failure: Deny paid access after failed payment | failed | simulated | Expected values to be strictly equal: true !== false  |
| duplicate-payment: Avoid duplicate simulated charges | failed | simulated | Expected values to be strictly equal: + actual - expected + 'charge-0' - 'charge-1'           ^  |
| outage-fallback: Return explicit failure during provider outage | failed | simulated | simulated outage |
| export-feature: Implement required export function | failed | observed | Expected values to be strictly equal: + actual - expected + 'undefined' - 'function'  |

## Limitations and errors

- Discovery uses bounded source and documentation signals, not complete semantic analysis. Confirm requirements and expand candidate modules into user journeys.
- Ignored: secrets files, symlinks, dependencies, Git history, generated builds and binary artifacts. Inspect those separately when in scope.
- No credential, provider or production connection is attempted. Real delivery remains unverified.

## Suggested next steps

Resolve failed required journeys first. Confirm suspected security findings by tracing the affected source. Supply missing acceptance scenarios or infrastructure for blocked and untested features. Treat optional product improvements separately from confirmed requirements.
