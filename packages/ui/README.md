# @annts095/microfrontend-sandbox-ui

UI components library for microfrontend app shell.

## Installation

```bash
npm install @annts095/microfrontend-sandbox-ui
```

or

```bash
pnpm add @annts095/microfrontend-sandbox-ui
```

## Setup

Before installing, you need to configure npm to use GitHub Packages:

1. Create a Personal Access Token (PAT) with `read:packages` permission
2. Add the following to your `.npmrc` file (or create one in your home directory):

```
@annts095:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Usage

```tsx
import { Header } from '@annts095/microfrontend-sandbox-ui';

function App() {
  return <Header title="My App" />;
}
```

## Components

### Header

A header component with navigation link and title.

```tsx
<Header title="Page Title" />
```

## Publishing

### Prerequisites

1. **Create a GitHub Personal Access Token (PAT)**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Grant the following permissions:
     - `write:packages` (to publish packages)
     - `read:packages` (to read packages)
   - Generate and copy the token

2. **Set the GITHUB_TOKEN environment variable**

   **Temporary (current session only):**
   ```bash
   export GITHUB_TOKEN=your_github_token_here
   ```

   **Permanent (recommended):**
   ```bash
   echo 'export GITHUB_TOKEN=your_github_token_here' >> ~/.zshrc
   source ~/.zshrc
   ```

### Build and Publish

**From the root directory:**
```bash
# Build the package
pnpm build:ui

# Publish to GitHub Packages
pnpm publish:ui
```

**Or from the packages/ui directory:**
```bash
cd packages/ui

# Build the package
pnpm build

# Publish to GitHub Packages
pnpm publish
```

### Version Management

To update the version before publishing:
```bash
cd packages/ui
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0
```

Then publish:
```bash
pnpm publish:ui
```

