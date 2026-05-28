import { smtpPrefill } from '@start9labs/start-sdk'
import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec } = sdk

const inputSpec = InputSpec.of({
  smtp: sdk.inputSpecConstants.smtpInputSpec,
})

export const manageSmtp = sdk.Action.withInput(
  'manage-smtp',

  async ({ effects }) => ({
    name: i18n('Configure SMTP'),
    description: i18n(
      'Add SMTP credentials so Papra can send emails for password resets, email verification, and organization invitations. Without SMTP, Papra only logs emails instead of delivering them.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    smtp: smtpPrefill(await configJson.read((c) => c.smtp).once()),
  }),

  async ({ effects, input }) => configJson.merge(effects, { smtp: input.smtp }),
)
