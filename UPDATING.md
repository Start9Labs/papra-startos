# Updating the upstream version

This package wraps the [Papra](https://github.com/papra-hq/papra) application, using the prebuilt multi-arch image upstream publishes to GHCR. We do not build anything ourselves.

## Determining the upstream version

Papra is a monorepo; the app is released under the `@papra/app@<version>` tag. Fetch the latest:

```sh
gh release list -R papra-hq/papra --limit 20 | grep '@papra/app@'
```

The image is published as `ghcr.io/papra-hq/papra:<version>-root` (and `-rootless`). Confirm the tag exists:

```sh
TOKEN=$(curl -s "https://ghcr.io/token?scope=repository:papra-hq/papra:pull" | jq -r .token)
curl -s -H "Authorization: Bearer $TOKEN" "https://ghcr.io/v2/papra-hq/papra/tags/list" | jq -r '.tags[]' | grep -E '<version>'
```

The current pin lives in `startos/manifest/index.ts` at `images.main.source.dockerTag` (the version before `-root` in `ghcr.io/papra-hq/papra:<version>-root`).

## Applying the bump

1. Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/papra-hq/papra:<new version>-root`.
2. Keep the `-root` suffix — StartOS owns the data volume as root, and the rootless variant cannot write to it.
3. Update `version` (`<new version>:0`) and `releaseNotes` in `startos/versions/current.ts`.
4. Read the upstream release notes for new or renamed environment variables — Papra's runtime config is passed entirely through env vars in `startos/main.ts`. If a managed setting (auth, registration, SMTP, document handling) changed names or defaults, update `main.ts` and the relevant action/file model to match.
5. Run `make` and confirm the build succeeds for both architectures.
