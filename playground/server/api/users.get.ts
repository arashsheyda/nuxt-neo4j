export default defineEventHandler(async () => {
  const { records } = await useDriver().executeQuery('MATCH (q:User) RETURN q LIMIT 25;')
  return records
})
