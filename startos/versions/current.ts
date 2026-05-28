import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.4.2:0',
  releaseNotes: {
    en_US: 'Initial release of Papra for StartOS.',
    es_ES: 'Lanzamiento inicial de Papra para StartOS.',
    de_DE: 'Erste Veröffentlichung von Papra für StartOS.',
    pl_PL: 'Pierwsze wydanie Papra dla StartOS.',
    fr_FR: 'Première version de Papra pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
