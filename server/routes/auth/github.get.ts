import { addSignee, hasUserSigned } from '../../utils/database'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: false, 
  },
  async onSuccess (event, { user }) {
    try {

      const alreadySigned = await hasUserSigned(user.id.toString(), 'github')
      
      if (!alreadySigned) {
        const fullName = user.name || user.login
        const nameParts = fullName.trim().split(' ')
        const firstName = nameParts[0] || user.login
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null

        // Intended behavior: Automatically sign the manifesto
        const signeeData = {
          providerId: user.id.toString(),
          provider: 'github' as const,
          username: user.login,
          firstName,
          lastName,
          displayName: fullName,
          avatarUrl: user.avatar_url,
          profileUrl: user.html_url,
        }
        
        await addSignee(signeeData)
        
        return sendRedirect(event, '/?signed=success')
      } else {
        return sendRedirect(event, '/?signed=already')
      }
    } catch (error) {
      console.error('Error during GitHub sign process:', error)
      return sendRedirect(event, '/?error=sign_failed')
    }
  },
  onError (event: any, error: any) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/?error=github_auth_failed')
  },
})
