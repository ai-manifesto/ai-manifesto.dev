<template>
  <section id="principles" class="principles">
    <h2>The 5 Principles</h2>
    <ol>
      <li><strong>Never let an LLM <em>speak</em> for you.</strong> Speak in your own voice. Use AI to clarify your thinking, but ensure the authenticity of your actions. </li>

      <li><strong>Never let an LLM <em>think</em> for you.</strong> Own the strategy. Use AI to explore solutions and challenge your assumptions, but remain the architect of your work. Recognize its potential for bias and errors. </li>

      <li><strong>Never let an LLM <em>own</em> your work.</strong> Take absolute responsibility for the final result. Never deflect your actions by "The AI said so". The credit and accountability for every contribution remains with you.</li>

      <li><strong>Never let an LLM <em>replace</em> your curiosity.</strong> AI enables you to learn and explore more deeply. Use AI as a partner not as an oracle that ends the exploration.</li>

      <li><strong>Never let an LLM <em>discourage</em> someone else.</strong> AI is built to empower individuals and lower barriers. It should foster inclusion, not create new forms of gatekeeping.</li>
    </ol>
  </section>
</template>

<style scoped>
.principles ol {
	list-style: none;
	padding-left: 0;
	counter-reset: principles-counter;
}

.principles li {
	counter-increment: principles-counter;
	margin-bottom: 1.5rem;
	font-size: 1.125rem;
	padding-left: 4rem;
	position: relative;
}

.principles li::before {
	content: counter(principles-counter);
	position: absolute;
	left: 0;
	top: -2px;
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--background-color);
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
	border-radius: 50%;
	width: 2.25rem;
	height: 2.25rem;
	text-align: center;
	line-height: 2.25rem;
	box-shadow: 0 0 20px var(--surface-glow);
	border: 1px solid var(--border-color);
}

.principles li strong {
	color: var(--heading-color);
}

@media (max-width: 768px) {
	.principles li {
		padding-left: 3.5rem;
		font-size: 1rem;
		margin-bottom: 1.25rem;
	}
	
	.principles li::before {
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.25rem;
	}
}

@media (max-width: 480px) {
	.principles li {
		padding-left: 3rem;
		font-size: 0.95rem;
	}
	
	.principles li::before {
		width: 1.75rem;
		height: 1.75rem;
		line-height: 1.75rem;
		font-size: 1.1rem;
	}
}
</style>

