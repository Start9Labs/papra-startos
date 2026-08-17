import { FileHelper, smtpShape, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  primaryUrl: z.string().optional().catch(undefined),
  // Seeded true at install (seedFiles) so the first account can be made, but the
  // catch default is false: a corrupt or missing value must fail closed rather
  // than reopen sign-up on a running instance. The asymmetry is deliberate.
  registrationEnabled: z.boolean().catch(false),
  contentExtractionEnabled: z.boolean().catch(true),
  ocrLanguages: z.string().catch('eng'),
  maxUploadSizeMb: z.number().int().nonnegative().catch(25),
  smtp: smtpShape,
})

export const configJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/config.json' },
  shape,
)
