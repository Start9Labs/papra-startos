import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { primaryUrlTask } from './primaryUrlTask'
import { taskRegistration } from './taskRegistration'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  actions,
  primaryUrlTask,
  dependencies,
  taskRegistration,
)

export const uninit = sdk.setupUninit(versionGraph)
