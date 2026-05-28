import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const toggleRegistration = sdk.Action.withoutInput(
  'toggle-registration',

  async ({ effects }) => {
    const enabled = await configJson
      .read((c) => c.registrationEnabled)
      .const(effects)

    return {
      name: enabled
        ? i18n('Disable Registration')
        : i18n('Enable Registration'),
      description: enabled
        ? i18n(
            'Registration is currently enabled. Run this action to prevent new users from signing up.',
          )
        : i18n(
            'Registration is currently disabled. Run this action to allow new users to sign up.',
          ),
      warning: enabled
        ? null
        : i18n(
            'While registration is enabled, anyone who can reach your Papra URL can create an account. Enable it only long enough to create the accounts you need, then disable it again.',
          ),
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    const enabled = await configJson.read((c) => c.registrationEnabled).once()

    await configJson.merge(effects, { registrationEnabled: !enabled })
  },
)
