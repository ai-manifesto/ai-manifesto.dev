import { z } from 'zod'
import { setPrivacySession } from '../../utils/privacy-session'
import { PrivacySessionSchema } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  if (!isMethod(event, 'POST')) {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    })
  }

  try {
    const body = await readBody(event)
    const validatedData = PrivacySessionSchema.parse(body)

    await setPrivacySession(event, validatedData)

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid privacy data',
        data: error.issues,
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to set privacy session',
    })
  }
})
