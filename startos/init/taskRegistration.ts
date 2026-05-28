import { toggleRegistration } from '../actions/toggleRegistration'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const taskRegistration = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, toggleRegistration, 'important', {
      reason: i18n(
        'Once you have created your account, run the "Disable Registration" action so that no one else can sign up on your server.',
      ),
    })
  }
})
