import { consola } from 'consola'
import { colors } from 'consola/utils'

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
