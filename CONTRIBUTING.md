# Contributing to Dhanman Mobile

This document outlines the development workflow, project structure, and coding standards for the Dhanman Mobile React Native application.

## Project Structure

The project follows an enterprise-grade, feature-based architecture:

```
src/
├── app/                    # Global app configuration
│   ├── config.ts          # Central configuration management
│   ├── store.ts           # Redux Toolkit store setup
│   └── sentry.ts          # Error monitoring setup
├── api/                   # API layer and clients
│   ├── commonApi.ts       # Centralized API client with config
│   ├── commonApi/         # Common API endpoints
│   ├── sales/             # Sales-specific API endpoints
│   ├── purchase/          # Purchase-specific API endpoints
│   └── myHome/            # MyHome-specific API endpoints
├── features/              # Feature-based modules
├── components/            # Reusable UI components
│   └── shared/            # Shared components across features
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── screens/               # Screen components (legacy, being migrated)
```

## Environment Management

The app uses `react-native-config` for environment-specific configurations:

- **QA Environment**: `.env.qa` - Used for quality assurance testing
- **Production Environment**: `.env.prod` - Used for production releases

### Available Environment Variables

- `API_BASE_URL` - Main API base URL
- `SALES_API_BASE_URL` - Sales service API URL
- `PURCHASE_API_BASE_URL` - Purchase service API URL
- `MYHOME_API_BASE_URL` - MyHome service API URL
- `SENTRY_DSN` - Sentry error monitoring DSN
- `APP_ENV` - Current environment (qa/production)
- `DEBUG_MODE` - Enable/disable debug logging
- `API_TIMEOUT` - API request timeout in milliseconds
- `ENABLE_LOGGING` - Enable/disable application logging
- `ENABLE_CRASH_REPORTING` - Enable/disable crash reporting

## Development Workflow

### 1. Setup

```bash
# Install dependencies
npm install

# Install Husky hooks
npm run prepare
```

### 2. Code Quality

The project enforces code quality through:

- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks
- **TypeScript** - Type safety for new code

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Run tests
npm run test
```

### 3. API Layer

All API calls should use the centralized API clients from `src/api/commonApi.ts`:

```typescript
import { fetcher, commonApiClient, salesApiClient } from '../api/commonApi';

// Use appropriate client based on service
const data = await fetcher('/endpoint', salesApiClient);
```

### 4. State Management

The app uses Redux Toolkit for state management. Store is configured in `src/app/store.ts`.

### 5. Error Monitoring

Sentry is integrated for error monitoring. Use the utilities from `src/app/sentry.ts`:

```typescript
import { captureException, addBreadcrumb } from '../app/sentry';

// Capture errors
captureException(error, { context: 'user_action' });

// Add breadcrumbs for debugging
addBreadcrumb('User clicked submit button', 'user_interaction');
```

## Coding Standards

### TypeScript

- All new files should be written in TypeScript
- Use proper type definitions from `src/types/`
- Avoid `any` type - use proper interfaces or union types

### Component Structure

- Use functional components with hooks
- Follow React Native best practices
- Use StyleSheet for styling (avoid inline styles)
- Implement proper error boundaries

### Naming Conventions

- **Files**: camelCase for files, PascalCase for components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive names

### Date Handling

- Use `date-fns` instead of `moment` for date operations
- Utilize utilities from `src/utils/dateUtils.ts`

### API Guidelines

- Use centralized API clients
- Implement proper error handling
- Add loading states for better UX
- Use TypeScript interfaces for API responses

## Testing

- Write tests for new features and utilities
- Use Jest with React Native testing utilities
- Mock external dependencies appropriately
- Maintain test coverage for critical paths

## Pre-commit Hooks

The following checks run automatically before each commit:

1. ESLint fixes applied automatically
2. Code formatted with Prettier
3. Tests executed

## Environment Switching

To switch between environments:

1. Update the environment file being used in your build process
2. Ensure proper configuration in your CI/CD pipeline
3. Test environment-specific features thoroughly

## Legacy Code Migration

When working with legacy code:

1. Gradually migrate JavaScript files to TypeScript
2. Update import statements to use new API structure
3. Replace `moment` usage with `date-fns`
4. Move components to feature-based structure when refactoring
5. Ensure backward compatibility during transitions

## Best Practices

1. **Security**: Never commit sensitive data or credentials
2. **Performance**: Optimize images and reduce bundle size
3. **Accessibility**: Follow React Native accessibility guidelines
4. **Documentation**: Update documentation when adding new features
5. **Code Review**: All changes should go through code review process

## Getting Help

- Check existing documentation and code examples
- Use TypeScript compiler for type-related issues
- Review ESLint warnings for code quality improvements
- Test changes thoroughly across different environments