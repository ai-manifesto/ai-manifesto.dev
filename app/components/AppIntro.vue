<template>
  <header>
    <h1>the ai manifesto</h1>
    <p class="claim">
      Guiding responsible AI in development and collaboration.
    </p>
    <p>Version 1.0</p>

    <h2 id="why-this-matters" class="mt-18">
      Why this matters
    </h2>
    <p class="intro-text">
      AI seems to give us superpowers. But as with any powerful tool, we need principles to guide us.
      This manifesto sets 5 principles for using AI tools like LLMs responsibly and effectively. It
      emphasizes the importance of <strong>human insight, accountability, and learning</strong> in the age
      of AI.
    </p>
    <p class="intro-text">
      This manifest is inspired by the rules, that Daniel Roe shared in his post 
      <a
        href="https://roe.dev/blog/using-ai-in-open-source"
        target="_blank"
        rel="noopener noreferrer"
      >"Using AI in open source"</a>.
    </p>
  </header>
</template>

<style scoped>
.claim {
	font-size: 1.15rem;
	font-style: italic;
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	margin-top: 0.5rem;
	font-weight: 600;
	margin-bottom: 1.5rem;
}

.intro-text {
  font-size: 1.125rem;
  color: var(--subtle-text);
  text-align: center;
  max-width: 700px;
  margin: 1rem auto 0 auto;
}

.intro-text strong {
  color: var(--primary-color);
  font-weight: 700;
}

.intro-text a {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.2s ease;
}

.intro-text a:hover {
  text-decoration: underline;
  text-decoration-color: var(--primary-color);
}

@media (max-width: 768px) {
  .claim {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
  
  .intro-text {
    font-size: 1rem;
    max-width: 100%;
    margin: 0.75rem auto 0 auto;
  }
}

@media (max-width: 480px) {
  .claim {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
  
  .intro-text {
    font-size: 0.9rem;
    margin: 0.5rem auto 0 auto;
  }
}
</style>
