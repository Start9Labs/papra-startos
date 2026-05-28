# Papra

## Documentation

- [Papra documentation](https://docs.papra.app/) — the upstream guide to using and configuring Papra.

## What you get on StartOS

- A self-hosted **web interface** at the Papra **Web UI** interface, where you upload, organize, tag, and full-text-search your documents.
- Documents and their database live entirely on your server's `main` volume and are included in StartOS backups.
- A generated authentication secret and sensible defaults so Papra is ready to use the moment it starts — no upstream setup wizard.

## Getting set up

1. Open the **Web UI** interface from the **Dashboard** tab.
2. Create your account. The first account you register becomes the administrator.
3. Once your account exists, run the **Disable Registration** action (StartOS will already be prompting you with a task) so no one else can sign up on your server.
4. If you reach Papra over Tor or a custom domain, run **Set Primary URL** and pick the address you use most. Papra uses it to build the links in emails, invitations, and OAuth redirects.

## Using Papra

### Web interface

The Web UI is both the application and its API. On first launch you'll see a sign-up / sign-in screen; after that, an empty dashboard where you create an organization and start adding documents. Upload files, apply tags and tagging rules, and use full-text search to find anything later.

### Actions

- **Set Primary URL** — choose which of your Papra addresses is treated as primary for links in emails, invitations, and OAuth redirects.
- **Enable / Disable Registration** — control whether new users can sign up. Disable it after creating your account; re-enable it briefly whenever you need to add someone.
- **Configure SMTP** — add email credentials (your StartOS system SMTP, a provider preset, or a custom server) so Papra can send password-reset, email-verification, and invitation messages. Until you do this, those emails are only written to the service logs.
- **Document Settings** — turn OCR text extraction on or off, set which OCR languages to use (comma-separated Tesseract codes such as `eng,fra,deu`), and set the maximum upload size per document.

## Limitations

- Emails are not delivered until you run **Configure SMTP** — before that, password resets and invitations are only logged.
- Documents are stored on the server's volume; external object storage (S3, Azure Blob), email intake, and watched-folder ingestion are not available in this package.
