# ai-manifesto.dev website

## What is this?

This is the source code for the [ai-manifesto.dev](https://ai-manifesto.dev) website. More about the project can be found on this [GitHub repository](https://github.com/ai-manifesto). 

## Nuxt 4 Application

This application uses: 

- Nuxt 4 - the metaframework for Vue.js
- Postgres - for the database with prisma for the ORM
- Tailwind CSS for utils of a unique CSS setup

The current production is hosted on Vercel.

### Setup

Make sure to install dependencies:

```bash
pnpm install
```

### Development Server and DX

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```
We are using husky for pre-commit hooks and lint-staged for running linters on staged files. Make sure to commit your changes with `git commit` to trigger these checks.

### Production

Take a look at the script in `package.json` to build the application for production:

```bash
pnpm build
pnpm preview
```

# Contributing

Contributions are welcome to improve the manifesto website! To keep things organized and ensure, we have these hopefully simple steps: 

1. **Open an issue first** - Share your idea or describe the bug you'd like to fix
2. **Wait for assignment** - Wait for feedback and assignment of the issue to you
3. **Submit your PR** - Create your pull request with the changes

This helps us coordinate efforts and makes sure your work aligns with the project's direction. Thanks for helping make this better!
