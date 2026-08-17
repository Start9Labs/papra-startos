# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`TRUSTED_ORIGINS` must carry every published address, not just the primary one.** Papra pins auth and CORS to `APP_BASE_URL` alone, so an install reached over Tor or a custom domain rejects its own UI without this.
- **`init-dirs` runs as root and the image is the `-root` tag for that reason.** StartOS mounts volumes root-owned and empty, and Papra will not create `db/` and `documents/` itself.
- **Every setting reaches Papra as environment built in `main`.** There is no config file the app reads, so an action's write does nothing until the daemon restarts; a change that must apply live has nowhere to go.
