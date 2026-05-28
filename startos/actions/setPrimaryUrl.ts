import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getPapraUrls } from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  primaryUrl: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getPapraUrls(effects)

    return {
      name: i18n('Primary URL'),
      values: urls.reduce(
        (obj, url) => ({ ...obj, [url]: url }),
        {} as Record<string, string>,
      ),
      default: urls[0] ?? '',
    }
  }),
})

export const setPrimaryUrl = sdk.Action.withInput(
  'set-primary-url',

  async ({ effects }) => ({
    name: i18n('Set Primary URL'),
    description: i18n(
      'Choose which of your Papra addresses Papra should treat as primary. It is used to build the links in emails, organization invitations, and OAuth redirects.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    primaryUrl:
      (await configJson.read((c) => c.primaryUrl).once()) || undefined,
  }),

  async ({ effects, input }) =>
    configJson.merge(effects, { primaryUrl: input.primaryUrl }),
)
