export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Papra!': 0,
  'Web Interface': 1,
  'Papra is ready': 2,
  'Papra is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The Papra web interface for managing your documents': 5,

  // actions/setPrimaryUrl.ts
  'Primary URL': 6,
  'Set Primary URL': 7,
  'Choose which of your Papra addresses Papra should treat as primary. It is used to build the links in emails, organization invitations, and OAuth redirects.': 8,

  // actions/toggleRegistration.ts
  'Disable Registration': 9,
  'Enable Registration': 10,
  'Registration is currently enabled. Run this action to prevent new users from signing up.': 11,
  'Registration is currently disabled. Run this action to allow new users to sign up.': 12,
  'While registration is enabled, anyone who can reach your Papra URL can create an account. Enable it only long enough to create the accounts you need, then disable it again.': 13,

  // actions/manageSmtp.ts
  'Configure SMTP': 14,
  'Add SMTP credentials so Papra can send emails for password resets, email verification, and organization invitations. Without SMTP, Papra only logs emails instead of delivering them.': 15,

  // actions/configureDocuments.ts
  'Text Extraction (OCR)': 16,
  'Extract searchable text from uploaded documents and scans. Disable to reduce CPU usage on low-powered servers.': 17,
  'OCR Languages': 18,
  'Comma-separated Tesseract language codes used for text extraction, for example "eng,fra,deu".': 19,
  'Maximum Upload Size': 20,
  'The largest size, in megabytes, Papra will accept for a single document. Set to 0 for unlimited.': 21,
  'Document Settings': 22,
  'Configure how Papra processes and stores your documents.': 23,

  // init/taskRegistration.ts
  'Once you have created your account, run the "Disable Registration" action so that no one else can sign up on your server.': 24,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
