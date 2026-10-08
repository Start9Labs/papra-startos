<p align="center">
  <img src="icon.svg" alt="Papra Logo" width="21%">
</p>

# Papra on StartOS

> Everything not listed in this document should behave the same as upstream
> Papra. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Papra](https://github.com/papra-hq/papra) is a document-management platform: upload files, have their text extracted and indexed, and organise them into searchable libraries. This package configures Papra entirely by environment — no configuration file reaches it — and opens registration just long enough for you to create your own account.

- **Upstream repo:** <https://github.com/papra-hq/papra>
- **Wrapper repo:** <https://github.com/Start9Labs/papra-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image, unmodified — the `-root` tag, which is what lets the package create its data directories before the app starts.

| Property      | Value                    |
| ------------- | ------------------------ |
| Image         | `ghcr.io/papra-hq/papra` |
| Architectures | x86_64, aarch64          |
| Entrypoint    | Upstream's               |

| Subcontainer | Purpose                                     |
| ------------ | ------------------------------------------- |
| `papra-sub`  | The `papra` daemon — the one to `attach` to |

A single oneshot, `init-dirs`, runs first and creates `db/` and `documents/` under the data directory as root, since StartOS mounts volumes root-owned and empty.

## Volume and Data Layout

One volume, holding everything.

| Volume | Mount Point     | Purpose                                                                      |
| ------ | --------------- | ---------------------------------------------------------------------------- |
| `main` | `/app/app-data` | The SQLite database, uploaded documents, and this package's two config files |

Papra's image already defaults its database URL, document storage, and config directory to live under this path, so mounting one volume there captures the whole application state. Uploaded documents are the bulk of it.

## File Models

Two models, both on the `main` volume, and **neither is read by Papra**. Papra is configured entirely by environment; these files are where the package keeps what it needs to build that environment on each start.

| File          | Format | Modelled                | Written by                                     |
| ------------- | ------ | ----------------------- | ---------------------------------------------- |
| `config.json` | JSON   | Yes — `FileHelper.json` | Install, every init, and configuration actions |
| `store.json`  | JSON   | Yes — `FileHelper.json` | Install                                        |

| Key                        | Set by                          | Notes                                                        |
| -------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `authSecret`               | Install                         | A 64-character secret signing every session; in `store.json` |
| `primaryUrl`               | The Set Primary URL action      | The address chosen for Papra to build links from             |
| `registrationEnabled`      | Install, then the toggle action | Seeded **on**, so you can create the first account           |
| `allowedEmailDomains`      | Registration Settings           | Empty by default; emitted as `AUTH_ALLOWED_EMAIL_DOMAINS`    |
| `contentExtractionEnabled` | Install, then Document Settings | Whether uploads get OCR'd                                    |
| `ocrLanguages`             | Install, then Document Settings | Tesseract language codes                                     |
| `maxUploadSizeMb`          | Install, then Document Settings | Per-document upload cap                                      |
| `smtp`                     | The Configure SMTP action       | StartOS's system SMTP, your own server, or disabled          |

Hand edits survive — these are ordinary JSON models. Changes to the watched configuration restart the running daemon to rebuild its environment; a stopped service uses them on its next start.

**`primaryUrl` is the user's choice and is never rewritten by init.** `APP_BASE_URL` follows it to that hostname's current port and scheme. While it is unset, or its hostname is not one of the Web UI interface's addresses, `APP_BASE_URL` uses the preferred available address instead (a public domain, HTTPS first; else `.local`; else the first available address) and the Set Primary URL task is raised; the choice is kept, and Papra returns to it when the address does.

Two environment values are derived rather than stored:

| Variable          | Built from                                                                             |
| ----------------- | -------------------------------------------------------------------------------------- |
| `APP_BASE_URL`    | `primaryUrl` at its hostname's current port and scheme, else a public domain (HTTPS first), then `.local`, then any address; with no available address, the stored URL or localhost |
| `TRUSTED_ORIGINS` | **Every** address the interface publishes, plus the base URL                           |

Papra pins its auth and CORS behaviour to `APP_BASE_URL`, which would reject the UI when reached at any other address. Trusting the full published set is what makes the same install work over LAN, over Tor, and on a custom domain at the same time.

## Dependencies

None. Papra bundles its own SQLite database and needs nothing else installed.

## Network Access and Interfaces

One interface, serving the web app and its API.

| Interface | Id   | Type | Port | Description                                         |
| --------- | ---- | ---- | ---- | --------------------------------------------------- |
| Web UI    | `ui` | ui   | 1221 | The Papra web interface for managing your documents |

The port is bound on the `ui-multi` MultiHost and is not masked. Adding or removing an address rebuilds `TRUSTED_ORIGINS` and restarts the running daemon, so a newly added domain needs no configuration action here.

**Open UI opens the primary URL** — the interface nominates it — falling back to StartOS's usual choice when it is not one of the interface's addresses.

## Installation and First-Run Flow

Install generates the session secret, seeds the document defaults, uses the preferred available address as the base URL until you choose a primary URL (a task asks for one), and — importantly — **leaves registration open**. No credential is shown, because Papra has no bootstrap admin: the account you create in the web UI is yours.

That open window is the point of the task raised at install. Create your account, then run Disable Registration. Until you do, **anyone who can reach a published address can sign up.**

Email is optional and off at install. Without SMTP configured, Papra logs the emails it would have sent rather than delivering them — which means password resets and organisation invitations do not reach anybody.

## Actions

Configuration actions update the environment used to launch Papra. Changes restart the daemon when it is running; stopped services use them on the next start.

### Set Primary URL

Chooses which published address Papra treats as primary. Built by `sdk.setupPrimaryUrl`; the field defaults to a public domain (HTTPS first), else `.local`, else the first available address. An existing choice prefills the form.

- **What it changes:** `primaryUrl` in `config.json`, and through it `APP_BASE_URL` and the address Open UI opens.
- **Cost:** seconds; a changed value restarts the running daemon.
- **Repeat safety:** idempotent. Because every published address is trusted regardless, changing this mostly affects the links Papra writes into emails, organisation invitations, and OAuth redirects — not whether the UI works from a given address.

### Disable Registration / Enable Registration

One action whose name, description, and warning flip with the current state.

- **What it changes:** `registrationEnabled` in `config.json`.
- **Cost:** seconds; toggling restarts the running daemon.
- **Repeat safety:** it is a toggle — running it twice returns to where you started. Both directions ask for confirmation.
- **Existing accounts are unaffected** either way; this only governs whether new ones can be created.

### Registration Settings

Use this when temporarily reopening registration for accounts from known email domains.

- **What it changes:** `allowedEmailDomains` in `config.json`, emitted as a comma-separated allowlist in `AUTH_ALLOWED_EMAIL_DOMAINS`.
- **Cost:** seconds; changing the list restarts the running daemon.
- **Repeat safety:** idempotent; the form is pre-filled.
- Domains match exactly, ignoring case. Subdomains need separate entries. An empty list removes the allowlist restriction; Papra's forbidden domains still take precedence.
- This does not enable registration, affect existing accounts, or verify ownership of an email address. The existing toggle still controls whether anyone may register.

### Configure SMTP

Sets up outbound email for password resets, email verification, and organisation invitations.

- **What it changes:** `smtp` in `config.json`; the credentials become Papra's email environment at launch.
- **Cost:** seconds; changed settings restart the running daemon.
- **Repeat safety:** idempotent; the form is pre-filled.
- **Three choices:** StartOS's system SMTP, your own server, or disabled. With the system option you can still override the From address.

### Document Settings

Text extraction, OCR languages, and the per-document upload cap.

- **What it changes:** the three corresponding keys in `config.json`.
- **Cost:** seconds; changed settings restart the running daemon.
- **Repeat safety:** idempotent; the form is pre-filled.
- **Turning off text extraction is the CPU lever** on a low-powered server. It applies to future uploads — documents already processed keep their extracted text.
- **An upload cap of 0 means unlimited.**

## Tasks

Two tasks, and one of them can come back.

| Task                 | Severity    | Raised when                                                               | Cleared when                                          |
| -------------------- | ----------- | ------------------------------------------------------------------------- | ----------------------------------------------------- |
| Disable Registration | `important` | At install                                                                | The action runs                                       |
| Set Primary URL      | `important` | While no primary URL is chosen, or the chosen one is not a Web UI address | A Web UI address is chosen, or the chosen one returns |

Both are `important` rather than `critical` because the service is fully functional with them outstanding — the risk is that registration stays open, or that links point at an address the user has not chosen, not that anything is broken.

## Health Checks

One check, on the only daemon.

| Check   | Displayed       | Method                              | Grace |
| ------- | --------------- | ----------------------------------- | ----- |
| `papra` | "Web Interface" | `GET /api/health` on the local port | 1 min |

The check requires HTTP 200 and a JSON response with `status: 'ok'` and `isEverythingOk: true` from Papra's database-health endpoint. HTTP errors, unhealthy or malformed responses, and requests exceeding one second fail readiness. The minute of grace covers a first start, where the database is created and migrated before Papra answers.

A failure after that is the app itself — most often a value in the derived environment it rejects, or a data directory it cannot write. The service logs name the cause. A missing session secret is a hard failure by design: the package refuses to start rather than silently minting a new one and invalidating every session.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded.

- **Included:** the SQLite database with every account, organisation, and document record; every uploaded document; the session secret; and both config files.
- **Restore:** complete, and sessions survive because the secret does.
- **Check the primary URL after a restore.** If the restored server does not publish the chosen address, Papra uses the preferred available address and raises the Set Primary URL task until that address returns or another is chosen.

## Limitations and Differences

1. **Registration is open at install** and stays open until you run the action. That is deliberate — there is no bootstrap admin — but it is the one window where the server is exposed.
2. **No configuration file reaches Papra.** Every setting is passed as environment at daemon start; configuration changes restart the running daemon.
3. **Without SMTP, emails are only logged.** Password resets and invitations silently go nowhere.
4. **While the chosen primary URL is not published, Papra uses the preferred available address** and a task asks for another choice.
5. **Text extraction is CPU-heavy** and is the first thing to turn off on a small device.
6. **The image runs as root**, which is what lets the package create its data directories on a fresh volume.
7. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: papra
image: ghcr.io/papra-hq/papra # the -root tag
architectures:
  - x86_64
  - aarch64
subcontainers:
  - papra-sub # the only container; also runs the init-dirs oneshot
volumes:
  main: /app/app-data
file_models:
  - /app/app-data/config.json
  - /app/app-data/store.json
startos_managed_env_vars:
  - AUTH_SECRET
  - APP_BASE_URL
  - TRUSTED_ORIGINS
  - AUTH_IS_REGISTRATION_ENABLED
  - AUTH_ALLOWED_EMAIL_DOMAINS
  - DOCUMENTS_CONTENT_EXTRACTION_ENABLED
  - DOCUMENTS_OCR_LANGUAGES
  - DOCUMENT_STORAGE_MAX_UPLOAD_SIZE
  - EMAILS_DRIVER # when SMTP is configured
  - EMAILS_FROM_ADDRESS # when SMTP is configured
  - SMTP_HOST # when SMTP is configured
  - SMTP_PORT # when SMTP is configured
  - SMTP_USER # when SMTP is configured
  - SMTP_PASSWORD # when SMTP is configured
  - SMTP_SECURE # when SMTP is configured
dependencies: []
interfaces:
  ui: { type: ui, port: 1221 }
actions:
  - set-primary-url
  - toggle-registration # name flips with the current state
  - configure-registration
  - manage-smtp
  - configure-documents
tasks:
  - { action: toggle-registration, severity: important }
  - { action: set-primary-url, severity: important } # while unset or unpublished
health_checks:
  - papra # displayed "Web Interface"; GET /api/health
```
