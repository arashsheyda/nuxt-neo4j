import { addServerImportsDir, addServerPlugin, createResolver, defineNuxtModule, logger } from '@nuxt/kit'
import defu from 'defu'

export interface ModuleOptions {
  /**
   *  The URI of the Neo4j database.
   *
   * @default process.env.NEO4J_URI
   *
   */
  uri?: string

  /**
   *  Authentication details for connecting to the Neo4j database.
   *
   * @default process.env.NEO4J_USERNAME
   *
   */
  auth?: {
    /**
     * The type of authentication to be used for connecting to the Neo4j database.
     *
     * @default 'basic'
     *
     */
    type?: 'basic'
    /**
     *  The USERNAME used to authenticate with the Neo4j database.
     *
     * @default process.env.NEO4J_USERNAME
     *
     */
    username?: string
    /**
     * The PASSWORD used to authenticate with the Neo4j database.
     *
     * @default process.env.NEO4J_PASSWORD
     *
     */
    password?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-neo4j',
    configKey: 'neo4j',
  },
  defaults: {
    uri: process.env.NEO4J_URI,
    auth: {
      type: 'basic',
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
    },
  },
  hooks: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const config = nuxt.options.runtimeConfig as any

    config.neo4j = defu(config.neo4j || {}, {
      ...options,
    })

    if (!config.neo4j.uri)
      throw new Error('No URI provided for Neo4j')

    if (!config.neo4j.auth.username || !config.neo4j.auth.password)
      throw new Error('No credentials provided for Neo4j')

    addServerImportsDir(resolve('./runtime/server/utils'))
    addServerPlugin(resolve('./runtime/server/plugins/neo4j'))

    logger.info('Neo4j module has been initialized!')
  },
})
