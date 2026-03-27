# Jupiter Fast Finance - Launch Site

A modern, optimized React + TypeScript + Vite web application for Jupiter Fast Finance, providing home loans, insurance, and investment solutions.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Development

```sh
# Clone the repository
git clone https://github.com/kavish140/jupiter-finance-launch.git
cd jupiter-finance-launch

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080` with hot module replacement enabled.

### Environment Variables

Create a `.env.local` file for local development when needed:

```sh
VITE_ADMIN_PAGE_PASSWORD=your-admin-page-password
# optional alternate key (same value)
VITE_ADMIN_CREDENTIALS=your-admin-page-password
```

`VITE_ADMIN_PAGE_PASSWORD` is required to unlock the `/admin` page in the browser.

## 📦 Build & Deployment

```sh
# Production build
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn-ui (Radix UI)
- **Forms**: React Hook Form + Zod
- **State Management**: React Query 5.83
- **Routing**: React Router 6.30
- **Testing**: Vitest 3.2
- **Linting**: ESLint 9.32

## ⚡ Performance Optimizations

This project includes comprehensive performance optimizations:

- **Code Splitting**: Automatic and manual chunk splitting for vendor libraries
- **Lazy Loading**: Route-based code splitting with React.lazy()
- **CSS Optimization**: Tailwind CSS tree-shaking and code splitting
- **Build Optimization**: Terser minification with aggressive compression
- **HTML Enhancements**: Preconnect, DNS prefetch, and optimized meta tags
- **TypeScript**: Strict mode with incremental compilation

See [OPTIMIZATION.md](./OPTIMIZATION.md) for detailed optimization documentation.

## 📁 Project Structure

```
src/
├── components/        # Reusable React components
│   ├── ui/           # shadcn-ui components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   └── ...
├── pages/            # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── assets/           # Static assets
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration with optimizations
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules and settings
- `.npmrc` - NPM package management settings

## 🌐 Features

- Modern, responsive design
- SEO-optimized metadata
- Social sharing meta tags (OG, Twitter Card)
- Dark mode support
- Accessible components (WCAG compliance)
- Mobile-first approach

## 📱 Contact

- **Phone**: 9757190200
- **Website**: https://jupiterfastfinance.com

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📖 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn-ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

