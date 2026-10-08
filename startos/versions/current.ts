import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '26.7.0:1',
  releaseNotes: {
    en_US: `Updated Papra to 26.7.0.

- Reprocess existing documents from the content tab to rerun text extraction and tagging. Fonts are now bundled for offline use, and OCR handles EXIF image rotation correctly.
- New Registration Settings action restricts new accounts to selected email domains without changing existing accounts or enabling registration.
- The Web Interface check now requires a healthy database response instead of accepting HTTP errors as ready.
- Fixes reinviting users who left an organization and prevents custom OAuth providers from creating accounts when registration is disabled.
- API clients: trashing a document now returns HTTP 204 with no body instead of a success JSON object.

Full release notes: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0

**Changes**

- Open UI opens Papra at its primary URL.
- Disable Registration asks for confirmation before running.
- While no primary URL is chosen, or the chosen one is not one of Papra's addresses, Papra uses a public domain if it has one, otherwise its .local address, and a task asks you to choose one. Your choice is kept, and Papra returns to it when the address does.`,
    es_ES: `Actualiza Papra a 26.7.0.

- Vuelve a procesar documentos existentes desde la pestaña de contenido para repetir la extracción de texto y el etiquetado. Las fuentes ahora se incluyen para uso sin conexión y OCR respeta la rotación EXIF de las imágenes.
- La nueva acción Configuración del registro restringe las cuentas nuevas a los dominios de correo seleccionados sin cambiar las cuentas existentes ni habilitar el registro.
- La comprobación de la interfaz web ahora exige una respuesta de base de datos saludable en lugar de aceptar errores HTTP como estado listo.
- Corrige las invitaciones a usuarios que abandonaron una organización e impide que proveedores OAuth personalizados creen cuentas cuando el registro está deshabilitado.
- Clientes de API: enviar un documento a la papelera ahora devuelve HTTP 204 sin cuerpo en lugar de un objeto JSON de éxito.

Notas de la versión completas: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0

**Cambios**

- Abrir interfaz abre Papra en su URL principal.
- Deshabilitar registro pide confirmación antes de ejecutarse.
- Mientras no haya una URL principal elegida, o la elegida no sea una de las direcciones de Papra, Papra usa un dominio público si tiene uno y, si no, su dirección .local, y una tarea te pide elegir una. Tu elección se conserva, y Papra vuelve a ella cuando la dirección regresa.`,
    de_DE: `Aktualisiert Papra auf 26.7.0.

- Vorhandene Dokumente lassen sich im Inhalt-Reiter erneut verarbeiten, um Textextraktion und Verschlagwortung zu wiederholen. Schriftarten sind für die Offline-Nutzung enthalten, und OCR berücksichtigt die EXIF-Bilddrehung korrekt.
- Die neue Aktion Registrierungseinstellungen beschränkt neue Konten auf ausgewählte E-Mail-Domains, ohne bestehende Konten zu ändern oder die Registrierung zu aktivieren.
- Die Prüfung der Weboberfläche verlangt jetzt eine gesunde Datenbankantwort, statt HTTP-Fehler als bereit zu akzeptieren.
- Behebt erneute Einladungen für Benutzer, die eine Organisation verlassen haben, und verhindert die Kontoerstellung über benutzerdefinierte OAuth-Anbieter bei deaktivierter Registrierung.
- API-Clients: Das Verschieben eines Dokuments in den Papierkorb liefert jetzt HTTP 204 ohne Inhalt statt eines JSON-Erfolgsobjekts.

Vollständige Versionshinweise: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0

**Änderungen**

- „Oberfläche öffnen“ öffnet Papra unter seiner primären URL.
- „Registrierung deaktivieren“ fragt vor der Ausführung nach einer Bestätigung.
- Solange keine primäre URL gewählt ist oder die gewählte keine Adresse von Papra ist, verwendet Papra eine öffentliche Domain, falls vorhanden, sonst seine .local-Adresse, und eine Aufgabe fordert Sie auf, eine zu wählen. Ihre Wahl bleibt erhalten, und Papra kehrt zu ihr zurück, sobald die Adresse wieder verfügbar ist.`,
    pl_PL: `Aktualizuje Papra do 26.7.0.

- Ponownie przetwarzaj istniejące dokumenty na karcie zawartości, aby powtórzyć ekstrakcję tekstu i tagowanie. Czcionki są dołączone do użytku offline, a OCR prawidłowo obsługuje obrót obrazów zapisany w EXIF.
- Nowa akcja Ustawienia rejestracji ogranicza nowe konta do wybranych domen e-mail bez zmiany istniejących kont ani włączania rejestracji.
- Kontrola interfejsu webowego wymaga teraz odpowiedzi potwierdzającej zdrową bazę danych zamiast uznawać błędy HTTP za gotowość.
- Naprawia ponowne zapraszanie użytkowników, którzy opuścili organizację, i blokuje tworzenie kont przez niestandardowych dostawców OAuth przy wyłączonej rejestracji.
- Klienci API: przeniesienie dokumentu do kosza zwraca teraz HTTP 204 bez treści zamiast obiektu JSON potwierdzającego sukces.

Pełne informacje o wersji: https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0

**Zmiany w pakiecie**

- „Otwórz interfejs” otwiera Papra pod jego głównym adresem URL.
- „Wyłącz rejestrację” prosi o potwierdzenie przed uruchomieniem.
- Dopóki nie wybrano głównego adresu URL lub wybrany nie jest jednym z adresów Papra, Papra używa domeny publicznej, jeśli ją ma, a w przeciwnym razie swojego adresu .local, a zadanie prosi o wybranie adresu. Twój wybór zostaje zachowany, a Papra wraca do niego, gdy adres znów jest dostępny.`,
    fr_FR: `Met à jour Papra vers 26.7.0.

- Retraitez les documents existants depuis l'onglet de contenu pour relancer l'extraction de texte et l'étiquetage. Les polices sont incluses pour une utilisation hors ligne et l'OCR respecte la rotation EXIF des images.
- La nouvelle action Paramètres des inscriptions limite les nouveaux comptes aux domaines de messagerie choisis sans modifier les comptes existants ni activer les inscriptions.
- La vérification de l'interface web exige désormais une réponse indiquant une base de données saine au lieu de considérer les erreurs HTTP comme un état prêt.
- Corrige les nouvelles invitations aux utilisateurs ayant quitté une organisation et empêche les fournisseurs OAuth personnalisés de créer des comptes lorsque les inscriptions sont désactivées.
- Clients API : mettre un document à la corbeille renvoie désormais HTTP 204 sans corps au lieu d'un objet JSON de succès.

Notes de version complètes : https://github.com/papra-hq/papra/releases/tag/%40papra/app%4026.7.0

**Modifications**

- Ouvrir l'interface ouvre Papra sur son URL principale.
- Désactiver les inscriptions demande une confirmation avant de s'exécuter.
- Tant qu'aucune URL principale n'est choisie, ou que celle choisie n'est pas l'une des adresses de Papra, Papra utilise un domaine public s'il en a un, sinon son adresse .local, et une tâche vous demande d'en choisir une. Votre choix est conservé, et Papra y revient dès que l'adresse est de nouveau disponible.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
