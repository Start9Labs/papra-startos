import { T } from '@start9labs/start-sdk'
import { configJson } from './fileModels/config.json'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { appDataDir, getPapraUrls, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Papra!'))

  const authSecret = await storeJson.read((s) => s.authSecret).const(effects)
  if (!authSecret) throw new Error('AUTH_SECRET not found in store.json')

  const config = await configJson.read().const(effects)
  if (!config) throw new Error('config.json does not exist')

  const urls = await getPapraUrls(effects)
  const appBaseUrl =
    config.primaryUrl ??
    urls.find((u) => u.includes('.local')) ??
    urls[0] ??
    `http://localhost:${uiPort}`

  // Papra pins auth/CORS to APP_BASE_URL; trust every address StartOS exposes so
  // the UI works whether reached over LAN, Tor, or a custom domain.
  const trustedOrigins = [...new Set([...urls, appBaseUrl])].join(',')

  let smtp: T.SmtpValue | null = null
  if (config.smtp?.selection === 'system') {
    smtp = await sdk.getSystemSmtp(effects).const()
    if (smtp && config.smtp.value.customFrom) {
      smtp.from = config.smtp.value.customFrom
    }
  } else if (config.smtp?.selection === 'custom') {
    const { host, from, username, password, security } =
      config.smtp.value.provider.value
    smtp = {
      host,
      port: Number(security.value.port),
      from,
      username,
      password: password ?? null,
      security: security.selection,
    }
  }

  const env: Record<string, string> = {
    AUTH_SECRET: authSecret,
    APP_BASE_URL: appBaseUrl,
    TRUSTED_ORIGINS: trustedOrigins,
    AUTH_IS_REGISTRATION_ENABLED: String(config.registrationEnabled),
    DOCUMENTS_CONTENT_EXTRACTION_ENABLED: String(
      config.contentExtractionEnabled,
    ),
    DOCUMENTS_OCR_LANGUAGES: config.ocrLanguages,
    DOCUMENT_STORAGE_MAX_UPLOAD_SIZE: String(
      config.maxUploadSizeMb * 1024 * 1024,
    ),
  }

  if (smtp) {
    Object.assign(env, {
      EMAILS_DRIVER: 'smtp',
      EMAILS_DRY_RUN: 'false',
      EMAILS_FROM_ADDRESS: smtp.from,
      SMTP_HOST: smtp.host,
      SMTP_PORT: String(smtp.port),
      SMTP_USER: smtp.username,
      SMTP_PASSWORD: smtp.password ?? '',
      SMTP_SECURE: smtp.security === 'tls' ? 'true' : 'false',
    })
  }

  const appSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: appDataDir,
      readonly: false,
    }),
    'papra-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('init-dirs', {
      subcontainer: appSub,
      exec: {
        command: ['mkdir', '-p', `${appDataDir}/db`, `${appDataDir}/documents`],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('papra', {
      subcontainer: appSub,
      exec: {
        command: sdk.useEntrypoint(),
        env,
      },
      ready: {
        display: i18n('Web Interface'),
        gracePeriod: 60000,
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://127.0.0.1:${uiPort}/api/health`,
            {
              successMessage: i18n('Papra is ready'),
              errorMessage: i18n('Papra is not ready'),
            },
          ),
      },
      requires: ['init-dirs'],
    })
})
