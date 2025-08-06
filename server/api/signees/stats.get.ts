import { getStats } from '../../utils/database'

export default defineEventHandler(async () => {
  try {
    const stats = await getStats()
    return stats
  } catch (error: any) {
    console.error('Fetch signee stats error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch signee stats',
    })
  }
})
