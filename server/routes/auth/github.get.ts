import { handleOAuthSignup } from '../../utils/oauth-handler'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: false, 
  },
  async onSuccess (event, { user }) {
    return handleOAuthSignup(event, user, 'github')
  },
})
