<template>
  <div>
    <h2 class="mb-4">
      Other Projects
    </h2>
    <p class="mb-8 text-lg">
      Please consider having a look at these projects. 
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <NuxtLink
        to="https://slashai.page/"
        external
        target="_blank"
        class="card project-card"
      >
        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 min-w-0">
            <h3 class="mb-2 text-xl font-bold leading-tight">
              SlashAI
            </h3>
            <div class="project-link">
              slashai.page
            </div>
          </div>
        </div>
        <p class="project-description">
          SlashAI is an open database of pages on the web showing how people are using generative AI
        </p>
      </NuxtLink>

      <NuxtLink
        to="https://www.bydamo.la/p/ai-manifesto"
        external
        target="_blank"
        class="card project-card"
      >
        <div class="flex items-center gap-4 mb-6">
          <div class="flex-1 min-w-0">
            <h3 class="mb-2 text-xl font-bold leading-tight">
              /ai manifesto by Damola Morenikeji
            </h3>
            <div class="project-link">
              bydamo.la
            </div>
          </div>
        </div>
        <p class="project-description">
          The /ai manifesto of Damola Morenikeji is a call for creators to foster trust by transparently declaring their use of generative AI on a dedicated '/ai' page on their own website.
        </p>
      </NuxtLink>
    </div>
    <p class="mt-6">
      Have an own project you'd like to share? Let me know! 
      <NuxtLink to="mailto:mail@ai-manifesto.dev">
        mail@ai-manifesto.dev
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.project-card {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
}

.project-card:hover h3 {
  color: var(--primary-color);
}

.project-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}

.project-card:hover .project-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 20px rgba(0, 217, 255, 0.3);
}

.project-icon :deep(svg) {
  width: 24px;
  height: 24px;
  color: white;
}

.project-link {
  font-size: 0.9rem;
  color: var(--subtle-text);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
  background: var(--background-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.project-card:hover .project-link {
  background: var(--primary-color);
  color: white;
}

.project-description {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .project-icon :deep(svg) {
    width: 20px;
    height: 20px;
  }
}
</style>
