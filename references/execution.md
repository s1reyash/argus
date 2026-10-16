# Isolated execution and adapters

Argus runs only explicitly configured argv arrays; it never invokes a host shell to run project commands. `--execute` is a startup capability. A repository-provided command is not automatically authorized. Review commands, local rules and images before enabling it. Source review remains available without execution.

## Executors

### macos-offline-node

Tested with Node 22.23.1 and the available macOS `sandbox-exec`. Runs only `node relative-script.mjs [args...]`. It denies network, child processes, application writes and unrelated file-content reads. The script sees a disposable source snapshot and a writable scratch directory. Node's V8 heap is bounded by `memoryMb`; this is **not a hard limit on total native memory or CPU**. The wall-clock deadline is enforced. Heavy load, browsers, databases and restore exercises require the Docker executor or remain blocked.

macOS policies vary by OS and enclosing host. Nested sandbox creation can be denied. That is a blocked execution, never permission to fall back to unsandboxed Node. Do not disable isolation to make a result green.

### docker

Needs a running Docker-compatible daemon and a previously reviewed local image pinned by digest. Argus uses `--pull=never`, `--network=none`, a read-only root filesystem, dropped capabilities, no-new-privileges, process/memory/CPU limits, an unprivileged UID, read-only project bind mount and a private writable work mount. No Docker socket or host home directory is mounted. Local fixture services may communicate inside the same container; real provider connections cannot leave it.

Build/pull images separately as a reviewed preparation step. Include dependencies, browser binaries, local rules and vulnerability databases inside the image before running. The runner never installs dependencies or refreshes databases from the network. Set `NODE_PATH` or executable paths inside your image where needed; the application snapshot excludes `node_modules` and generated builds. A trusted image may build into `/work` from the snapshot, without contacting package registries. Record the database timestamp and image digest with the evidence.

Each runner has 100–600000 ms execution time, 128–4096 MiB Docker memory and 0.25–4 CPUs. There are at most 30 sequential runners and 1000 scenarios per config. Stdout/stderr is capped at 1 MB; the structured result at 2 MB. Cancellation kills the process group and removes the controlled container and scratch files. Abrupt OS/power failure may leave scratch artifacts; inspect `argus-run-*` and `argus-*` containers before removing only your own abandoned resources.

## Harnesses outside application source

Set a runner's `harnessDirectory` to an explicit absolute directory. Argus copies it to `.argus-harness` in the disposable project snapshot. Use command `['node','.argus-harness/audit.mjs']`; imports can reference `../app.mjs`. A project with its own `.argus-harness` conflicts and is blocked. Harness content participates in the source fingerprint. Never place provider keys or production data in either tree.

## Existing project suites

A reviewed wrapper must write `ARGUS_RESULT_FILE`:

```json
{"results":[{"id":"login","status":"passed","observed":"Incorrect credentials rejected; valid control accepted","evidence":"Independent assertions executed with synthetic users"}]}
```

Valid statuses are passed, failed, blocked. Require nonempty observations and evidence. Missing/duplicate/invalid results block verification; exit zero alone is insufficient. Exit zero is required to accept any reported pass. Failure exit codes may carry explicit failed results. Keep one runner per independently selectable suite. Affected runs select and report entire configured suites, so a suite cannot secretly execute omitted cases.

A wrapper must assert the application's effects, not merely print this schema. Argus cannot prove that arbitrary test code is honest. Review the assertions and use a failing control fixture.

## Adapter contracts and setup targets

| Adapter | Setup target | Contract | Draft validation |
|---|---|---|---|
| project | Node 22 / existing runner | Wrapper writes per-scenario result JSON | Executed on macOS with synthetic fixtures |
| playwright | Playwright 1.x JSON reporter | Test titles contain `[scenario-id]`; exactly one successful attempt; JSON output at `PLAYWRIGHT_JSON_OUTPUT_NAME` | Parser tested; browser/container execution untested |
| gitleaks | Gitleaks 8.x, `dir` interface | Fixed JSON/redacted report command | Parser tested; scanner execution untested |
| semgrep | Semgrep CE 1.x, `scan` interface | Reviewed project-relative YAML `rules`; metrics and version checks off; JSON errors block | Parser tested; scanner execution untested |
| osv | OSV-Scanner 2.x, `scan source` interface | Local offline database baked into image; JSON results | Parser tested; scanner execution untested |

Version families above are intended command interfaces, not claims that every release works. Before adopting a particular binary, pin its exact version and digest, run both vulnerable and clean fixtures, and record the versions in evidence. CLI or JSON changes require updating the adapter. Scanner findings are hypotheses for source/data-flow triage. One successful scanner result does not cover every attack in its mapped catalog area.

Example reviewed Docker runner (replace the illustrative digest with your local inspected image ID):

```json
{"id":"secrets","adapter":"gitleaks","sandbox":"docker","image":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","timeoutMs":60000,"memoryMb":512,"cpus":1}
```

The illustrative digest does not refer to a delivered image. Missing tools/images/databases yield blocked scenarios. Argus does not run `npx`, package lifecycle hooks or tool-suggested remediation commands on your application host.

## Messaging, payments, faults and native applications

Use local state-machine fixtures for accepted, delayed, rejected, bounced, duplicate and out-of-order events. Assert persisted status, entitlement, consent and retry behavior. Provider acceptance is not delivery. The engine constrains areas 71–82 to simulated evidence; broader project scenarios touching these flows must also be labeled simulated. OS isolation still blocks external delivery regardless of label.

For faults, load and restoration, put the disposable service and synthetic dataset in the bounded container, set explicit budgets and recovery objectives, and verify cleanup. This draft has no production-chaos or live restore adapter.

Use an application's existing mobile/desktop test infrastructure when its execution fits the isolation model. Most physical-device/iOS simulator workflows are unavailable in these executors: report blocked and use source review. There is no generic native UI driver and no external-result import that could turn an unverifiable device run into a pass.
