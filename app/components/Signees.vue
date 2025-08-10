<script setup lang="ts">
import type { PublicSignee, SigneeStats, SigneesResponse } from '../../server/utils/validation'
import { getSigneeDisplayData } from '#shared/utils/signee-display'

const config = useRuntimeConfig()
const currentPage = ref(1)
const limit = config.public.pagination.defaultLimit

const { data: signeesData, pending, refresh } = await useFetch<SigneesResponse>('/api/signees', {
  query: {
    page: currentPage,
    limit,
  },
  default: () => ({
    signees: [],
    total: 0,
    page: 1,
    limit,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  }),
})

const { data: stats } = await useFetch<SigneeStats>('/api/signees/stats', {
  default: () => ({ total: 0 }),
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= signeesData.value.totalPages) {
    currentPage.value = page
    refresh()
  }
}

const displayData = computed(() => {
  return signeesData.value.signees.map((signee: PublicSignee, index: number) => ({
    signee,
    display: getSigneeDisplayData(signee, true),
    key: `${currentPage.value}-${index}`,
  }))
})

const clickableSignees = computed(() => {
  return displayData.value.filter((item: any) => item.display.isClickable)
})

const nonClickableSignees = computed(() => {
  return displayData.value.filter((item: any) => !item.display.isClickable)
})

// Auto-refresh every 3 minutes
const { pause, resume } = useIntervalFn(() => {
  refresh()
}, 180000)

onMounted(() => {
  resume()
})

onUnmounted(() => {
  pause()
})
</script>

<template>
  <section id="signees" aria-labelledby="signees-heading">
    <h2 id="signees-heading">
      Signees
    </h2>
    <div class="flex flex-col items-center signees-header">
      <div class="stats">
        <p class="signee-count" aria-live="polite">
          {{ stats.total }} have signed this manifesto
        </p>
      </div>
    </div>
    
    <div 
      v-if="pending" 
      class="loading-state" 
      aria-live="polite" 
      aria-label="Loading signees"
    >
      <Icon 
        name="ph:spinner-bold" 
        size="32px" 
        class="spinning" 
        aria-hidden="true" 
      />
      <p>Loading signees...</p>
    </div>
    
    <div v-else-if="signeesData.signees.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 mb-4">
        <a
          v-for="item in clickableSignees"
          :key="item.key"
          :href="item.display.profileUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="card signee-card clickable"
          :title="item.display.name"
        >
          <img
            :src="item.display.avatar" 
            :alt="`${item.display.name}'s avatar`"
            class="signee-avatar"
            loading="lazy"
            decoding="async"
          />
          <div class="signee-info">
            <span class="signee-name">{{ item.display.name }}</span>
          </div>
        </a>
        <div
          v-for="item in nonClickableSignees"
          :key="item.key"
          class="card signee-card"
          :title="item.display.name"
        >
          <img
            :src="item.display.avatar" 
            :alt="`${item.display.name}'s avatar`"
            class="signee-avatar"
            loading="lazy"
            decoding="async"
          />
          <div class="signee-info">
            <span class="signee-name">{{ item.display.name }}</span>
          </div>
        </div>
      </div>

      <nav 
        v-if="signeesData.totalPages > 1" 
        class="flex items-center justify-center gap-4 pagination"
        aria-label="Signees pagination"
      >
        <button
          class="flex items-center gap-2 pagination-btn"
          :disabled="!signeesData.hasPrevPage"
          :aria-label="`Go to previous page, page ${currentPage - 1}`"
          @click="goToPage(currentPage - 1)"
        >
          <Icon 
            name="ph:caret-left-bold" 
            size="16px"
            aria-hidden="true" 
          />
          Previous
        </button>

        <div class="flex items-center gap-2 page-numbers" role="group" aria-label="Page numbers">
          <button
            v-for="page in Math.min(signeesData.totalPages, 7)"
            :key="page"
            class="page-number"
            :class="{ active: page === currentPage }"
            :aria-label="`Go to page ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          
          <span v-if="signeesData.totalPages > 7" class="page-ellipsis" aria-hidden="true">...</span>
          
          <button
            v-if="signeesData.totalPages > 7"
            class="page-number"
            :class="{ active: signeesData.totalPages === currentPage }"
            :aria-label="`Go to last page, page ${signeesData.totalPages}`"
            :aria-current="signeesData.totalPages === currentPage ? 'page' : undefined"
            @click="goToPage(signeesData.totalPages)"
          >
            {{ signeesData.totalPages }}
          </button>
        </div>

        <button
          class="flex items-center gap-2 pagination-btn"
          :disabled="!signeesData.hasNextPage"
          :aria-label="`Go to next page, page ${currentPage + 1}`"
          @click="goToPage(currentPage + 1)"
        >
          Next
          <Icon 
            name="ph:caret-right-bold" 
            size="16px"
            aria-hidden="true" 
          />
        </button>
      </nav>
      
      <div class="pagination-info">
        <span class="total-count">
          Page {{ currentPage }} of {{ signeesData.totalPages }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.signees-header {
  margin-bottom: 1.5rem;
}

.stats {
  gap: 1rem;
}

.signee-count {
  color: var(--subtle-text);
  font-size: 1.1rem;
  margin: 0;
}

.loading-state {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--subtle-text);
}

.loading-state .spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.signees-grid {
  margin-bottom: 1.5rem;
}

.signee-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  object-fit: cover;
}

.card.signee-card:hover .signee-avatar {
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.card.signee-card.clickable {
  cursor: pointer;
}

.card.signee-card:not(.clickable) {
  cursor: default;
}

.card.signee-card:not(.clickable):hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(var(--border-color), 0.1);
}

.signee-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.signee-name {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  hyphens: auto;
}

.pagination {
  padding: 3rem 0 1rem 0;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--background-secondary);
  border-color: var(--primary-color);
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-number {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, var(--card-background) 0%, var(--background-secondary) 100%);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

.page-number::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 50%, var(--secondary-hover) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.page-number:hover::before {
  opacity: 0.1;
}

.page-number.active {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 50%, var(--secondary-hover) 100%);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.05);
  box-shadow: 0 4px 16px var(--surface-glow);
}

.page-number.active::before {
  opacity: 0;
}

.page-number > * {
  position: relative;
  z-index: 2;
}

.page-ellipsis {
  color: var(--subtle-text);
  font-weight: 600;
  padding: 0 0.5rem;
}

.pagination-info {
  text-align: center;
  padding-bottom: 1rem;
}

.total-count {
  font-size: 0.9rem;
  color: var(--subtle-text);
}

@media (max-width: 768px) {
  .signees-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card.signee-card {
    padding: 1rem;
  }
  
  .signee-avatar {
    width: 40px;
    height: 40px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .page-numbers {
    order: -1;
  }
  
  .page-number {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .stats {
    gap: 0.75rem;
  }
  
  .page-numbers {
    gap: 0.25rem;
  }
  
  .page-number {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }
  
  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
