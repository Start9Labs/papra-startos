import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.6.1:1',
  releaseNotes: {
    en_US: `Updated Papra to 26.6.1.

- Greatly improves performance when updating and deleting documents in the search index, avoiding unnecessary table scans — noticeable on large collections (10k+ documents).
- Adds a visual loading state to the rename document modal.
- Fixes a validation error when the auto-tagging maximum tag count is supplied as a string rather than a number.
- Fixes the auto-tagging schema for AI providers that do not support every JSON Schema feature, and improves logging when structured data generation fails.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.1`,
    es_ES: `Actualiza Papra a 26.6.1.

- Mejora notablemente el rendimiento al actualizar y eliminar documentos en el índice de búsqueda, evitando escaneos de tabla innecesarios: se nota en colecciones grandes (más de 10 000 documentos).
- Añade un indicador visual de carga a la ventana de renombrar documentos.
- Corrige un error de validación cuando el número máximo de etiquetas del etiquetado automático se proporciona como texto en lugar de como número.
- Corrige el esquema de etiquetado automático para los proveedores de IA que no admiten todas las funciones de JSON Schema, y mejora el registro cuando falla la generación de datos estructurados.

Notas de la versión completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.1`,
    de_DE: `Aktualisiert Papra auf 26.6.1.

- Verbessert die Leistung beim Aktualisieren und Löschen von Dokumenten im Suchindex erheblich und vermeidet unnötige Tabellenscans – spürbar bei großen Sammlungen (mehr als 10.000 Dokumente).
- Fügt dem Dialog zum Umbenennen von Dokumenten eine visuelle Ladeanzeige hinzu.
- Behebt einen Validierungsfehler, wenn die maximale Tag-Anzahl der automatischen Verschlagwortung als Zeichenkette statt als Zahl übergeben wird.
- Behebt das Schema der automatischen Verschlagwortung für KI-Anbieter, die nicht alle JSON-Schema-Funktionen unterstützen, und verbessert die Protokollierung bei fehlgeschlagener Generierung strukturierter Daten.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.1`,
    pl_PL: `Aktualizuje Papra do 26.6.1.

- Znacznie poprawia wydajność aktualizowania i usuwania dokumentów w indeksie wyszukiwania, unikając zbędnych skanowań tabel — zauważalne przy dużych kolekcjach (ponad 10 000 dokumentów).
- Dodaje wizualny wskaźnik ładowania w oknie zmiany nazwy dokumentu.
- Naprawia błąd walidacji, gdy maksymalna liczba tagów automatycznego tagowania jest podana jako tekst zamiast liczby.
- Naprawia schemat automatycznego tagowania dla dostawców AI, którzy nie obsługują wszystkich funkcji JSON Schema, oraz ulepsza rejestrowanie błędów podczas generowania danych strukturalnych.

Pełne informacje o wersji: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.1`,
    fr_FR: `Met à jour Papra vers 26.6.1.

- Améliore nettement les performances lors de la mise à jour et de la suppression de documents dans l'index de recherche, en évitant les analyses de table inutiles — perceptible sur les grandes collections (plus de 10 000 documents).
- Ajoute un indicateur visuel de chargement à la fenêtre de renommage de document.
- Corrige une erreur de validation lorsque le nombre maximal d'étiquettes de l'étiquetage automatique est fourni sous forme de chaîne plutôt que de nombre.
- Corrige le schéma d'étiquetage automatique pour les fournisseurs d'IA qui ne prennent pas en charge toutes les fonctionnalités de JSON Schema, et améliore la journalisation en cas d'échec de la génération de données structurées.

Notes de version complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.1`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
