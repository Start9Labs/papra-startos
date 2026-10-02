import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.7.0:0',
  releaseNotes: {
    en_US: `Updated Papra to 26.7.0.

- Reprocess existing documents from the content tab to rerun text extraction and tagging. Fonts are now bundled for offline use, and OCR handles EXIF image rotation correctly.
- New Registration Settings action restricts new accounts to selected email domains without changing existing accounts or enabling registration.
- The Web Interface check now requires a healthy database response instead of accepting HTTP errors as ready.
- Fixes reinviting users who left an organization and prevents custom OAuth providers from creating accounts when registration is disabled.
- API clients: trashing a document now returns HTTP 204 with no body instead of a success JSON object.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0`,
    es_ES: `Actualiza Papra a 26.7.0.

- Vuelve a procesar documentos existentes desde la pestaña de contenido para repetir la extracción de texto y el etiquetado. Las fuentes ahora se incluyen para uso sin conexión y OCR respeta la rotación EXIF de las imágenes.
- La nueva acción Configuración del registro restringe las cuentas nuevas a los dominios de correo seleccionados sin cambiar las cuentas existentes ni habilitar el registro.
- La comprobación de la interfaz web ahora exige una respuesta de base de datos saludable en lugar de aceptar errores HTTP como estado listo.
- Corrige las invitaciones a usuarios que abandonaron una organización e impide que proveedores OAuth personalizados creen cuentas cuando el registro está deshabilitado.
- Clientes de API: enviar un documento a la papelera ahora devuelve HTTP 204 sin cuerpo en lugar de un objeto JSON de éxito.

Notas de la versión completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0`,
    de_DE: `Aktualisiert Papra auf 26.7.0.

- Vorhandene Dokumente lassen sich im Inhalt-Reiter erneut verarbeiten, um Textextraktion und Verschlagwortung zu wiederholen. Schriftarten sind für die Offline-Nutzung enthalten, und OCR berücksichtigt die EXIF-Bilddrehung korrekt.
- Die neue Aktion Registrierungseinstellungen beschränkt neue Konten auf ausgewählte E-Mail-Domains, ohne bestehende Konten zu ändern oder die Registrierung zu aktivieren.
- Die Prüfung der Weboberfläche verlangt jetzt eine gesunde Datenbankantwort, statt HTTP-Fehler als bereit zu akzeptieren.
- Behebt erneute Einladungen für Benutzer, die eine Organisation verlassen haben, und verhindert die Kontoerstellung über benutzerdefinierte OAuth-Anbieter bei deaktivierter Registrierung.
- API-Clients: Das Verschieben eines Dokuments in den Papierkorb liefert jetzt HTTP 204 ohne Inhalt statt eines JSON-Erfolgsobjekts.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0`,
    pl_PL: `Aktualizuje Papra do 26.7.0.

- Ponownie przetwarzaj istniejące dokumenty na karcie zawartości, aby powtórzyć ekstrakcję tekstu i tagowanie. Czcionki są dołączone do użytku offline, a OCR prawidłowo obsługuje obrót obrazów zapisany w EXIF.
- Nowa akcja Ustawienia rejestracji ogranicza nowe konta do wybranych domen e-mail bez zmiany istniejących kont ani włączania rejestracji.
- Kontrola interfejsu webowego wymaga teraz odpowiedzi potwierdzającej zdrową bazę danych zamiast uznawać błędy HTTP za gotowość.
- Naprawia ponowne zapraszanie użytkowników, którzy opuścili organizację, i blokuje tworzenie kont przez niestandardowych dostawców OAuth przy wyłączonej rejestracji.
- Klienci API: przeniesienie dokumentu do kosza zwraca teraz HTTP 204 bez treści zamiast obiektu JSON potwierdzającego sukces.

Pełne informacje o wersji: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0`,
    fr_FR: `Met à jour Papra vers 26.7.0.

- Retraitez les documents existants depuis l'onglet de contenu pour relancer l'extraction de texte et l'étiquetage. Les polices sont incluses pour une utilisation hors ligne et l'OCR respecte la rotation EXIF des images.
- La nouvelle action Paramètres des inscriptions limite les nouveaux comptes aux domaines de messagerie choisis sans modifier les comptes existants ni activer les inscriptions.
- La vérification de l'interface web exige désormais une réponse indiquant une base de données saine au lieu de considérer les erreurs HTTP comme un état prêt.
- Corrige les nouvelles invitations aux utilisateurs ayant quitté une organisation et empêche les fournisseurs OAuth personnalisés de créer des comptes lorsque les inscriptions sont désactivées.
- Clients API : mettre un document à la corbeille renvoie désormais HTTP 204 sans corps au lieu d'un objet JSON de succès.

Notes de version complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
