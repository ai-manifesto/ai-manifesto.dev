<script setup lang="ts">
const signingProvider = ref<'github' | 'linkedin' | null>(null)

const signWith = async (provider: 'github' | 'linkedin') => {
  signingProvider.value = provider
  try {
    await navigateTo(`/auth/${provider}`, { external: true })
  } catch (error) {
    console.error('Sign in error:', error)
    signingProvider.value = null
  }
}

const route = useRoute()
const showMessage = ref('')
const messageType = ref<'success' | 'error' | 'info'>('info')

onMounted(() => {
  if (route.query.signed === 'success') {
    showMessage.value = 'Thank you! You have successfully signed the manifesto.'
    messageType.value = 'success'
  } else if (route.query.signed === 'already') {
    showMessage.value = 'You have already signed this manifesto.'
    messageType.value = 'info'
  } else if (route.query.error) {
    showMessage.value = 'There was an error signing the manifesto. Please try again.'
    messageType.value = 'error'
  }
  
  if (route.query.signed || route.query.error) {
    setTimeout(() => {
      showMessage.value = ''
      navigateTo('/', { replace: true })
    }, 5000)
  }
})
</script>

<template>
  <div class="card">
    <h3>1. Sign the Manifest</h3>
    <p>
      Sign the manifest publicly using your GitHub or LinkedIn account. Your profile will be added to the
      signees list automatically.
    </p>
    
    <div 
      v-if="showMessage" 
      :class="['message', messageType]" 
      role="alert" 
      aria-live="polite"
    >
      {{ showMessage }}
    </div>
    
    <div class="flex flex-row items-center justify-center flex-wrap gap-4 auth-buttons">
      <button
        class="flex items-center gap-2 github-button"
        :disabled="signingProvider === 'github'"
        :aria-label="signingProvider === 'github' ? 'Signing in with GitHub' : 'Sign the manifesto with your GitHub account'"
        @click="signWith('github')"
      >
        <Icon name="ph:github-logo-bold" size="20px" aria-hidden="true" />
        {{ signingProvider === 'github' ? 'Signing...' : 'Sign with GitHub' }}
      </button>
      
      <button
        class="flex items-center gap-2 linkedin-button"
        :disabled="signingProvider === 'linkedin'"
        :aria-label="signingProvider === 'linkedin' ? 'Signing in with LinkedIn' : 'Sign the manifesto with your LinkedIn account'"
        @click="signWith('linkedin')"
      >
        <Icon name="ph:linkedin-logo-bold" size="20px" aria-hidden="true" />
        {{ signingProvider === 'linkedin' ? 'Signing...' : 'Sign with LinkedIn' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 600;
}

.message.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
}

.message.info {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid #3b82f6;
  color: #3b82f6;
}

.auth-buttons {
  justify-content: center;
}

.github-button,
.linkedin-button {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--background-color);
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 217, 255, 0.2);
  min-width: 200px;
  justify-content: center;
}

.github-button:hover,
.linkedin-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--surface-glow);
}

@media (max-width: 768px) {
  .auth-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .github-button,
  .linkedin-button {
    min-width: auto;
    width: 100%;
  }
}
</style>
