# React Components

This directory contains reusable React components organized by their usage context.

## Structure:

### /admin
Administrative interface components:
- Dashboard widgets
- Article review cards
- Statistics displays
- Admin navigation
- Settings forms

### /public
Public-facing components:
- Article cards
- Navigation header
- Footer
- Search bar
- Category filters

### /shared
Components used in both admin and public:
- Loading spinners
- Error boundaries
- Modals
- Alerts
- Form inputs

## Component Guidelines:

1. **Naming Convention**
   - PascalCase for component files
   - Index.tsx for main component
   - Component.module.css for styles

2. **Structure Example**
```
components/
├── admin/
│   └── ArticleReview/
│       ├── index.tsx
│       ├── ArticleReview.module.css
│       └── ArticleReview.test.tsx
```

3. **Best Practices**
   - Keep components pure and focused
   - Use TypeScript interfaces for props
   - Include JSDoc comments
   - Write unit tests
   - Use CSS modules for styling

## Migration Note:
As the app grows, extract reusable parts from pages into these component directories.