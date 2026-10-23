import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.7.1:0',
  releaseNotes: {
    en_US: `Updated Papra to 26.7.1 with Node.js security fixes and full-document search in the advanced PDF viewer (Ctrl+F / Cmd+F).

API clients: PUT /api/users/me now returns only id, email, name, createdAt, updatedAt, and twoFactorEnabled in the user object. Update integrations that rely on other fields.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.1`,
    es_ES: `Actualiza Papra a 26.7.1 con correcciones de seguridad de Node.js y búsqueda en todo el documento en el visor PDF avanzado (Ctrl+F / Cmd+F).

Clientes de la API: PUT /api/users/me ahora devuelve únicamente id, email, name, createdAt, updatedAt y twoFactorEnabled en el objeto user. Actualice las integraciones que dependan de otros campos.

Notas completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.1`,
    de_DE: `Aktualisiert Papra auf 26.7.1 mit Node.js-Sicherheitskorrekturen und dokumentweiter Suche im erweiterten PDF-Viewer (Strg+F / Cmd+F).

API-Clients: PUT /api/users/me liefert im user-Objekt nur noch id, email, name, createdAt, updatedAt und twoFactorEnabled. Integrationen, die andere Felder benötigen, müssen angepasst werden.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.1`,
    pl_PL: `Aktualizuje Papra do 26.7.1 z poprawkami bezpieczeństwa Node.js i wyszukiwaniem w całym dokumencie w zaawansowanej przeglądarce PDF (Ctrl+F / Cmd+F).

Klienci API: PUT /api/users/me zwraca teraz w obiekcie user tylko id, email, name, createdAt, updatedAt i twoFactorEnabled. Należy dostosować integracje korzystające z innych pól.

Pełne informacje o wydaniu: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.1`,
    fr_FR: `Met à jour Papra vers 26.7.1 avec des correctifs de sécurité Node.js et la recherche dans tout le document dans le lecteur PDF avancé (Ctrl+F / Cmd+F).

Clients de l'API : PUT /api/users/me renvoie désormais uniquement id, email, name, createdAt, updatedAt et twoFactorEnabled dans l'objet user. Adaptez les intégrations qui dépendent d'autres champs.

Notes complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.1`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
