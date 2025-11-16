# Components Directory

This directory contains **reusable, generic UI components** that can be used across different features.

## Structure

```
components/
├── common/              # Shared components across features
│   ├── FormHeader.tsx
│   └── FormActions.tsx
├── data-table/          # Generic table components
│   ├── DataTableActionColumn.tsx
│   ├── DataTableBody.tsx
│   └── ...
├── layout/              # Layout components
│   ├── DashboardLayout.tsx
│   └── sidebar/
│       ├── Sidebar.tsx
│       └── ...
├── skeletons/           # Loading state components
│   ├── DashboardSkeleton.tsx
│   └── ...
└── ui/                  # Base UI components (shadcn/ui)
    ├── button.tsx
    ├── input.tsx
    └── ...
```

## Component Categories

### 1. **Common Components** (`components/common`)
Shared components used across multiple features:
- `FormHeader` - Standardized form header with back button
- `FormActions` - Standardized form action buttons (submit, cancel)

### 2. **Data Table** (`components/data-table`)
Generic, reusable table components:
- `DataTableActionColumn` - Action buttons column
- `DataTableBody` - Table body
- `DataTableHeader` - Table header
- `DataTablePagination` - Pagination controls
- `DataTableToolbar` - Toolbar with filters

### 3. **Layout** (`components/layout`)
Application layout components:
- `DashboardLayout` - Main dashboard layout wrapper
- `sidebar/` - Sidebar navigation components

### 4. **Skeletons** (`components/skeletons`)
Loading state placeholders:
- `DashboardSkeleton` - Dashboard loading state
- `DataTablePageSkeleton` - Table page loading state
- `FormPageSkeleton` - Form page loading state

### 5. **UI Components** (`components/ui`)
Base UI primitives (shadcn/ui):
- Form elements (button, input, select, etc.)
- Layout primitives (card, dialog, sheet, etc.)
- Feedback components (toast, alert, etc.)

## Usage

### Importing Components

```typescript
// Common components
import { FormHeader, FormActions } from '@/components/common';

// Layout components
import { DashboardLayout } from '@/components/layout';

// UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

## Guidelines

### When to add a component here:

1. **Reusability** - Can be used in multiple features
2. **Generic** - Not tied to specific business logic
3. **Presentational** - Focuses on UI, not business logic
4. **Shareable** - Makes sense to share across the application

### When NOT to add a component here:

1. **Feature-specific** - Only used in one feature → Put in `features/{feature}/components`
2. **Business logic** - Contains domain logic → Put in `features/{feature}/components`
3. **One-off** - Used only once → Consider if it needs to be a component

## Best Practices

1. **Keep components pure** - Avoid side effects
2. **Make them composable** - Small, focused components
3. **Document props** - Use TypeScript interfaces
4. **Follow naming conventions** - PascalCase for components
5. **Export through index** - Use barrel exports where appropriate

