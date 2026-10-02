import { sdk } from '../sdk'
import { configureDocuments } from './configureDocuments'
import { configureRegistration } from './configureRegistration'
import { manageSmtp } from './manageSmtp'
import { setPrimaryUrl } from './setPrimaryUrl'
import { toggleRegistration } from './toggleRegistration'

export const actions = sdk.Actions.of()
  .addAction(setPrimaryUrl)
  .addAction(toggleRegistration)
  .addAction(configureRegistration)
  .addAction(manageSmtp)
  .addAction(configureDocuments)
