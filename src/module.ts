import { addServerImportsDir, addServerPlugin, createResolver, defineNuxtModule, logger } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'
import defu from 'defu'
import type { Config } from 'neo4j-driver'

export interface ModuleOptions {
  /**
   *  URI of the Neo4j database.
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
  auth?: AuthOptions
  /**
   * Configuration options for the Neo4j driver.
   *
   * @default {}
   *
   */
  config?: Config
  /**
   *  Nuxt Devtools support for Neo4j Workspace.
   *
   * @default true
   *
   */
  devtools?: boolean
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
      username: process.env.NEO4J_USERNAME as string,
      password: process.env.NEO4J_PASSWORD as string,
      realm: process.env.NEO4J_REALM as string,
    },
    config: {},
    devtools: true,
  },
  hooks: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const config = nuxt.options.runtimeConfig as any

    config.neo4j = defu(config.neo4j || {}, {
      ...options,
      auth: {
        ...options.auth,

        // kerberos
        ticket: process.env.NEO4J_TICKET,

        // bearer
        token: process.env.NEO4J_TOKEN,

        // custom
        principal: process.env.NEO4J_PRINCIPAL,
        credentials: process.env.NEO4J_CREDENTIALS,
        realm: process.env.NEO4J_REALM,
        scheme: process.env.NEO4J_SCHEME,
        parameters: process.env.NEO4J_PARAMETERS,
      },
    })

    if (!config.neo4j.uri)
      throw new Error('No URI provided for Neo4j')

    if (config.neo4j.auth.type === 'basic') {
      if (!config.neo4j.auth.username || !config.neo4j.auth.password)
        throw new Error('No credentials provided for Neo4j')
    }
    else if (config.neo4j.auth.type === 'kerberos') {
      if (!config.neo4j.auth.ticket)
        throw new Error('No ticket provided for Neo4j')
    }
    else if (config.neo4j.auth.type === 'bearer') {
      if (!config.neo4j.auth.token)
        throw new Error('No token provided for Neo4j')
    }
    else if (config.neo4j.auth.type === 'custom') {
      if (!config.neo4j.auth.principal || !config.neo4j.auth.credentials || !config.neo4j.auth.realm || !config.neo4j.auth.scheme)
        throw new Error('No custom credentials provided for Neo4j')
    }

    nuxt.options.build.transpile = [resolve('./runtime/server')]

    addServerImportsDir(resolve('./runtime/server/utils'))
    addServerPlugin(resolve('./runtime/server/plugins/neo4j'))

    const isDevToolsEnabled = typeof nuxt.options.devtools === 'boolean' ? nuxt.options.devtools : nuxt.options.devtools.enabled
    if (nuxt.options.dev && isDevToolsEnabled) {
      addCustomTab({
        name: 'nuxt-neo4j',
        title: 'Neo4j',
        icon: 'i-simple-icons-neo4j',
        view: {
          type: 'iframe',
          src: 'https://workspace-preview.neo4j.io/connection/connect',
        },
      })
    }

    logger.info('Neo4j module has been initialized!')
  },
})

type AuthOptions =
  | {
    /**
     * Type of authentication to be used for connecting to the Neo4j database.
     *
     * @default 'basic'
     *
     */
    type: 'basic'
  } & BasicAuth
  | {
    /**
     * Type of authentication to be used for connecting to the Neo4j database.
     *
     * @default 'kerberos'
     *
     */
    type: 'kerberos'
  } & KerberosAuth
  | {
    /**
     * Type of authentication to be used for connecting to the Neo4j database.
     *
     * @default 'bearer'
     *
     */
    type: 'bearer'
  } & BearerAuth
  | {
    /**
     * Type of authentication to be used for connecting to the Neo4j database.
     *
     * @default 'custom'
     *
     */
    type: 'custom'
  } & CustomAuth

interface BasicAuth {
  /**
   *  Username is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_USERNAME
   *
   */
  username: string
  /**
   * Password is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_PASSWORD
   *
   */
  password: string
  /**
   * Realm is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_REALM
   *
   */
  realm?: string
}

interface KerberosAuth {
  /**
   * Ticket is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_TICKET
   *
   */
  ticket: string
}

interface BearerAuth {
  /**
   * Token is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_TOKEN
   *
   */
  token: string
}

interface CustomAuth {
  /**
   * Principle is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_PRINCIPLE
   *
   */
  principle: string
  /**
   * Credentials is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_CREDENTIALS
   *
   */
  credentials: string
  /**
   * Realm is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_REALM
   *
   */
  realm: string
  /**
   * Scheme is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_SCHEME
   *
   */
  scheme: string
  /**
   * Parameters is used to authenticate with the Neo4j database.
   *
   * @default process.env.NEO4J_PARAMETERS
   *
   */
  parameters?: string
}
