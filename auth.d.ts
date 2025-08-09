/*For oAuth returns - this file has been generated*/
// TODO: type for each oAuth provider
declare module '#auth-utils' {
  type User = {
    id: string | number
    login?: string
    name?: string
    email?: string
    avatar_url?: string
    html_url?: string
    firstName?: string
    lastName?: string
    vanityName?: string
    sub?: string
    given_name?: string
    family_name?: string
    picture?: string
    profile?: string
  }

  type UserSession = {
    user?: User
    github?: {
      id: number
      login: string
      name: string | null
      email: string
      avatar_url: string
      html_url: string
    }
    linkedin?: {
      sub: string
      name?: string
      given_name?: string
      family_name?: string
      picture?: string
      email?: string
      profile?: string
    }
    loggedInAt?: Date
    privacyLevel?: 'full' | 'first_name' | 'anonymous'
    showProfilePic?: boolean
    timestamp?: number
  }

  type SecureSessionData = {
    apiTokens?: Record<string, string>
  }
}

export {}
