import type { SigneeData, SigneeDisplayData } from '../../server/utils/validation'

export function getSigneeDisplayData (
  signee: SigneeData,
  includeClickable = false,
): SigneeDisplayData {
  const result: SigneeDisplayData = {
    name: 'Unknown',
    avatar: '/anonymous-avatar.svg',
    profileUrl: '#',
  }

  // "full" is default privacyLevel and will work as a fallback, too.
  const privacyLevel = signee.privacyLevel || 'full'
  
  switch (privacyLevel) {
    case 'full':
      result.name = signee.displayName
      result.avatar = signee.showProfilePic ? signee.avatarUrl || '/anonymous-avatar.svg' : '/anonymous-avatar.svg'
      result.profileUrl = signee.profileUrl || '#'
      if (includeClickable) {
        result.isClickable = true
      }
      break

    case 'first_name':
      result.name = signee.firstName || signee.displayName
      result.avatar = signee.showProfilePic ? signee.avatarUrl || '/anonymous-avatar.svg' : '/anonymous-avatar.svg'
      result.profileUrl = '#'
      if (includeClickable) {
        result.isClickable = false
      }
      break

    case 'anonymous':
      result.name = 'Anonymous Supporter'
      result.avatar = '/anonymous-avatar.svg'
      result.profileUrl = '#'
      if (includeClickable) {
        result.isClickable = false
      }
      break

    default:
      result.name = signee.displayName || 'Unknown'
      result.avatar = signee.avatarUrl || '/anonymous-avatar.svg'
      result.profileUrl = signee.profileUrl || '#'
      if (includeClickable) {
        result.isClickable = true
      }
      break
  }
  return result
}
