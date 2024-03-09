import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

import { consola } from 'consola'
import { colors } from 'consola/utils'

import { useRuntimeConfig } from '#imports'

let _driver: Driver

export function useDriver() {
  const config = useRuntimeConfig().neo4j
  if (!_driver) {
    try {
      _driver = neo4j.driver(config.uri, neo4j.auth.basic(config.auth.username, config.auth.password))
      if (process.dev) {
        (async () => {
          try {
            const info = await _driver.getServerInfo()
            consola.box({
              title: colors.bold(colors.green(' Neo4j connection successful. ')),
              message: JSON.stringify(info, null, 2),
            })
          }
          catch (error) {
            consola.error('Failed to get server info:', error)
          }
        })()
      }
      else {
        consola.success(`Neo4j connection ${colors.green('successful.')}`)
      }
    }
    catch (error) {
      consola.error('Failed to create Neo4j driver:', error)
    }
  }
  return _driver
}
