![nuxt-neo4j](https://raw.githubusercontent.com/arashsheyda/nuxt-neo4j/main/playground/public/social-card.jpg)

# Nuxt Neo4j

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Effortlessly integrate Neo4j's powerful graph database into your Nuxt applications!

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-neo4j?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- **Effortless Integration**: Set up a database with just one line of configuration.
- **DevTools Support**: you will be able to access neo4j's workspace from Nuxt DevTools!
- **Easy to Use**: The module provides a `useDriver` function for easy interaction with the database.
- **Developer Experience**: this module is using the official `neo4j-driver` so it has full support of typescript.

## Setup

1. Add `nuxt-neo4j` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-neo4j

# Using yarn
yarn add --dev nuxt-neo4j

# Using npm
npm install --save-dev nuxt-neo4j
```

2. Add `nuxt-neo4j` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-neo4j',
  ],
})
```

That's it! You can now use Nuxt Neo4j in your Nuxt app ✨

## Configuration

```ts
export default defineNuxtConfig({
  neo4j: {
    uri: 'string', // @default: process.env.NEO4J_URI
    auth: {
      type: 'string', // @default: 'basic'
      username: 'string', // @default: process.env.NEO4J_USERNAME
      password: 'string', // @default: process.env.NEO4J_PASSWORD
    },
  },
})
```

## Usage

Once configured, you can start using the Neo4j driver provided by the module in your Nuxt application. Here's an [example](./playground/server/api/users.get.ts) of how to use it:

```ts
export default defineEventHandler(async () => {
  const { records } = await useDriver().executeQuery('MATCH (q:User) RETURN q LIMIT 25;')
  return records
})
```

for more information please check [neo4j documentation](https://neo4j.com/docs/)

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-neo4j/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-neo4j

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-neo4j.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-neo4j

[license-src]: https://img.shields.io/npm/l/nuxt-neo4j.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-neo4j

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
