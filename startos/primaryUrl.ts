import { configJson } from './fileModels/config.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiHostId, uiInterfaceId } from './utils'

export const primaryUrl = sdk.setupPrimaryUrl({
  id: 'set-primary-url',
  hostId: uiHostId,
  interfaceId: uiInterfaceId,
  metadata: {
    name: i18n('Set Primary URL'),
    description: i18n(
      'Choose which of your Papra addresses Papra should treat as primary. It is used to build the links in emails, organization invitations, and OAuth redirects.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  field: { name: i18n('Primary URL'), description: null },
  get: configJson.read((c) => c.primaryUrl),
  set: (effects, url) => configJson.merge(effects, { primaryUrl: url }),
})
