# 💀 Skeleton Loading Components

Koleksi komponen skeleton loading untuk memberikan feedback visual yang baik saat halaman sedang loading, mengikuti konsep Next.js App Router.

## 🏗️ Struktur Komponen

```
components/skeletons/
├── FormPageSkeleton.tsx         # 💀 Skeleton untuk halaman form (add)
├── EditPageSkeleton.tsx         # 💀 Skeleton untuk halaman edit (loading data)
├── DashboardSkeleton.tsx        # 💀 Skeleton untuk halaman dashboard
├── DataTablePageSkeleton.tsx    # 💀 Skeleton untuk halaman list dengan DataTable
├── index.ts                     # 📤 Export semua skeleton components
└── README.md                    # 📚 Dokumentasi ini
```

## 🎯 Komponen Skeleton

### 1. FormPageSkeleton

Skeleton untuk halaman form seperti add/create pages.

**Props:**

- `title?: string` - Title yang ditampilkan (default: "Loading...")
- `description?: string` - Description yang ditampilkan
- `showBackButton?: boolean` - Apakah menampilkan back button (default: true)

**Features:**

- ✅ Header skeleton dengan back button
- ✅ Form card skeleton dengan semua field
- ✅ File upload area skeleton
- ✅ Action buttons skeleton
- ✅ Responsive design

### 2. EditPageSkeleton

Skeleton untuk halaman edit yang menunggu data dari API.

**Props:**

- `title?: string` - Title yang ditampilkan (default: "Loading...")
- `description?: string` - Description yang ditampilkan
- `showBackButton?: boolean` - Apakah menampilkan back button (default: true)

**Features:**

- ✅ Header skeleton dengan back button
- ✅ Loading spinner dengan animasi
- ✅ Progress indicator
- ✅ Loading text yang informatif
- ✅ Centered layout

### 3. DashboardSkeleton

Skeleton untuk halaman dashboard dengan layout yang kompleks.

**Features:**

- ✅ Greetings section skeleton
- ✅ Upcoming announcements & events (side by side)
- ✅ Quick actions section skeleton
- ✅ Recent activity section skeleton
- ✅ Responsive grid layout

### 4. DataTablePageSkeleton

Skeleton untuk halaman list dengan DataTable.

**Props:**

- `title?: string` - Title yang ditampilkan (default: "Loading...")
- `description?: string` - Description yang ditampilkan
- `showCalendar?: boolean` - Apakah menampilkan calendar (default: false)
- `showFilter?: boolean` - Apakah menampilkan filter (default: true)

**Features:**

- ✅ Header section skeleton
- ✅ Calendar section skeleton (optional)
- ✅ Filter section skeleton (optional)
- ✅ DataTable skeleton dengan header, body, footer
- ✅ Search bar skeleton
- ✅ Pagination skeleton

## 🚀 Next.js App Router Implementation

### Loading.tsx Files

```
app/(admin)/
├── dashboard/loading.tsx         # 💀 DashboardSkeleton
├── events/
│   ├── loading.tsx              # 💀 DataTablePageSkeleton (with calendar)
│   ├── add/loading.tsx          # 💀 FormPageSkeleton
│   └── edit/loading.tsx         # 💀 EditPageSkeleton
├── destinations/
│   ├── loading.tsx              # 💀 DataTablePageSkeleton
│   ├── add/loading.tsx          # 💀 FormPageSkeleton
│   └── edit/loading.tsx         # 💀 EditPageSkeleton
├── announcements/
│   ├── loading.tsx              # 💀 DataTablePageSkeleton
│   ├── add/loading.tsx          # 💀 FormPageSkeleton
│   └── edit/loading.tsx         # 💀 EditPageSkeleton
├── services/
│   ├── loading.tsx              # 💀 DataTablePageSkeleton
│   ├── add/loading.tsx          # 💀 FormPageSkeleton
│   └── edit/loading.tsx         # 💀 EditPageSkeleton
└── users/
    ├── loading.tsx              # 💀 DataTablePageSkeleton
    ├── add/loading.tsx          # 💀 FormPageSkeleton
    └── edit/loading.tsx         # 💀 EditPageSkeleton
```

## 🎨 Design Principles

### shadcn/ui Compliance

