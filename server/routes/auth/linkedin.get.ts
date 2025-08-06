import { addSignee, hasUserSigned } from '../../utils/database'

export default defineOAuthLinkedInEventHandler({
  config: {
    emailRequired: false,
  },
  async onSuccess(event, { user }) {
    try {

      const userId = user.sub || user.id?.toString()
      
      if (!userId) {
        return sendRedirect(event, '/?error=linkedin_missing_id')
      }

      const alreadySigned = await hasUserSigned(userId, 'linkedin')
      
      if (!alreadySigned) {
        //  Map LinkedIn OpenID Connect response
        const displayName = user.name || `${user.given_name || ''} ${user.family_name || ''}`.trim() || user.vanityName || 'LinkedIn User'
        const firstName = user.given_name || user.firstName || null
        const lastName = user.family_name || user.lastName || null
        const avatarUrl = user.picture || user.avatar_url || 'https://static.licdn.com/sc/h/3r1v2dvhvfg1wxc8t9p8k4sy5'
        const profileUrl = user.profile || user.html_url || `https://linkedin.com/in/${user.vanityName || userId}`

        // Intended behavior: Automatically sign the manifesto
        const signeeData = {
          providerId: userId,
          provider: 'linkedin' as const,
          username: user.vanityName || user.login || null,
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
    } catch (error) {
      return sendRedirect(event, '/?error=sign_failed')
    }
  },
  onError(event: any, error: any) {
    return sendRedirect(event, '/?error=linkedin_auth_failed')
  },
})