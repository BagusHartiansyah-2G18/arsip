# Hooks Directory

This directory contains custom React hooks organized by category.

## Structure

```
hooks/
├── api/                       # API-related hooks
│   ├── use-api.ts            # Main API hook for data fetching
│   └── index.ts
├── auth/                      # Authentication hooks
│   ├── use-auth.ts           # Auth context hook
│   ├── use-auth-storage.ts   # Auth storage utilities
│   └── index.ts
├── navigation/                # Navigation hooks
│   ├── use-active-route.ts   # Active route detection
│   ├── use-navigation-handler.ts  # Navigation utilities
│   └── index.ts
└── index.ts                   # Re-export all hooks
```

## Categories

### 1. **API Hooks** (`hooks/api/`)

Hooks for API data fetching and state management.

#### `use-api.ts`

Generic hook for fetching data from API endpoints.

**Exports:**

- `useApi<T>(endpoint)` - Hook for data fetching with loading states
- `getSafeArrayData<T>(data)` - Utility to safely get array data
- Re-exports: `createItem`, `updateItem`, `deleteItem` from server actions

**Usage:**

```typescript
import { useApi } from "@/hooks/api";

function EventsPage() {
  const { data, loading, error, refetch } = useApi<Event>("events");

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <EventsList events={data} />;
}
```

**Returns:**

```typescript
{
  data: T[];           // Fetched data
  loading: boolean;    // Loading state
  error: string | null; // Error message
  refetch: () => void; // Function to refetch data
}
```

---

### 2. **Auth Hooks** (`hooks/auth/`)

Hooks for authentication and user session management.

#### `use-auth.ts`

Main authentication hook with login/logout functionality.

**Exports:**

- `useAuth()` - Hook for authentication operations

**Usage:**

```typescript
import { useAuth } from "@/hooks/auth";

function LoginPage() {
  const { user, login, logout, isLoading } = useAuth();

  const handleLogin = async (email, password) => {
    await login(email, password);
  };

  return <LoginForm onSubmit={handleLogin} loading={isLoading} />;
}
```

**Returns:**

```typescript
{
  user: User | null;                // Current user
  login: (email, password) => void; // Login function
  logout: () => void;               // Logout function
  isLoading: boolean;               // Loading state
}
```

#### `use-auth-storage.ts`

Local storage utilities for authentication data.

**Exports:**

- `authStorageUtils` - Object with storage utility functions
- `getUserDataFromStorage()` - Get user data from localStorage
- `saveUserDataToStorage(data)` - Save user data to localStorage
- `clearAuthStorage()` - Clear all auth data

**Usage:**

```typescript
import { authStorageUtils, getUserDataFromStorage } from "@/hooks/auth";

// Get stored user
const user = getUserDataFromStorage();

// Save user data
authStorageUtils.saveUser(userData);

// Clear all auth data
authStorageUtils.clearAll();
```

---

### 3. **Navigation Hooks** (`hooks/navigation/`)

Hooks for navigation and route management.

#### `use-active-route.ts`

Detects active route and provides route information.

**Exports:**

- `useActiveRoute()` - Hook for active route detection

**Usage:**

```typescript
import { useActiveRoute } from "@/hooks/navigation";

function Sidebar() {
  const { activeId, breadcrumbs, pathname } = useActiveRoute();

  return (
    <nav>
      {menuItems.map((item) => (
        <MenuItem key={item.id} active={activeId === item.id} />
      ))}
    </nav>
  );
}
```

**Returns:**

```typescript
{
  activeId: string;                // Active route ID (e.g., 'events', 'destinations')
  parentGroupId: string | null;    // Parent group ID if nested
  breadcrumbs: Breadcrumb[];       // Breadcrumb items
  pathname: string;                // Current pathname
}
```

#### `use-navigation-handler.ts`

Navigation utility functions.

**Exports:**

- `useNavigationHandler()` - Hook for navigation utilities

**Usage:**

```typescript
import { useNavigationHandler } from "@/hooks/navigation";

function MyComponent() {
  const { navigateTo, goBack } = useNavigationHandler();

  const handleClick = () => {
    navigateTo("/events");
  };

  return <Button onClick={goBack}>Back</Button>;
}
```

---

## Import Patterns

### ✅ Good - Import from category modules

```typescript
// API hooks
import { useApi } from "@/hooks/api";

// Auth hooks
import { useAuth, getUserDataFromStorage } from "@/hooks/auth";

// Navigation hooks
import { useActiveRoute, useNavigationHandler } from "@/hooks/navigation";

// Or import from root (all hooks)
import { useApi, useAuth, useActiveRoute } from "@/hooks";
```

### ❌ Avoid - Direct file imports

```typescript
// Don't do this
import { useApi } from "@/hooks/api/use-api";
import { useAuth } from "@/hooks/auth/use-auth";
```

---

## Guidelines

### Creating New Hooks:

1. **Determine category:**

   - API-related? → `hooks/api/`
   - Auth-related? → `hooks/auth/`
   - Navigation-related? → `hooks/navigation/`
   - New category? → Create new folder

2. **File naming:**

   - ✅ Use kebab-case: `use-my-hook.ts`
   - ✅ Prefix with `use-`: `use-form-state.ts`
   - ✅ Be descriptive: `use-debounced-value.ts`

3. **Export pattern:**

   ```typescript
   // In hooks/category/use-my-hook.ts
   export function useMyHook() {
     // Hook implementation
   }

   // In hooks/category/index.ts
   export * from "./use-my-hook";

   // In hooks/index.ts
   export * from "./category";
   ```

### Best Practices:

1. **Follow React hooks rules:**

   - Only call hooks at top level
   - Only call hooks from React components or custom hooks
   - Prefix with `use`

2. **Type everything:**

   ```typescript
   export function useApi<T>(endpoint: string): ApiResponse<T> {
     // Implementation
   }
   ```

3. **Document parameters and returns:**

   ```typescript
   /**
    * Custom hook for fetching data from API
    * @param endpoint - API endpoint to fetch from
    * @returns Object with data, loading, error, and refetch function
    */
   export function useApi<T>(endpoint: string) {}
   ```

4. **Handle cleanup:**

   ```typescript
   export function useSubscription() {
     useEffect(() => {
       const subscription = subscribe();
       return () => subscription.unsubscribe(); // Cleanup
     }, []);
   }
   ```

5. **Memoize where appropriate:**
   ```typescript
   export function useExpensiveComputation(data) {
     return useMemo(() => computeExpensive(data), [data]);
   }
   ```

---

## Common Hook Patterns

### Data Fetching:

```typescript
import { useApi } from "@/hooks/api";

const { data, loading, error, refetch } = useApi<Event>("events");
```

### Authentication:

```typescript
import { useAuth } from "@/hooks/auth";

const { user, login, logout, isLoading } = useAuth();
```

### Active Route:

```typescript
import { useActiveRoute } from "@/hooks/navigation";

const { activeId, breadcrumbs } = useActiveRoute();
```

### Navigation:

```typescript
import { useNavigationHandler } from "@/hooks/navigation";

const { navigateTo, goBack } = useNavigationHandler();
```
