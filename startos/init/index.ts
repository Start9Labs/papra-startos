import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { setupPrimaryUrl } from './setupPrimaryUrl'
import { taskRegistration } from './taskRegistration'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  setDependencies,
  actions,
  setupPrimaryUrl,
  taskRegistration,
)

export const uninit = sdk.setupUninit(versionGraph)
