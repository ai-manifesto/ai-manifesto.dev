<script setup lang="ts">
const signingProvider = ref<'github' | 'linkedin' | null>(null)
const showPrivacyDialog = ref(false)
const privacyLevel = ref<'full' | 'first_name' | 'anonymous'>('full')
const showProfilePic = ref(true)

const openPrivacyDialog = () => {
  showPrivacyDialog.value = true
}

const closeDialog = () => {
  showPrivacyDialog.value = false
  signingProvider.value = null
}

const signWith = async (provider: 'github' | 'linkedin') => {
  signingProvider.value = provider
  showPrivacyDialog.value = false
  
  try {
    // persist privacy settings through oAuth
    await $fetch('/api/auth/privacy-session', {
      method: 'POST',
      body: {
        privacyLevel: privacyLevel.value,
        showProfilePic: showProfilePic.value,
      },
    })
    
    await navigateTo(`/auth/${provider}`, { external: true })
  } catch (error) {
    console.error('Privacy session error:', error)
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
  } else if (route.query.error === 'github_missing_privacy' || route.query.error === 'linkedin_missing_privacy') {
    showMessage.value = 'Privacy settings were lost. Please try signing again.'
    messageType.value = 'error'
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

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDialog()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <div class="card">
    <h3>1. Sign the Manifest</h3>
    <p>
      Sign the manifest using your GitHub or LinkedIn account. Choose your privacy level
      to control what information is displayed publicly.
    </p>
    
    <div 
      v-if="showMessage" 
      :class="['message', messageType]" 
      role="alert" 
      aria-live="polite"
    >
      {{ showMessage }}
    </div>
    
    <div class="sign-button-container">
      <button
        class="sign-manifesto-button"
        :disabled="signingProvider !== null"
        @click="openPrivacyDialog"
      >
        <Icon name="ph:signature-bold" size="20px" aria-hidden="true" />
        {{ signingProvider ? 'Signing...' : 'Sign the Manifesto' }}
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="showPrivacyDialog" class="dialog-overlay">
      <div 
        class="dialog-backdrop"
        @click="closeDialog"
      ></div>
      
      <dialog 
        ref="privacyDialog"
        :open="showPrivacyDialog"
        class="privacy-dialog"
        @click.self="closeDialog"
      >
        <div class="dialog-content">
          <div class="dialog-header">
            <h4>Choose Your Privacy Level</h4>
            <button 
              class="close-button"
              aria-label="Close dialog"
              @click="closeDialog"
            >
              <Icon name="ph:x-bold" size="20px" />
            </button>
          </div>

          <form class="privacy-form" @submit.prevent>
            <div class="privacy-options">
              <label class="privacy-option">
                <input 
                  v-model="privacyLevel" 
                  type="radio" 
                  value="full" 
                  name="privacy"
                />
                <div class="option-content">
                  <span class="option-title">Sign with full name</span>
                  <small class="option-description">
                    Show: Your full name, profile picture (optional), link to your profile
                  </small>
                </div>
              </label>
              
              <label class="privacy-option">
                <input 
                  v-model="privacyLevel" 
                  type="radio" 
                  value="first_name" 
                  name="privacy"
                />
                <div class="option-content">
                  <span class="option-title">Sign with first name only</span>
                  <small class="option-description">
                    Show: First name only, profile picture (optional), no profile link
                  </small>
                </div>
              </label>
              
              <label class="privacy-option">
                <input 
                  v-model="privacyLevel" 
                  type="radio" 
                  value="anonymous" 
                  name="privacy"
                />
                <div class="option-content">
                  <span class="option-title">Sign anonymously</span>
                  <small class="option-description">
                    Show: "Anonymous Supporter", generic avatar, no profile link
                  </small>
                </div>
              </label>
            </div>

            <label 
              v-if="privacyLevel !== 'anonymous'" 
              class="profile-pic-option"
            >
              <input 
                v-model="showProfilePic" 
                type="checkbox" 
                name="showProfilePic"
              />
              <span>Show my profile picture</span>
            </label>

            <div class="auth-buttons">
              <button
                type="button"
                class="github-button"
                :disabled="signingProvider === 'github'"
                @click="signWith('github')"
              >
                <Icon name="ph:github-logo-bold" size="20px" aria-hidden="true" />
                {{ signingProvider === 'github' ? 'Signing...' : 'Sign with GitHub' }}
              </button>
              
              <button
                type="button"
                class="linkedin-button"
                :disabled="signingProvider === 'linkedin'"
                @click="signWith('linkedin')"
              >
                <Icon name="ph:linkedin-logo-bold" size="20px" aria-hidden="true" />
                {{ signingProvider === 'linkedin' ? 'Signing...' : 'Sign with LinkedIn' }}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  </Teleport>
</template>

<style scoped>
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 600;
}

.message.success {
  background: var(--accent-transparent);
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
}

.message.error {
  background: var(--error-transparent);
  border: 1px solid var(--error-color);
  color: var(--error-color);
}

.message.info {
  background: var(--info-transparent);
  border: 1px solid var(--info-color);
  color: var(--info-color);
}

.sign-button-container {
  display: flex;
  justify-content: center;
}

.sign-manifesto-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px var(--primary-glow-medium);
  min-width: 240px;
  justify-content: center;
}

.sign-manifesto-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--primary-glow-heavy);
}

.sign-manifesto-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--black-overlay);
  backdrop-filter: blur(4px);
}

.privacy-dialog {
  position: relative;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  width: 90vw;
  max-height: 80vh;
  overflow: auto;
  z-index: 10000;
  box-shadow: 0 20px 40px var(--black-shadow);
  margin: 0;
  animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dialog-content {
  padding: 1.5rem;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.dialog-header h4 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color);
}

.close-button {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background: var(--background-secondary);
}

.privacy-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.privacy-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.privacy-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.privacy-option:hover {
  border-color: var(--primary-color);
  background: var(--primary-glow-subtle);
}

.privacy-option input[type="radio"] {
  margin: 0.25rem 0 0 0;
  flex-shrink: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option-title {
  font-weight: 600;
  color: var(--text-color);
}

.option-description {
  color: var(--subtle-text);
  font-size: 0.875rem;
  line-height: 1.4;
}

.profile-pic-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--background-secondary);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-color);
}

.profile-pic-option input[type="checkbox"] {
  background: var(--background-secondary);
  margin: 0;
  accent-color: var(--primary-color);
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.github-button,
.linkedin-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--background-color);
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px var(--primary-glow-light);
  flex: 1;
  justify-content: center;
}

.github-button:hover:not(:disabled),
.linkedin-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--surface-glow);
}

.github-button:disabled,
.linkedin-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .privacy-dialog {
    width: 95vw;
    max-height: 90vh;
  }
  
  .dialog-content {
    padding: 1rem;
  }
  
  .auth-buttons {
    flex-direction: column;
  }
  
  .github-button,
  .linkedin-button {
    flex: none;
  }
}
</style>
