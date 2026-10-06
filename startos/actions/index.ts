import { primaryUrl } from '../primaryUrl'
import { sdk } from '../sdk'
import { configureDocuments } from './configureDocuments'
import { configureRegistration } from './configureRegistration'
import { manageSmtp } from './manageSmtp'
import { toggleRegistration } from './toggleRegistration'

export const actions = sdk.Actions.of()
  .addAction(primaryUrl.action)
  .addAction(toggleRegistration)
  .addAction(configureRegistration)
  .addAction(manageSmtp)
  .addAction(configureDocuments)
