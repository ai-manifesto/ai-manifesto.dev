import type { PrivacyLevel, PrivacySessionData } from './validation'

export async function setPrivacySession (event: any, privacyData: {
  privacyLevel: PrivacyLevel
  showProfilePic: boolean
}) {
  await setUserSession(event, {
    privacyLevel: privacyData.privacyLevel,
    showProfilePic: privacyData.showProfilePic,
    timestamp: Date.now(),
  })
}

export async function getPrivacySession (event: any): Promise<PrivacySessionData | null> {
  const session = await getUserSession(event)
  
  if (!session?.privacyLevel || !session?.timestamp) {
    return null
  }
  
  const timeToExpire = 30 * 60 * 1000
  const isExpired = Date.now() - (session.timestamp as number) > timeToExpire

  if (isExpired) {
    await clearPrivacySession(event)
    return null
  }

  return {
    privacyLevel: session.privacyLevel as PrivacyLevel,
    showProfilePic: session.showProfilePic as boolean,
    timestamp: session.timestamp as number,
  }
}

export async function clearPrivacySession (event: any) {
  await clearUserSession(event)
}
