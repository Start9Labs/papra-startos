import { sdk } from '../sdk'
import { configureDocuments } from './configureDocuments'
import { manageSmtp } from './manageSmtp'
import { setPrimaryUrl } from './setPrimaryUrl'
import { toggleRegistration } from './toggleRegistration'

export const actions = sdk.Actions.of()
  .addAction(setPrimaryUrl)
  .addAction(toggleRegistration)
  .addAction(manageSmtp)
  .addAction(configureDocuments)
