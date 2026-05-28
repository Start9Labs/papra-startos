import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { getPapraUrls } from '../utils'

export const setupPrimaryUrl = sdk.setupOnInit(async (effects) => {
  const urls = await getPapraUrls(effects)
  const primaryUrl = await configJson.read((c) => c.primaryUrl).const(effects)

  if (!primaryUrl || !urls.includes(primaryUrl)) {
    const fallback = urls.find((u) => u.includes('.local')) ?? urls[0]
    if (fallback) {
      await configJson.merge(
        effects,
        { primaryUrl: fallback },
        { allowWriteAfterConst: true },
      )
    }
  }
})
