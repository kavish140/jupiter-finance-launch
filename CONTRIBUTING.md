# Contributing Guide

Thank you for your interest in contributing to Jupiter Finance Launch! This guide will help you get started.

## Code of Conduct

- Be respectful and constructive in your interactions
- Focus on code quality and best practices
- Help others learn and grow

## Getting Started

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/jupiter-finance-launch.git
cd jupiter-finance-launch
git remote add upstream https://github.com/kavish140/jupiter-finance-launch.git
```

### Setup Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080 in your browser
```

## Development Workflow

### Create a Feature Branch

```bash
# Update main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Coding Standards

#### TypeScript
- Enable strict mode in `tsconfig.json`
- Always type function parameters and return values
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

#### React Components
- Use functional components with hooks
- Keep components focused and single-responsibility
- Use descriptive names for components and props
- Add JSDoc comments for complex components

Example:
```typescript
/**
 * Contact form component for customer inquiries
 * @param onSubmit - Callback function when form is submitted
 */
interface ContactFormProps {
  onSubmit: (data: ContactData) => Promise<void>;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  // Implementation
};
```

#### Styling
- Use Tailwind CSS classes for styling
- Follow mobile-first approach
- Use custom components from `src/components/ui/`
- Avoid inline styles

#### Performance
- Keep components lazy-loaded where possible
- Minimize bundle size impact
- Use React Query for data fetching
- Implement proper error boundaries

### Testing

Write tests for new features:

```typescript
// src/components/__tests__/Button.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
npm test
npm run test:watch
```

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Files should be automatically formatted
# If needed, use your IDE's formatting tools
```

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Changes that don't affect code meaning
- `refactor`: Code change without feature or bug fix
- `perf`: Improvement in performance
- `test`: Adding or updating tests
- `chore`: Changes to build process or dependencies

### Examples

```bash
git commit -m "feat: add contact form validation"
git commit -m "fix: resolve navigation menu mobile display"
git commit -m "docs: update deployment guide"
git commit -m "refactor: simplify hero section component"
git commit -m "perf: optimize image loading with lazy loading"
```

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git pull upstream main
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Test locally**
   ```bash
   npm run preview
   # Visit http://localhost:4173
   ```

### PR Template

```markdown
## Description
Brief description of changes

## Related Issue
Closes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how to test these changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Build successful
- [ ] No console errors/warnings
```

### PR Review Process

- A maintainer will review your PR
- Request changes if needed
- Once approved, we'll merge your PR
- Your contribution will be celebrated! 🎉

## File Structure Guidelines

When adding new components:

```
src/components/
├── MyComponent.tsx          # Component
├── MyComponent.css          # Styles (if needed)
└── __tests__/
    └── MyComponent.test.ts  # Tests
```

## Documentation

Update relevant docs when:
- Adding new features
- Changing API or interfaces
- Updating build process
- Changing deployment process

Key docs:
- `README.md` - Project overview
- `OPTIMIZATION.md` - Performance details
- `DEPLOYMENT.md` - Deployment instructions

## Performance Considerations

When adding features:

1. **Check bundle impact**
   ```bash
   npm run build
   # Check the bundle size in output
   ```

2. **Minimize dependencies**
   - Reuse existing libraries
   - Consider if new dependency is necessary

3. **Optimize imports**
   ```typescript
   // Good - tree-shakeable
   import { Button } from '@/components/ui/button';

   // Avoid - imports everything
   import * as components from '@/components';
   ```

4. **Use lazy loading for routes**
   ```typescript
   const MyPage = lazy(() => import('./pages/MyPage'));
   ```

## Getting Help

- **Questions**: Open a discussion or issue
- **Bug Reports**: Create an issue with reproduction steps
- **Feature Requests**: Create an issue with use case
- **Documentation**: Clarify in README or docs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project better. Thank you for your support! 🙏

