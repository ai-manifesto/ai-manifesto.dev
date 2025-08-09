import { handleOAuthSignup } from '../../utils/oauth-handler'

export default defineOAuthLinkedInEventHandler({
  config: {
    emailRequired: false,
  },
  async onSuccess (event, { user }) {
    return handleOAuthSignup(event, user, 'linkedin')
  },
  onError (event: any) {
    return sendRedirect(event, '/?error=linkedin_auth_failed')
  },
})
