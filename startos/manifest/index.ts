import { setupManifest } from '@start9labs/start-sdk'
import { alertUninstall, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'papra',
  title: 'Papra',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/Start9Labs/papra-startos',
  upstreamRepo: 'https://github.com/papra-hq/papra',
  marketingUrl: 'https://papra.app/',
  donationUrl: 'https://github.com/sponsors/CorentinTh',
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'ghcr.io/papra-hq/papra:26.5.0-root',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: alertUninstall,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
