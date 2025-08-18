import { createHash } from 'crypto'
import type { PrivacyOptions, UserData } from './validation'

export function createUserHash (providerId: string, provider: string): string {
  return createHash('sha256')
    .update(`${providerId}_${provider}`)
    .digest('hex')
}

export function processSigneeData (
  userData: UserData,
  provider: 'github' | 'linkedin',
  options: PrivacyOptions,
) {
  // userdata based on provider
  const userId = userData.id.toString()
  const fullName = provider === 'github' 
    ? (userData.name || userData.login || 'User') 
    : (userData.name || `${userData.given_name || ''} ${userData.family_name || ''}`.trim() || 'User')
  
  const nameParts = fullName.trim().split(' ')
  const firstName = nameParts[0] || (provider === 'github' ? userData.login || 'User' : 'User')
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null
  
  const userAvatar = provider === 'github' 
    ? userData.avatar_url 
    : (userData.picture || '/anonymous-avatar.svg')
  
  const userProfileUrl = provider === 'github' 
    ? userData.html_url 
    : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(fullName)}`

  // Process data based on privacy level
  switch (options.privacyLevel) {
    case 'full':
      return {
        providerId: userId,
        provider: provider,
        username: provider === 'github' ? userData.login : null,
        firstName,
        lastName,
        displayName: fullName,
        avatarUrl: options.showProfilePic ? userAvatar : '/anonymous-avatar.svg',
        profileUrl: userProfileUrl,
        privacyLevel: 'full',
        showProfilePic: options.showProfilePic,
        userHash: null,
      }

    case 'first_name':
      return {
        providerId: userId,
        provider: provider,
        username: null, 
        firstName,
        lastName: null, 
        displayName: firstName,
        avatarUrl: options.showProfilePic ? userAvatar : '/anonymous-avatar.svg',
        profileUrl: '#', 
        privacyLevel: 'first_name',
        showProfilePic: options.showProfilePic,
        userHash: null,
      }

    case 'anonymous': {
      const userHash = createUserHash(userId, provider)
      return {
        providerId: `anon_${userHash.substring(0, 8)}`, 
        provider: provider,
        username: null,
        firstName: null,
        lastName: null,
        displayName: 'Anonymous Supporter',
        avatarUrl: '/anonymous-avatar.svg',
        profileUrl: '#',
        privacyLevel: 'anonymous',
        showProfilePic: false,
        userHash: userHash, 
      }
    }

    default:
      throw new Error(`Invalid privacy level: ${options.privacyLevel}`)
  }
}

export { getSigneeDisplayData as getDisplayData } from '../../shared/utils/signee-display'
