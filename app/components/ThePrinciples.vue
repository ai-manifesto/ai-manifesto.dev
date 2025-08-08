<template>
  <section id="principles" class="principles">
    <h2>The 5 Principles</h2>
    <ol>
      <li>
        <div class="principle-statement">
          <strong>Never let an LLM <em>speak</em> for you.</strong>
        </div>
        <div class="principle-explanation">
          Speak in your own voice. Use AI to clarify your thinking, but ensure the authenticity of your actions.
        </div>
      </li>

      <li>
        <div class="principle-statement">
          <strong>Never let an LLM <em>think</em> for you.</strong>
        </div>
        <div class="principle-explanation">
          Own the strategy. Use AI to explore solutions and challenge your assumptions, but remain the architect of your work. Recognize its potential for bias and errors.
        </div>
      </li>

      <li>
        <div class="principle-statement">
          <strong>Never let an LLM <em>own</em> your work.</strong>
        </div>
        <div class="principle-explanation">
          Take absolute responsibility for the final result. Never deflect your actions by "The AI said so". The credit and accountability for every contribution remains with you.
        </div>
      </li>

      <li>
        <div class="principle-statement">
          <strong>Never let an LLM <em>replace</em> your curiosity.</strong>
        </div>
        <div class="principle-explanation">
          AI enables you to learn and explore more deeply. Use AI as a partner not as an oracle that ends the exploration.
        </div>
      </li>

      <li>
        <div class="principle-statement">
          <strong>Never let an LLM <em>discourage</em> someone else.</strong>
        </div>
        <div class="principle-explanation">
          AI is built to empower individuals and lower barriers. It should foster inclusion, not create new forms of gatekeeping.
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.principles ol {
	list-style: none;
	padding-left: 0;
	counter-reset: principles-counter;
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
}

.principles li {
	counter-increment: principles-counter;
	font-size: 1.125rem;
	padding-left: 4rem;
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.principle-statement {
	font-size: 1.3rem;
	font-weight: 600;
	line-height: 1.4;
	color: var(--heading-color);
}

.principle-statement strong {
	font-weight: 700;
	color: var(--heading-color);
}

.principle-explanation {
	font-size: 1.1rem;
	line-height: 1.6;
	color: var(--subtle-text);
	opacity: 0.95;
}

.principles li::before {
	content: counter(principles-counter);
	position: absolute;
	left: 0;
	top: 0;
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--background-color);
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;
	text-align: center;
	line-height: 2.5rem;
	box-shadow: 0 0 20px var(--surface-glow);
	border: 1px solid var(--border-color);
	z-index: 1;
}

@media (max-width: 768px) {
	.principles ol {
		gap: 2rem;
	}
	
	.principles li {
		padding-left: 3.5rem;
		gap: 0.5rem;
	}
	
	.principle-statement {
		font-size: 1.2rem;
	}
	
	.principle-explanation {
		font-size: 1rem;
	}
	
	.principles li::before {
		width: 2.25rem;
		height: 2.25rem;
		line-height: 2.25rem;
		font-size: 1.3rem;
	}
}

@media (max-width: 480px) {
	.principles ol {
		gap: 1.75rem;
	}
	
	.principles li {
		padding-left: 3rem;
		gap: 0.5rem;
	}
	
	.principle-statement {
		font-size: 1.1rem;
	}
	
	.principle-explanation {
		font-size: 0.95rem;
		padding-left: 0.25rem;
		margin-left: 0.25rem;
	}
	
	.principles li::before {
		width: 2rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.2rem;
	}
}
</style>

