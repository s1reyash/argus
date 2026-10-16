# Intentional vulnerable and corrected fixtures

Both variants expose the same tiny function API and use identical independent assertions under `tests/suite.mjs`. The functions model invalid login, tenant access, required fields, save/reload, chat ordering, email/WhatsApp statuses, OTP expiry, webhook authenticity/order, failed payments, duplicate operation IDs, provider outage and missing export.

The vulnerable variant deliberately fails all 14 assertions. Its credential-shaped string is synthetic and must never be treated as a valid credential. The corrected variant supplies minimal fixes for those exact assertions. It is not a reference authentication or payment implementation.

The durability case is an in-process save/reload contract. The chat case checks an array helper. Neither is an end-to-end or restart test. Duplicate-payment tests use a local map and do not establish database concurrency behavior. Add real boundary, positive/negative, multi-user, race and restart assertions when adapting these examples.

Tests run in disposable copies with external delivery blocked. Keep the expected assertions unchanged when demonstrating remediation. The external harness example lives under `examples/harness`; future application audits should keep generated tests outside the application's source until regression integration is requested.
