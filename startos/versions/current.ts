import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.5.0:1',
  releaseNotes: {
    en_US: 'Updates Papra to 26.5.0.',
    es_ES: 'Actualiza Papra a 26.5.0.',
    de_DE: 'Aktualisiert Papra auf 26.5.0.',
    pl_PL: 'Aktualizuje Papra do 26.5.0.',
    fr_FR: 'Met à jour Papra vers 26.5.0.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
