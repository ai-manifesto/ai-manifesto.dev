import { addSignee, hasUserSigned, prisma } from './database'
import { createUserHash, processSigneeData } from './privacy'
import { clearPrivacySession, getPrivacySession } from './privacy-session'

export async function handleOAuthSignup (
  //TODO: Better types
  event: any,
  user: any,
  provider: 'github' | 'linkedin',
) {
  try {
    const privacyData = await getPrivacySession(event)
    
    if (!privacyData) {
      console.error('No privacy session found for OAuth signup')
      return sendRedirect(event, `/?error=${provider}_missing_privacy`)
    }

    const { privacyLevel, showProfilePic } = privacyData

    const userId = provider === 'linkedin' 
      ? (user.sub || user.id?.toString())
      : user.id.toString()
    
    if (!userId) {
      await clearPrivacySession(event)
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
        await clearPrivacySession(event)
        return sendRedirect(event, '/?signed=already')
      }
    } else {
      const alreadySigned = await hasUserSigned(userId, provider)
      if (alreadySigned) {
        await clearPrivacySession(event)
        return sendRedirect(event, '/?signed=already')
      }
    }

    const signeeData = processSigneeData(userData, provider, {
      privacyLevel,
      showProfilePic,
    })
    
    await addSignee(signeeData)
    await clearPrivacySession(event)
    
    return sendRedirect(event, '/?signed=success')
  } catch (error) {
    console.error(`${provider} OAuth error:`, error)
    await clearPrivacySession(event)
    return sendRedirect(event, `/?error=${provider}_auth_failed`)
  }
}
