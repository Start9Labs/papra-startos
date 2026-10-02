import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value, List } = sdk

const inputSpec = InputSpec.of({
  allowedEmailDomains: Value.list(
    List.text(
      {
        name: i18n('Allowed Email Domains'),
        description: i18n(
          'Restrict new accounts to these email domains, such as example.com. Matches are exact and case-insensitive; subdomains must be listed separately. Leave empty to allow any domain except those Papra forbids. This does not enable registration or verify email ownership.',
        ),
        default: [],
      },
      { placeholder: 'example.com', patterns: [sdk.patterns.domain] },
    ),
  ),
})

export const configureRegistration = sdk.Action.withInput(
  'configure-registration',

  async () => ({
    name: i18n('Registration Settings'),
    description: i18n(
      'Choose which email domains may register new accounts. Existing accounts are unaffected.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async () => ({
    allowedEmailDomains:
      (await configJson.read((config) => config.allowedEmailDomains).once()) ??
      undefined,
  }),

  async ({ effects, input }) => configJson.merge(effects, input),
)
