<p align="center">
  <img src="icon.svg" alt="Papra Logo" width="21%">
</p>

# Papra on StartOS

> **Upstream docs:** <https://docs.papra.app/>
>
> Everything not listed in this document should behave the same as upstream
> Papra. If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable.

[Papra](https://github.com/papra-hq/papra) is a lightweight, open-source document management and archiving platform: upload, organize, tag, and full-text search your documents, with optional OCR text extraction from scanned files.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Image         | `ghcr.io/papra-hq/papra` (the `-root` variant, unmodified)   |
| Architectures | x86_64, aarch64                                              |
| Entrypoint    | Upstream default (`docker-entrypoint.sh pnpm start:with-migrations`) — runs database migrations, then starts the server |

The `-root` image variant is used because StartOS owns the mounted data volume as root. An `init-dirs` one-shot creates `app-data/db` and `app-data/documents` inside the volume before the server starts, since the empty volume shadows the directories the image ships with.

---

## Volume and Data Layout

| Volume | Mount Point     | Purpose                                                  |
| ------ | --------------- | -------------------------------------------------------- |
| `main` | `/app/app-data` | SQLite database, stored documents, and StartOS settings  |

StartOS-specific files written to the `main` volume:

- `store.json` — internal `AUTH_SECRET` (generated at install, never shown to the user)
- `config.json` — user-facing settings managed by the actions below (primary URL, registration, SMTP, document settings)

Papra stores its database at `app-data/db/db.sqlite` and documents under `app-data/documents`, both inside the mounted volume.

---

## Installation and First-Run Flow

- A 64-character `AUTH_SECRET` is generated on install and injected as an environment variable. The user never sees or manages it.
- The primary URL (`APP_BASE_URL`) defaults to the server's `.local` LAN address and is kept valid automatically; change it any time with the **Set Primary URL** action.
- User registration starts **enabled** so you can create your first account. An **important** task prompts you to disable it afterward via the **Disable Registration** action.
- No upstream setup wizard — Papra is usable as soon as it starts.

---

## Configuration Management

| StartOS-Managed (via actions / env vars)                                                                 | Upstream-Managed (Papra's own UI)                          |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Primary URL (`APP_BASE_URL`), trusted origins (`TRUSTED_ORIGINS`), registration toggle, SMTP credentials, OCR languages, text-extraction toggle, max upload size | Organizations, tags, tagging rules, users, documents, API keys, webhooks |

`TRUSTED_ORIGINS` is set to every address StartOS exposes (LAN, `.local`, Tor, custom domains) so the web UI and authentication work no matter which address you use to reach it. Object storage, intake emails, and folder ingestion are left at upstream defaults (see [Limitations](#limitations-and-differences)).

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                        |
| --------- | ---- | -------- | ------------------------------ |
| Web UI    | 1221 | HTTP     | Papra web interface (UI + API) |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

The API is served from the same interface under `/api`.

---

## Actions (StartOS UI)

| Action               | Purpose                                                                                          | Inputs                                                  | Output |
| -------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------ |
| **Set Primary URL**  | Choose which of Papra's addresses is used to build links in emails, invitations, and OAuth redirects | Select from the service's available URLs                | —      |
| **Enable/Disable Registration** | Toggle whether new users may sign up. The label and behavior flip with the current state          | None                                                    | —      |
| **Configure SMTP**   | Set SMTP credentials (system or custom) so Papra can send emails. Without it, emails are only logged | StartOS system SMTP, a provider preset, or custom server | —      |
| **Document Settings** | OCR text-extraction toggle, OCR languages, and maximum upload size per document                  | Toggle, comma-separated Tesseract codes, size in MB     | —      |

All actions are available in any service status.

---

## Backups and Restore

**Included in backup:**

- `main` volume (database, documents, and StartOS settings)

**Restore behavior:** The volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method                                      | Grace Period | Messages                                                |
| ------------- | ------------------------------------------- | ------------ | ------------------------------------------------------- |
| Web Interface | HTTP GET `http://127.0.0.1:1221/api/health` | 60s          | Success: "Papra is ready" / Error: "Papra is not ready" |

The grace period covers the database migrations that run on each startup. The upstream endpoint returns `200` only when the database is reachable.

---

## Dependencies

None.

---

## Limitations and Differences

1. **Authentication is pinned to one primary URL.** Sign-in works on every trusted address, but emailed links and OAuth redirects use the URL selected via **Set Primary URL**.
2. **Filesystem document storage only.** The S3 and Azure Blob storage drivers are not wired up; documents are stored on the `main` volume.
3. **Email intake and folder ingestion are not exposed.** These upstream features are left disabled; documents are added through the web UI or API.
4. **Email sending is off until configured.** Until you run **Configure SMTP**, password-reset, verification, and invitation emails are written to the logs instead of being delivered.

---

## What Is Unchanged from Upstream

- Document upload, storage, tagging, custom tagging rules, and full-text search
- OCR / automatic text extraction
- Organizations, members, and invitations
- The public API, SDK, and webhooks
- The web UI and all of its settings screens

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: papra
image: ghcr.io/papra-hq/papra
architectures: [x86_64, aarch64]
volumes:
  main: /app/app-data
ports:
  ui: 1221
dependencies: none
startos_managed_env_vars:
  - AUTH_SECRET
  - APP_BASE_URL
  - TRUSTED_ORIGINS
  - AUTH_IS_REGISTRATION_ENABLED
  - DOCUMENTS_CONTENT_EXTRACTION_ENABLED
  - DOCUMENTS_OCR_LANGUAGES
  - DOCUMENT_STORAGE_MAX_UPLOAD_SIZE
  - EMAILS_DRIVER
  - EMAILS_DRY_RUN
  - EMAILS_FROM_ADDRESS
  - SMTP_HOST
  - SMTP_PORT
  - SMTP_USER
  - SMTP_PASSWORD
  - SMTP_SECURE
actions:
  - set-primary-url
  - toggle-registration
  - manage-smtp
  - configure-documents
```
