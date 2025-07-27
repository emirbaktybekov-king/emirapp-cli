# 🚀 EmirApp CLI

A powerful command-line tool to quickly scaffold modern Next.js applications with enterprise-grade folder structure, TypeScript, Tailwind CSS, React Query, and Zod pre-configured.

[![npm version](https://badge.fury.io/js/emirapp-cli.svg)](https://badge.fury.io/js/emirapp-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Next.js 14+ Ready** - Uses the latest App Router architecture
- 📁 **Enterprise Folder Structure** - Organized, scalable project layout
- 🔷 **TypeScript First** - Full TypeScript support out of the box
- 🎨 **Tailwind CSS** - Pre-configured with modern styling
- 🔄 **React Query** - Data fetching and state management ready
- ✅ **Zod Validation** - Type-safe schema validation
- 📦 **Yarn Package Manager** - Fast and reliable dependency management
- 🔧 **Barrel Exports** - Clean import statements with index files
- 🛡️ **Route Groups** - Organized authentication and protection patterns
- 🌈 **Beautiful CLI** - Colorful interface with spinners and progress indicators
- ⚡ **Fast Setup** - Optimized for speed with parallel operations
- 🎨 **ASCII Art Banner** - Eye-catching welcome screen

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Quick Start

Get started in seconds with no global installation required:

```bash
npx emirapp-cli
```

Follow the interactive prompts and you'll have a fully configured Next.js application ready to go!

## 📦 Installation

### Option 1: Use with npx (Recommended)

No installation needed - just run when you need it:

```bash
npx emirapp-cli
```

### Option 2: Global Installation

Install globally for repeated use:

```bash
npm install -g emirapp-cli
# Then run anywhere
emirapp
```

## 🎯 Usage

### Interactive Setup

Run the CLI and follow the guided setup:

```bash
npx emirapp-cli
```

### Step-by-Step Process

1. **Choose Framework**

   - Currently supports Next.js with App Router
   - More frameworks coming soon!

2. **Select Project Structure**

   - **Simple**: Perfect for most projects
   - **Enterprise**: Coming soon with advanced patterns

3. **Enter App Name**
   - Accepts letters, numbers, spaces, dashes, and underscores
   - Automatically sanitized to kebab-case

### What Happens Next

The CLI will automatically:

1. ✅ Create a new Next.js app with TypeScript and Tailwind CSS
2. ✅ Set up the enterprise folder structure
3. ✅ Generate barrel export files for clean imports
4. ✅ Install additional dependencies (Zod, React Query)
5. ✅ Provide next steps instructions

## 📁 Project Structure

Your generated project will have this clean, scalable structure:

```
my-next-app/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/            # Authentication routes
│   │   ├── 📁 (protected)/       # Protected routes
│   │   └── 📁 (unprotected)/     # Public routes
│   ├── 📁 api/                    # API layer
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   └── 📁 services/          # API service functions
│   ├── 📁 components/             # React components
│   │   ├── 📁 common/            # Shared components
│   │   ├── 📁 features/          # Feature-specific components
│   │   ├── 📁 icons/             # Icon components
│   │   ├── 📁 layout/            # Layout components
│   │   ├── 📁 modals/            # Modal components
│   │   └── 📁 ui/                # UI/Design system components
│   ├── 📁 context/               # React Context providers
│   ├── 📁 data/                  # Data management
│   │   └── 📁 stores/            # State stores
│   ├── 📁 lib/                   # Utility libraries
│   └── 📁 types/                 # TypeScript type definitions
├── 📁 public/                     # Static assets
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
└── 📄 next.config.js
```

### 🔄 Barrel Exports

Each major folder includes an `index.ts` file for clean imports:

```typescript
// src/components/ui/index.ts
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Modal } from "./Modal";
```

This enables clean imports throughout your app:

```typescript
import { Button, Input, Modal } from "@/components/ui";
```

## ⚙️ How It Works

### Technologies Used

- **[prompts](https://github.com/terkelg/prompts)** - Interactive CLI prompts
- **[execa](https://github.com/sindresorhus/execa)** - Process execution
- **[fs-extra](https://github.com/jprichardson/node-fs-extra)** - Enhanced file system operations
- **[chalk](https://github.com/chalk/chalk)** - Terminal string styling and colors
- **[ora](https://github.com/sindresorhus/ora)** - Elegant terminal spinners
- **[gradient-string](https://github.com/bokub/gradient-string)** - Beautiful color gradients
- **[figlet](https://github.com/patorjk/figlet.js)** - ASCII art text generation

### Process Flow

1. 🎯 Interactive prompts collect user preferences
2. 🏗️ Executes `create-next-app` with optimal configuration
3. 📁 Creates enterprise-grade folder structure
4. 📝 Generates barrel export files for clean imports
5. 📦 Installs additional dependencies via Yarn
6. ✅ Provides success feedback and next steps

## 🛠️ Development

### Prerequisites

- Node.js 16+
- Yarn or npm

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd emirapp-cli
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Build the CLI**

   ```bash
   yarn build
   ```

4. **Link for local testing**

   ```bash
   npm link
   ```

5. **Test your changes**

   ```bash
   emirapp
   ```

6. **Unlink when done**
   ```bash
   npm unlink -g emirapp-cli
   ```

### Available Scripts

- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Run the compiled CLI
- `yarn prepare` - Pre-publish build step

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- All the open-source libraries that make this tool possible
- The developer community for feedback and contributions

---

**Made with ❤️ for the developer community**

_Happy coding! 🚀_
