import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.6.0:0',
  releaseNotes: {
    en_US: `Updated Papra to 26.6.0.

- AI auto-tagging: documents can be tagged automatically from their extracted content, configurable per organization.
- External OCR / content-extraction providers (Mistral OCR, Azure Document Intelligence, Docling, or a custom HTTP endpoint) alongside the built-in engine.
- Faster OCR via tesseract.js v7 (15–35% quicker on images), plus mobile-friendly UI improvements, more translations, and bug fixes.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.0`,
    es_ES: `Actualiza Papra a 26.6.0.

- Etiquetado automático con IA: los documentos pueden etiquetarse automáticamente a partir de su contenido extraído, configurable por organización.
- Proveedores externos de OCR / extracción de contenido (Mistral OCR, Azure Document Intelligence, Docling o un endpoint HTTP personalizado) junto al motor integrado.
- OCR más rápido gracias a tesseract.js v7 (15–35 % más rápido en imágenes), además de mejoras de interfaz para móviles, más traducciones y correcciones de errores.

Notas de la versión completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.0`,
    de_DE: `Aktualisiert Papra auf 26.6.0.

- KI-Auto-Tagging: Dokumente können anhand ihres extrahierten Inhalts automatisch mit Tags versehen werden, pro Organisation konfigurierbar.
- Externe OCR-/Inhaltsextraktions-Anbieter (Mistral OCR, Azure Document Intelligence, Docling oder ein benutzerdefinierter HTTP-Endpunkt) neben der integrierten Engine.
- Schnelleres OCR dank tesseract.js v7 (15–35 % schneller bei Bildern), dazu mobilfreundliche UI-Verbesserungen, mehr Übersetzungen und Fehlerbehebungen.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.0`,
    pl_PL: `Aktualizuje Papra do 26.6.0.

- Automatyczne tagowanie z użyciem AI: dokumenty mogą być automatycznie tagowane na podstawie wyodrębnionej treści, konfigurowalne dla każdej organizacji.
- Zewnętrzni dostawcy OCR / ekstrakcji treści (Mistral OCR, Azure Document Intelligence, Docling lub własny endpoint HTTP) obok wbudowanego silnika.
- Szybszy OCR dzięki tesseract.js v7 (15–35% szybciej dla obrazów), a także udoskonalenia interfejsu na urządzeniach mobilnych, więcej tłumaczeń i poprawki błędów.

Pełne informacje o wersji: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.0`,
    fr_FR: `Met à jour Papra vers 26.6.0.

- Étiquetage automatique par IA : les documents peuvent être étiquetés automatiquement à partir de leur contenu extrait, configurable par organisation.
- Fournisseurs externes d'OCR / d'extraction de contenu (Mistral OCR, Azure Document Intelligence, Docling ou un point de terminaison HTTP personnalisé) en plus du moteur intégré.
- OCR plus rapide grâce à tesseract.js v7 (15–35 % plus rapide sur les images), ainsi que des améliorations de l'interface mobile, davantage de traductions et des corrections de bugs.

Notes de version complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.0`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
