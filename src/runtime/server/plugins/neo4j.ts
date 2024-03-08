/**
 * Due to an upstream bug in Nuxt 3 we need to stub the plugin here, track:https://github.com/nuxt/nuxt/issues/18556
 */
import type { NitroApp } from 'nitropack'

import { consola } from 'consola'
import { colors } from 'consola/utils'
import { useDriver } from '../utils/driver'

type NitroAppPlugin = (nitro: NitroApp) => void

function defineNitroPlugin(def: NitroAppPlugin): NitroAppPlugin {
  return def
}

export default defineNitroPlugin(async () => {
  const driver = useDriver()
  if (process.dev) {
    const info = await driver.getServerInfo()
    consola.box({
      title: colors.bold(colors.blue(' Neo4j Server Info ')),
      message: JSON.stringify(info, null, 2),
    })
  }
})
