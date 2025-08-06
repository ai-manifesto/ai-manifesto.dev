import { getAllSignees } from '../../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const result = await getAllSignees(query)
    return result
  } catch (error: any) {
    console.error('Fetch signees error:', error)
    
    // Handle Zod validation errors specifically
    if (error.name === 'ZodError') {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid query parameters: ${error.issues.map((e: any) => e.message).join(', ')}`,
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch signees',
    })
  }
})
