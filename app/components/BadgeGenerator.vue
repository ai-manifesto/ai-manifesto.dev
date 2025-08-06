<script setup lang="ts">
const useMultipleClipboard = () => {
  const clipboards = reactive({
    shield: useClipboard(),
    markdown: useClipboard(),
    html: useClipboard(),
  })

  const copyToClipboard = (type: keyof typeof clipboards, content: string) => {
    clipboards[type].copy(content)
  }

  const getCopiedState = (type: keyof typeof clipboards) => {
    return clipboards[type].copied
  }

  return { copyToClipboard, getCopiedState }
}

const { copyToClipboard, getCopiedState } = useMultipleClipboard()

//TODO: Set config.url 
const previewUrl = '/badge.svg'
const badgeImageUrl = `https://ai-manifesto.dev/badge.svg`
const siteUrl = 'https://ai-manifesto.dev'
const badgeMarkdown = `[![AI Manifesto Signee](${badgeImageUrl})](${siteUrl})`
const badgeHtml = `<a href="${siteUrl}"><img src="${badgeImageUrl}" alt="ai Manifesto Signee"></a>`
</script>

<template>
  <section id="badge" class="card">
    <h3>2. Add the Badge</h3>
    <p>
      The simplest way to show your commitment. Add the badge to your GitHub profile, project, or website.
    </p>
    
    <div class="badge-preview mt-12">
      <img :src="previewUrl" alt="AI Manifesto Signee Badge" class="badge-image" />
    </div>

    <div class="copy-section">
      <h4>SVG URL</h4>
      <div class="code-block">
        <pre><code>{{ badgeImageUrl }}</code></pre>
        <button
          :class="{ 'copied': getCopiedState('shield') }"
          class="copy-btn"
          :aria-label="getCopiedState('shield') ? 'SVG URL copied to clipboard' : 'Copy SVG URL to clipboard'"
          @click="copyToClipboard('shield', badgeImageUrl)"
        >
          {{ getCopiedState('shield') ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <div class="copy-section">
      <h4>Markdown Badge</h4>
      <div class="code-block">
        <pre><code>{{ badgeMarkdown }}</code></pre>
        <button
          :class="{ 'copied': getCopiedState('markdown') }"
          class="copy-btn"
          :aria-label="getCopiedState('markdown') ? 'Markdown code copied to clipboard' : 'Copy Markdown badge code to clipboard'"
          @click="copyToClipboard('markdown', badgeMarkdown)"
        >
          {{ getCopiedState('markdown') ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <div class="copy-section">
      <h4>HTML Badge</h4>
      <div class="code-block">
        <pre><code>{{ badgeHtml }}</code></pre>
        <button
          :class="{ 'copied': getCopiedState('html') }"
          class="copy-btn"
          :aria-label="getCopiedState('html') ? 'HTML code copied to clipboard' : 'Copy HTML badge code to clipboard'"
          @click="copyToClipboard('html', badgeHtml)"
        >
          {{ getCopiedState('html') ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.copy-section {
  margin-top: 1.5rem;
}

.copy-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--subtle-text);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-preview {
  display: flex;
  justify-content: center;
}

.badge-image {
  transition: transform 0.2s ease;
  	margin-bottom: 1rem;
	border-radius: 0.25rem;
}

.badge-image:hover {
  transform: scale(1.05);
}

.code-block {
  position: relative;
  margin-top: 0.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.copy-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
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
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px var(--surface-glow);
}

.copy-btn.copied {
  background: linear-gradient(135deg, var(--accent-color), #059669);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
}

.code-block pre {
  padding: 1rem 6rem 1rem 1rem;
  margin: 0;
  background-color: var(--code-background);
  border-radius: 8px;
}

.code-block pre code {
  word-break: break-all;
  color: var(--text-color);
  font-family: 'Cascadia Code', monospace;
  font-size: 0.875rem;
}
</style>
