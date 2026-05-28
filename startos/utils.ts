import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 1221

// Directory mounted from the 'main' volume inside the container. Papra's image
// defaults DATABASE_URL, document storage and config dir to live under here.
export const appDataDir = '/app/app-data'

export async function getPapraUrls(effects: T.Effects): Promise<string[]> {
  return sdk.serviceInterface
    .getOwn(effects, 'ui', (i) => i?.addressInfo?.nonLocal.format() || [])
    .const()
}
