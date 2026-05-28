import { utils } from '@start9labs/start-sdk'
import { configJson } from '../fileModels/config.json'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {
      authSecret: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 64 }),
    })

    await configJson.merge(effects, {
      registrationEnabled: true,
      contentExtractionEnabled: true,
      ocrLanguages: 'eng',
      maxUploadSizeMb: 25,
      smtp: { selection: 'disabled', value: {} },
    })
  } else {
    await storeJson.merge(effects, {})
    await configJson.merge(effects, {})
  }
})
