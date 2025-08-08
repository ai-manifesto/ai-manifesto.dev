import { addSignee, hasUserSigned } from '../../utils/database'

export default defineOAuthLinkedInEventHandler({
  config: {
    emailRequired: false,
  },
  async onSuccess (event, { user }) {
    try {

      const userId = user.sub || user.id?.toString()
      
      if (!userId) {
        return sendRedirect(event, '/?error=linkedin_missing_id')
      }

      const alreadySigned = await hasUserSigned(userId, 'linkedin')
      
      if (!alreadySigned) {
        const displayName = user.name || `${user.given_name || ''} ${user.family_name || ''}`.trim() || 'LinkedIn User'
        const firstName = user.given_name || null
        const lastName = user.family_name || null
        const avatarUrl = user.picture || 'https://static.licdn.com/sc/h/3r1v2dvhvfg1wxc8t9p8k4sy5'
        // LinkedIn does not provide a profile url. We are using the display name and populate the search field to find that person.
        const profileUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(displayName)}`

        const signeeData = {
          providerId: userId,
          provider: 'linkedin' as const,
          username: null, 
          firstName,
          lastName,
          displayName,
          avatarUrl,
          profileUrl,
        }
        
        await addSignee(signeeData)
        
        return sendRedirect(event, '/?signed=success')
      } else {
        return sendRedirect(event, '/?signed=already')
      }
    } catch {
      return sendRedirect(event, '/?error=sign_failed')
    }
  },
  onError (event: any) {
    return sendRedirect(event, '/?error=linkedin_auth_failed')
  },
})
