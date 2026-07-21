import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 1221

// Host id (the `sdk.MultiHost.of` group) — distinct from the interface id
// exported on it. Used for `sdk.host.getOwn` lookups.
export const uiHostId = 'ui-multi'
export const uiInterfaceId = 'ui'

// Directory mounted from the 'main' volume inside the container. Papra's image
// defaults DATABASE_URL, document storage and config dir to live under here.
export const appDataDir = '/app/app-data'

export async function getPapraUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(effects, uiHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === uiInterfaceId)
      return iface ? iface.addressInfo.nonLocal.format() : []
    })
    .const()
}
