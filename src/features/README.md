# Features Directory

This directory contains **feature modules** - domain-specific, business logic components organized by features.

## Structure

Each feature module follows this structure:

```
features/
├── {feature-name}/
│   ├── components/          # Feature-specific components
│   │   ├── Form.tsx
│   │   └── ...
│   ├── hooks/              # Feature-specific hooks (optional)
│   └── index.ts            # Public exports
```

## Features

### 1. **Dashboard** (`features/dashboard`)

- Main dashboard components
- Visitor cards and analytics
- Dashboard header

### 2. **Events** (`features/events`)

- Event management forms
- Event calendar components
- Event details dialog

### 3. **Destinations** (`features/destinations`)

- Destination management forms
- Destination-specific components

### 4. **Announcements** (`features/announcements`)

- Announcement management forms

### 5. **Services** (`features/services`)

- Service management forms

### 6. **Categories** (`features/categories`)

- Category destination forms

### 7. **Flows** (`features/flows`)

- Flow destination forms

### 8. **Users** (`features/users`)

- User management forms

### 9. **Settings** (`features/settings`)

- Settings management forms

### 10. **Auth** (`features/auth`)

- Authentication components
- Protected route wrapper

## Usage

Import from the feature module's index:

```typescript
// ✅ Good - using feature exports
import { EventForm } from "@/features/events";
import { DestinationForm } from "@/features/destinations";

// ❌ Bad - direct component import
import { EventForm } from "@/features/events/components/EventForm";
```

## Guidelines

1. **Features are domain-specific** - Each feature represents a business domain
2. **Self-contained** - Features should be independent where possible
3. **Business logic** - Features contain business logic and state management
4. **Reusable components** - Shared UI components live in `@/components`

## Shared Components

Common components used across features should be in:

- `@/components/common` - Shared form components (FormHeader, FormActions)
- `@/components/ui` - Base UI components (buttons, inputs, etc.)
- `@/components/layout` - Layout components (sidebar, etc.)
