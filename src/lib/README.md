# Lib Directory

This directory contains utility functions, API clients, error handlers, and other shared libraries.

## Structure

```
lib/
├── api/                  # API client functions
│   ├── auth.ts          # Authentication API
│   ├── events.ts        # Events API
│   ├── destinations.ts  # Destinations API
│   ├── config.ts        # API configuration
│   └── ...
├── utils/               # Utility functions
│   ├── date.ts         # Date formatting and manipulation
│   └── index.ts
├── errors/             # Error handling
│   ├── handler.ts      # Error handler utilities
│   └── index.ts
├── actions/            # Server actions
│   ├── api.ts         # API server actions (fetchData, createItem, etc.)
│   └── index.ts
├── constants/          # Constants and routes
│   ├── routes.ts      # API routes configuration
│   └── index.ts
└── utils.ts           # General utilities
```

## Categories

### 1. **API** (`lib/api/`)

API client functions for communicating with the backend.

**Files:**

- `auth.ts` - Authentication (login, register, logout)
- `events.ts` - Events CRUD operations
- `destinations.ts` - Destinations CRUD operations
- `announcements.ts` - Announcements CRUD operations
- `services.ts` - Services CRUD operations
- `categories-destinations.ts` - Category destinations CRUD
- `flow-destinations.ts` - Flow destinations CRUD
- `settings.ts` - Settings CRUD operations
- `dashboard.ts` - Dashboard data
- `wilayah.ts` - Region data (Kecamatan, Desa)
- `files.ts` - File upload utilities
- `config.ts` - API base URL and token management
- `utils.ts` - API utility functions

**Usage:**

```typescript
import { login, register } from "@/lib/api";
import { getEvents, createEvent } from "@/lib/api";
```

### 2. **Utils** (`lib/utils/`)

General utility functions organized by category.

**Files:**

- `date.ts` - Date formatting and manipulation utilities
- `classnames.ts` - CSS class name utilities (cn function)
- `crypto.ts` - Encryption and hashing utilities
- `string.ts` - String manipulation utilities

**Usage:**

```typescript
// Import from @/lib/utils (recommended - imports all utils)
import { formatDate, cn, hashString, getUserInitials } from "@/lib/utils";

// Or import from specific files
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/classnames";
import { hashString } from "@/lib/utils/crypto";
import { getUserInitials, slugify } from "@/lib/utils/string";
```

**Available Functions:**

**Date Utils:**

- `formatDate()` - Format dates
- `isDateInPast()` - Check if date is in the past
- `getDaysBetween()` - Calculate days between dates
- And more...

**Classnames Utils:**

- `cn()` - Merge Tailwind CSS classes

**Crypto Utils:**

- `hashString()` - Simple string hashing

**String Utils:**

- `getUserInitials()` - Get user initials from name
- `capitalize()` - Capitalize first letter
- `truncate()` - Truncate string to max length
- `slugify()` - Convert string to URL-friendly slug

### 3. **Errors** (`lib/errors/`)

Error handling utilities.

**Files:**

- `handler.ts` - Error handler with auth error handling

**Usage:**

```typescript
import { throwIfStatusError } from "@/lib/errors";

try {
  const result = await apiCall();
  throwIfStatusError(result);
} catch (error) {
  // Handle error
}
```

### 4. **Actions** (`lib/actions/`)

Server actions for data fetching and mutations.

**Files:**

- `api.ts` - Generic CRUD server actions

**Exports:**

- `fetchData(endpoint, token)` - GET request
- `createItem(endpoint, data, token)` - POST request
- `updateItem(endpoint, id, data, token)` - PUT request
- `deleteItem(endpoint, id, token)` - DELETE request

**Usage:**

```typescript
import { fetchData, createItem } from "@/lib/actions";

const data = await fetchData("/api/events", token);
const newEvent = await createItem("/api/events", formData, token);
```

### 5. **Constants** (`lib/constants/`)

Application constants and configuration.

**Files:**

- `routes.ts` - API route constants

**Exports:**

- `API_ROUTES` - Object with all API endpoints
- `buildRouteWithQuery()` - Helper to build routes with query params

**Usage:**

```typescript
import { API_ROUTES, buildRouteWithQuery } from "@/lib/constants";

const endpoint = buildRouteWithQuery(API_ROUTES.EVENT, { page: 1, limit: 10 });
```

## Import Patterns

### ✅ Good - Import from organized modules

```typescript
// API functions
import { login, register } from "@/lib/api";
import { getEvents } from "@/lib/api";

// Utils
import { formatDate } from "@/lib/utils";

// Errors
import { throwIfStatusError } from "@/lib/errors";

// Actions
import { fetchData, createItem } from "@/lib/actions";

// Constants
import { API_ROUTES } from "@/lib/constants";
```

### ❌ Avoid - Direct file imports

```typescript
// Don't do this
import { formatDate } from "@/lib/utils/date";
import { throwIfStatusError } from "@/lib/errors/handler";
```

## Guidelines

### Adding New Utilities:

1. **Date/Time utilities** → `lib/utils/date.ts`
2. **String utilities** → `lib/utils/string.ts`
3. **CSS/Classname utilities** → `lib/utils/classnames.ts`
4. **Encryption/Hashing** → `lib/utils/crypto.ts`
5. **Validation utilities** → `lib/utils/validation.ts` (create if needed)
6. **Number/Math utilities** → `lib/utils/number.ts` (create if needed)
7. **API clients** → `lib/api/{domain}.ts`
8. **Constants** → `lib/constants/{name}.ts`

### File Naming:

- ✅ Use kebab-case: `date-utils.ts`, `api-client.ts`
- ✅ Be descriptive: `error-handler.ts`, not `handler.ts`
- ✅ Group by domain: `events.ts`, `destinations.ts` in `api/`

### Best Practices:

1. **Export through index.ts** - Use barrel exports
2. **Keep files focused** - One responsibility per file
3. **Document functions** - Use JSDoc comments
4. **Handle errors** - Use `throwIfStatusError` for API responses
5. **Type everything** - Full TypeScript coverage
