import type { PublicSignee, SigneeData, UserData } from '../../server/utils/validation'

export const mockGitHubUser: UserData = {
  id: '12345',
  login: 'timnit',
  name: 'Timnit Gebru',
  avatar_url: 'https://github.com/avatars/timnit.jpg',
  html_url: 'https://github.com/timnit',
}

export const mockLinkedInUser: UserData = {
  id: '67890',
  given_name: 'Kate',
  family_name: 'Crawford',
  picture: 'https://linkedin.com/avatars/katecrawford.jpg',
}

export const mockPublicSignee: PublicSignee = {
  displayName: 'Timnit Gebru',
  avatarUrl: 'https://github.com/avatars/timnit.jpg',
  profileUrl: 'https://github.com/timnit',
  firstName: 'Timnit',
  privacyLevel: 'full',
  showProfilePic: true,
}

export const mockProcessedSigneeData = {
  fullPrivacy: {
    displayName: 'Timnit Gebru',
    firstName: 'Timnit',
    avatarUrl: 'https://github.com/avatars/timnit.jpg',
    profileUrl: 'https://github.com/timnit',
    privacyLevel: 'full' as const,
    showProfilePic: true,
  } satisfies SigneeData,
  
  firstNamePrivacy: {
    displayName: 'Kate', 
    firstName: 'Kate',
    avatarUrl: 'https://linkedin.com/avatars/katecrawford.jpg',
    profileUrl: '#',
    privacyLevel: 'first_name' as const,
    showProfilePic: true,
  } satisfies SigneeData,
  
  anonymousPrivacy: {
    displayName: 'Anonymous Supporter',
    firstName: null,
    avatarUrl: '/anonymous-avatar.svg',
    profileUrl: '#',
    privacyLevel: 'anonymous' as const,
    showProfilePic: false,
  } satisfies SigneeData,
}
