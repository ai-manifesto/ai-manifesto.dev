import { addSignee, hasUserSigned, prisma } from './database'
import { createUserHash, processSigneeData } from './privacy'
import type { PrivacyLevel } from '#shared/utils/signee-display'

export async function handleOAuthSignup (
  event: any,
  user: any,
  provider: 'github' | 'linkedin',
) {
  try {
    const query = getQuery(event)
    const privacyLevel = (query.privacy || 'full') as PrivacyLevel
    const showProfilePic = query.showProfilePic !== 'false'

    const userId = provider === 'linkedin' 
      ? (user.sub || user.id?.toString())
      : user.id.toString()
    
    if (!userId) {
      return sendRedirect(event, `/?error=${provider}_missing_id`)
    }
    // map open connect data for linkedin to schema
    const userData = provider === 'linkedin' 
      ? {
        id: userId,
        name: user.name,
        given_name: user.given_name,
        family_name: user.family_name,
        picture: user.picture,
      }
      : user

    if (privacyLevel === 'anonymous') {
      const userHash = createUserHash(userId, provider)
      const existingAnonymous = await prisma.signee.findUnique({
        where: { userHash },
        select: { id: true },
      })
      if (existingAnonymous) {
        return sendRedirect(event, '/?signed=already')
      }
    } else {
      const alreadySigned = await hasUserSigned(userId, provider)
      if (alreadySigned) {
        return sendRedirect(event, '/?signed=already')
      }
    }

    const signeeData = processSigneeData(userData, provider, {
      privacyLevel,
      showProfilePic,
    })
    
    await addSignee(signeeData)
    
    return sendRedirect(event, '/?signed=success')
  } catch (error) {
    console.error(`${provider} OAuth error:`, error)
    return sendRedirect(event, `/?error=${provider}_auth_failed`)
  }
}
