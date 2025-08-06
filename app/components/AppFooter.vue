<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-main">
        <p class="footer-text">
          This manifesto is released under 
          <NuxtLink to="https://creativecommons.org/licenses/by-nc-sa/4.0/" class="footer-link" external>
            CC-BY-NC-SA-4.0
          </NuxtLink>
        </p>
      </div>
      <div class="footer-divider"></div>
      <nav class="footer-nav">
        <ul class="footer-nav-list">
          <li>
            <NuxtLink 
              href="https://github.com/ai-manifesto" 
              class="footer-nav-link github-link" 
              target="_blank" 
              rel="noopener noreferrer"
              external
            >
              <Icon name="ph:github-logo-bold" size="18px" />
              <span class="sr-only">GitHub</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/imprint" class="footer-nav-link">
              Imprint
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy-policy" class="footer-nav-link">
              Privacy Policy
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
footer {
	text-align: center;
	margin-top: 4rem;
	padding-top: 2rem;
	border-top: 1px solid var(--border-color);
	font-size: 0.875rem;
	color: var(--subtle-text);
}

footer ul {
	list-style: none;
	padding: 0;
	margin: 1rem 0 0 0;
	display: flex;
	justify-content: center;

}

footer li {
	margin: 0;
}

.footer {
  background: var(--background-color);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 4rem;
  padding: 3rem 0 2rem;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
}

.footer-main {
  margin-bottom: 1.5rem;
}

.footer-text {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-muted, #888);
  line-height: 1.5;
}

.footer-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color, #0ea5e9), transparent);
  margin: 1.5rem auto;
  opacity: 0.5;
}

.footer-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
}

.footer-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.footer-nav-list li {
  margin: 0;
}

.footer-nav-list li:not(:last-child)::after {
  content: "•";
  color: var(--text-muted, #888);
  font-size: 0.75rem;
  opacity: 0.6;
  margin: 0 0.75rem;
}

.footer-nav-link {
  color: var(--text-color, #fff);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.25rem 0;
}

.footer-nav-link:hover {
  color: var(--primary-color, #0ea5e9);
}

.github-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.footer-link {
  color: var(--primary-color, #0ea5e9);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.8;
}
</style>
