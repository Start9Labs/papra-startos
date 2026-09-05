import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.6.2:0',
  releaseNotes: {
    en_US: `Updated Papra to 26.6.2.

- Disabling registration now blocks direct email and password sign-ups through the API as well as hiding the sign-up interface.
- Password resets now revoke all existing sessions, and public document links stop working when their organization is deleted.
- Improves PDF previews, batch document selection, database query performance, and external content extraction.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2`,
    es_ES: `Actualiza Papra a 26.6.2.

- Desactivar el registro ahora bloquea las altas directas con correo electrónico y contraseña a través de la API, además de ocultar la interfaz de registro.
- Los restablecimientos de contraseña ahora revocan todas las sesiones existentes, y los enlaces públicos a documentos dejan de funcionar cuando se elimina su organización.
- Mejora las vistas previas de PDF, la selección de documentos por lotes, el rendimiento de las consultas a la base de datos y la extracción externa de contenido.

Notas de la versión completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2`,
    de_DE: `Aktualisiert Papra auf 26.6.2.

- Das Deaktivieren der Registrierung blockiert jetzt auch direkte E-Mail- und Passwortregistrierungen über die API und blendet weiterhin die Registrierungsoberfläche aus.
- Das Zurücksetzen des Passworts widerruft jetzt alle bestehenden Sitzungen, und öffentliche Dokumentlinks funktionieren nicht mehr, wenn ihre Organisation gelöscht wird.
- Verbessert PDF-Vorschauen, die Stapelauswahl von Dokumenten, die Leistung von Datenbankabfragen und die externe Inhaltsextraktion.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2`,
    pl_PL: `Aktualizuje Papra do 26.6.2.

- Wyłączenie rejestracji blokuje teraz również bezpośrednią rejestrację przez API za pomocą adresu e-mail i hasła, a nie tylko ukrywa interfejs rejestracji.
- Zresetowanie hasła unieważnia teraz wszystkie istniejące sesje, a publiczne łącza do dokumentów przestają działać po usunięciu ich organizacji.
- Ulepsza podgląd plików PDF, zbiorcze zaznaczanie dokumentów, wydajność zapytań do bazy danych i zewnętrzne wyodrębnianie treści.

Pełne informacje o wersji: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2`,
    fr_FR: `Met à jour Papra vers 26.6.2.

- La désactivation des inscriptions bloque désormais les inscriptions directes par adresse e-mail et mot de passe via l'API, en plus de masquer l'interface d'inscription.
- La réinitialisation du mot de passe révoque désormais toutes les sessions existantes, et les liens publics vers des documents cessent de fonctionner lorsque leur organisation est supprimée.
- Améliore les aperçus PDF, la sélection de documents par lots, les performances des requêtes de base de données et l'extraction externe de contenu.

Notes de version complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.6.2`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
