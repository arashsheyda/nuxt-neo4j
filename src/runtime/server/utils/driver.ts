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
      _driver = neo4j.driver(config.uri, neo4j.auth[config.auth.type](config.auth.username, config.auth.password))
      consola.success(`Neo4j driver has been ${colors.green('connected.')}`)
    }
    catch (error) {
      consola.error('Failed to create driver:', error)
    }
  }
  return _driver
}
