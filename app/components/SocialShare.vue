<script setup lang="ts">
const siteUrl = 'https://ai-manifesto.dev'

const shareText = 'Check out the AI Manifesto - principles for responsible AI usage in development and collaboration'
const encodedText = encodeURIComponent(shareText)
const encodedUrl = encodeURIComponent(siteUrl)

type SocialPlatform = {
  name: string
  icon: string
  url: string
  color: string
  bgColor: string
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Bluesky',
    icon: 'ph:butterfly-bold',
    url: `https://bsky.app/intent/compose?text=${encodedText} ${encodedUrl}`,
    color: '#00D4FF',
    bgColor: '#E0F8FF',
  },
  {
    name: 'LinkedIn',
    icon: 'ph:linkedin-logo-bold',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    color: '#0077B5',
    bgColor: '#E3F7FF',
  },
  {
    name: 'Reddit',
    icon: 'ph:reddit-logo-bold',
    url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
    color: '#FF4500',
    bgColor: '#FFF3E0',
  },
  {
    name: 'Hacker News',
    icon: 'ph:fire-bold',
    url: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedText}`,
    color: '#FF6600',
    bgColor: '#FFF8F0',
  },
  {
    name: 'Discord',
    icon: 'ph:discord-logo-bold',
    url: 'https://discord.com/channels/@me',
    color: '#5865F2',
    bgColor: '#F0F2FF',
  },
  {
    name: 'X (Twitter)',
    icon: 'ph:x-logo-bold',
    url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    color: '#000000',
    bgColor: '#F5F5F5',
  },
]
</script>

<template>
  <div class="card">
    <h3>3. Share on Social Media</h3>
    <p>Spread the word about responsible AI development across these platforms.</p>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 social-grid">
      <a
        v-for="platform in socialPlatforms"
        :key="platform.name"
        :href="platform.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-row items-center gap-3 social-platform"
        :style="{ '--platform-color': platform.color, '--platform-bg': platform.bgColor }"
        :aria-label="`Share on ${platform.name} - opens in new tab`"
      >
        <div class="flex items-center justify-center social-icon">
          <Icon 
            v-if="platform.name !== 'Hacker News'" 
            :name="platform.icon" 
            size="24px"
            aria-hidden="true" 
          />
          <span v-else class="hn-logo" aria-hidden="true">Y</span>
        </div>
        <span class="social-name">{{ platform.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.social-grid {
  margin-top: 1.5rem;
}

.social-platform {
  padding: 1.25rem;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 80px;
  will-change: transform;
}

.social-platform::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--platform-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-platform::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, var(--platform-color) 0%, transparent 70%);
  opacity: 0;
  transition: all 0.4s ease;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 0;
}

.social-platform:hover::before {
  opacity: 1;
}

.social-platform:hover::after {
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

.social-platform:hover {
  background: var(--platform-bg);
  border-color: var(--platform-color);
  transform: translateY(-4px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.05);
}

.social-icon {
  width: 48px;
  height: 48px;
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.social-platform:hover .social-icon {
  background: var(--platform-color);
  border-color: var(--platform-color);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.social-icon :deep(svg) {
  width: 24px;
  height: 24px;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.social-platform:hover .social-icon :deep(svg) {
  color: white;
  transform: scale(1.1);
}

.hn-logo {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all 0.3s ease;
}

.social-platform:hover .hn-logo {
  color: white;
  transform: scale(1.1);
}

.social-name {
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.social-platform:hover .social-name {
  color: var(--platform-color);
}

@media (max-width: 768px) {
  .social-platform {
    padding: 1rem;
    min-height: 70px;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
  
  .social-icon :deep(svg) {
    width: 20px;
    height: 20px;
  }
}
</style>
