# API Functions Documentation

This directory contains organized API functions based on the Bruno API collection. Each file corresponds to a specific route group and provides type-safe functions for interacting with the backend API.

## Structure

```
src/
├── lib/api/          # API functions
│   ├── index.ts      # Main export file
│   ├── config.ts     # API configuration (base URL, tokens, headers)
│   ├── auth.ts       # Authentication (login, register, token management)
│   ├── dashboard.ts  # Dashboard data and analytics
│   ├── events.ts     # Event management (CRUD operations)
│   ├── services.ts   # Service management (CRUD operations)
│   ├── announcements.ts # Announcement management (CRUD operations)
│   ├── settings.ts   # Settings management (CRUD operations)
│   ├── files.ts      # File upload/download operations
│   └── README.md     # This documentation
├── hooks/            # React hooks
│   ├── useAuth.ts    # Authentication hook
│   └── useAuthStorage.ts # Authentication storage utilities
└── types/            # TypeScript types
    └── forms.ts      # Form types and validation schemas
```

## Usage

### Import specific functions

```typescript
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/api/events";
import { login, register } from "@/lib/api/auth";
import { getDashboardData } from "@/lib/api/dashboard";
import { useAuth } from "@/hooks/useAuth";
import { EventFormDataMultipart } from "@/types/forms";
```

### Import all functions

```typescript
import * as API from "@/lib/api";
// or
import { getEvents, login, getDashboardData } from "@/lib/api";
import { useAuth, useAuthStorage } from "@/hooks/useAuth";
import { EventFormDataMultipart, formValidationSchemas } from "@/types/forms";
```

## API Endpoints

### Authentication (`auth.ts`)

- `login(credentials)` - User login
- `register(userData)` - User registration
- `verifyToken(token)` - Verify JWT token
- `logout(token)` - User logout
- `refreshToken(refreshToken)` - Refresh JWT token

### Events (`events.ts`)

- `getEvents(params?)` - Get all events with optional filters
- `getEventById(id)` - Get single event by ID
- `createEvent(eventData)` - Create new event
- `updateEvent(id, eventData)` - Update existing event
- `deleteEvent(id)` - Delete event

### Services (`services.ts`)

- `getServices(params?)` - Get all services with optional filters
- `getServiceById(id)` - Get single service by ID
- `createService(serviceData)` - Create new service
- `updateService(id, serviceData)` - Update existing service
- `deleteService(id)` - Delete service

### Announcements (`announcements.ts`)

- `getAnnouncements(params?)` - Get all announcements with optional filters
- `getAnnouncementById(id)` - Get single announcement by ID
- `getAnnouncementBySlug(slug)` - Get announcement by slug
- `createAnnouncement(announcementData)` - Create new announcement
- `updateAnnouncement(id, announcementData)` - Update existing announcement
- `deleteAnnouncement(id)` - Delete announcement

### Settings (`settings.ts`)

- `getSettings(params?)` - Get all settings with optional filters
- `getSettingById(id)` - Get single setting by ID
- `getCurrentSetting()` - Get current/active setting
- `createSetting(settingData)` - Create new setting
- `updateSetting(id, settingData)` - Update existing setting
- `deleteSetting(id)` - Delete setting

### Dashboard (`dashboard.ts`)

- `getDashboardData()` - Get main dashboard data
- `getDashboardStats()` - Get dashboard statistics
- `getDashboardAnalytics(params?)` - Get dashboard analytics with date filters

### Files (`files.ts`)

- `getFile(folderName, fileName)` - Download file as blob
- `getFileUrl(folderName, fileName)` - Get direct file URL
- `uploadFile(file, folderName?)` - Upload file
- `deleteFile(folderName, fileName)` - Delete file
- `listFiles(folderName)` - List files in folder
- `getFileInfo(folderName, fileName)` - Get file metadata

## Configuration

All API functions use centralized configuration from `config.ts`:

- Base URL: `http://172.222.2.103:1907` (configurable via `getApiBaseUrl()`)
- Authentication: Bearer token (from environment variable `API_TOKEN` via `getApiToken()`)
- Headers: Automatic header management via `getDefaultHeaders()` and `getMultipartHeaders()`
- Upload URLs: Get upload file URLs via `getUploadedFile(folder, file)`

### Environment-based Configuration

You can modify the `config.ts` file to support different environments:

```typescript
// In config.ts
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;
};
```

### Headers Management

```typescript
import { getDefaultHeaders, getMultipartHeaders } from "@/lib/api";

// For JSON requests
const jsonHeaders = getDefaultHeaders(true); // Include auth
const jsonHeadersNoAuth = getDefaultHeaders(false); // No auth

// For file uploads
const multipartHeaders = getMultipartHeaders(true); // Include auth
const multipartHeadersNoAuth = getMultipartHeaders(false); // No auth
```

## Error Handling

All functions include comprehensive error handling and logging:

- Console logging for debugging
- Proper error propagation
- HTTP status code checking
- Type-safe error responses

## Form Data Support

Functions that handle file uploads (create/update operations) accept `FormData` objects to support multipart form submissions, matching the Bruno API collection structure.

## Authentication & Storage

### Authentication Hook

```typescript
import { useAuth } from "@/hooks/useAuth";

function LoginComponent() {
  const { login, register, isAuthenticated, user, isLoading, error } =
    useAuth();

  const handleLogin = async (credentials) => {
    await login(credentials);
    // User is now logged in and data is stored in localStorage
  };
}
```

### Storage Utilities

```typescript
import { useAuthStorage, authStorageUtils } from "@/hooks/useAuthStorage";

// Using hooks (client-side)
const { token, user, setToken, clearAuthData } = useAuthStorage();

// Using utilities (server-side compatible)
const isLoggedIn = authStorageUtils.isAuthenticated();
const currentUser = authStorageUtils.getUser();
```

## Type Safety

All form data is fully typed based on the Bruno API collection:

```typescript
import { EventFormDataMultipart, formValidationSchemas } from "@/types/forms";

// Type-safe form data
const eventData: EventFormDataMultipart = {
  title: "My Event",
  description: "Event description",
  start_date: "2024-01-01", // Must be YYYY-MM-DD format
  end_date: "2024-01-02",
  url_location: "https://example.com",
  banner: fileObject, // Must be File object
};

// Form validation schemas
const eventSchema = formValidationSchemas.event;
```

## Backward Compatibility

The existing `server-actions.ts` file has been updated to re-export all new API functions while maintaining backward compatibility with existing code.