- ✅ **Consistent Spacing** - Menggunakan spacing yang konsisten
- ✅ **Skeleton Components** - Menggunakan Skeleton component dari shadcn/ui
- ✅ **Smooth Animations** - Animasi yang smooth dan tidak mengganggu
- ✅ **Proper Sizing** - Sizing yang sesuai dengan konten asli

### UX Best Practices

- ✅ **Realistic Layout** - Skeleton menyerupai layout asli
- ✅ **Progressive Loading** - Loading yang bertahap
- ✅ **Visual Feedback** - Memberikan feedback visual yang jelas
- ✅ **Accessibility** - Screen reader friendly

## 🔧 Usage Examples

### Dashboard Loading

```tsx
// app/(admin)/dashboard/loading.tsx
import { DashboardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
```

### Events List Loading

```tsx
// app/(admin)/events/loading.tsx
import { DataTablePageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <DataTablePageSkeleton
      title="Kelola Event"
      description="Kelola data event dan acara"
      showCalendar={true}
      showFilter={true}
    />
  );
}
```

### Add Page Loading

```tsx
// app/(admin)/events/add/loading.tsx
import { FormPageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <FormPageSkeleton
      title="Add New Event"
      description="Create a new event"
      showBackButton={true}
    />
  );
}
```

### Edit Page Loading

```tsx
// app/(admin)/events/edit/loading.tsx
import { EditPageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <EditPageSkeleton
      title="Edit Event"
      description="Loading event data..."
      showBackButton={true}
    />
  );
}
```

## 📊 Coverage

### ✅ Implemented Loading.tsx Files

- **Dashboard**: `/dashboard/loading.tsx`
- **Events**: `/events/loading.tsx`, `/events/add/loading.tsx`, `/events/edit/loading.tsx`
- **Destinations**: `/destinations/loading.tsx`, `/destinations/add/loading.tsx`, `/destinations/edit/loading.tsx`
- **Announcements**: `/announcements/loading.tsx`, `/announcements/add/loading.tsx`, `/announcements/edit/loading.tsx`
- **Services**: `/services/loading.tsx`, `/services/add/loading.tsx`, `/services/edit/loading.tsx`
- **Users**: `/users/loading.tsx`, `/users/add/loading.tsx`, `/users/edit/loading.tsx`

### 🎯 Total Files

- **17 Loading.tsx Files** - Complete coverage untuk semua halaman
- **4 Skeleton Components** - Reusable dan modular
- **Consistent UI** - Sama di semua halaman
- **Automatic Loading** - Next.js handles loading automatically

## 🚀 Benefits

### 1. **Automatic Loading States**

- ✅ Next.js otomatis menampilkan loading saat navigasi
- ✅ Tidak perlu manual state management
- ✅ Consistent loading experience

### 2. **Better UX**

- ✅ Immediate visual feedback
- ✅ No blank screens
- ✅ Smooth transitions
- ✅ Realistic skeleton layouts

### 3. **Clean Code**

- ✅ Separation of concerns
- ✅ Reusable skeleton components
- ✅ No loading logic di page components
- ✅ Better maintainability

### 4. **Performance**

- ✅ Faster perceived loading
- ✅ Better Core Web Vitals
- ✅ Improved user experience
- ✅ Reduced loading anxiety

## 🎨 Animation Details

### Skeleton Animation

- **Pulse Effect** - Subtle pulse animation pada skeleton elements
- **Staggered Loading** - Progressive reveal untuk better UX
- **Smooth Transitions** - Fade in/out transitions

### Loading Spinner

- **Brand Colors** - Menggunakan emerald-600 untuk consistency
- **Smooth Rotation** - 360° rotation dengan ease-in-out
- **Proper Sizing** - 12x12 untuk visibility yang baik

## 🔄 Migration Benefits

### Before (Loading Bundar)

```tsx
// ❌ Simple loading spinner
if (loading) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  );
}
```

### After (Skeleton Loading)

```tsx
// ✅ Realistic skeleton layout
// File: loading.tsx (automatic)
export default function Loading() {
  return <DashboardSkeleton />;
}
```

**Skeleton loading sekarang memberikan user experience yang jauh lebih baik dengan visual feedback yang realistic dan mengikuti best practices Next.js App Router!** 🚀
