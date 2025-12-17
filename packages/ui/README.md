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

