import { FileHelper, smtpShape, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  primaryUrl: z.string().optional().catch(undefined),
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
