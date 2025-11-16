// import * as React from 'react';
// import { MoreHorizontal } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { ColumnDef } from '@tanstack/react-table';

// interface DataTableActionColumnProps<TData> {
//     // eslint-disable-next-line no-unused-vars
//     onView?: (item: TData) => void;
//     // eslint-disable-next-line no-unused-vars
//     onEdit?: (item: TData) => void;
//     // eslint-disable-next-line no-unused-vars
//     onDelete?: (item: TData) => void;
//     // eslint-disable-next-line no-unused-vars
//     setItemToDelete: (item: TData | null) => void;
//     // eslint-disable-next-line no-unused-vars
//     setDeleteModalOpened: (open: boolean) => void;
// }

// export function createActionColumn<TData>({
//     onView,
//     onEdit,
//     onDelete,
//     setItemToDelete,
//     setDeleteModalOpened,
// }: DataTableActionColumnProps<TData>): ColumnDef<TData> | null {
//     if (!onView && !onEdit && !onDelete) return null;

//     return {
//         id: 'actions',
//         header: 'Aksi',
//         enableHiding: false,
//         enableSorting: false,
//         cell: ({ row }) => {
//             const item = row.original;

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
//                         {onView && (
//                             <DropdownMenuItem onClick={() => onView(item)} className="text-xs">
//                                 Lihat
//                             </DropdownMenuItem>
//                         )}
//                         {onEdit && (
//                             <DropdownMenuItem onClick={() => onEdit(item)} className="text-xs">
//                                 Edit
//                             </DropdownMenuItem>
//                         )}
//                         {onDelete && (
//                             <>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem
//                                     onClick={() => {
//                                         setItemToDelete(item);
//                                         setDeleteModalOpened(true);
//                                     }}
//                                     className="text-red-600 text-xs"
//                                 >
//                                     Hapus
//                                 </DropdownMenuItem>
//                             </>
//                         )}
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             );
//         },
//     };
// }


import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';

interface CustomAction<TData> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: TData) => void;
  variant?: 'default' | 'danger' | 'success';
}

interface DataTableActionColumnProps<TData> {
  onView?: (item: TData) => void;
  onEdit?: (item: TData) => void;
  onDelete?: (item: TData) => void;
  setItemToDelete: (item: TData | null) => void;
  setDeleteModalOpened: (open: boolean) => void;
  customActions?: CustomAction<TData>[];
}

export function createActionColumn<TData>({
  onView,
  onEdit,
  onDelete,
  setItemToDelete,
  setDeleteModalOpened,
  customActions = [],
}: DataTableActionColumnProps<TData>): ColumnDef<TData> | null {
  const hasAnyAction = onView || onEdit || onDelete || customActions.length > 0;
  if (!hasAnyAction) return null;

  return {
    id: 'actions',
    header: 'Aksi',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>

            {onView && (
              <DropdownMenuItem onClick={() => onView(item)} className="text-xs">
                Lihat
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(item)} className="text-xs">
                Edit
              </DropdownMenuItem>
            )}

            {customActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => action.onClick(item)}
                className={`text-xs ${
                  action.variant === 'danger'
                    ? 'text-red-600'
                    : action.variant === 'success'
                    ? 'text-green-600'
                    : ''
                }`}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            ))}

            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setItemToDelete(item);
                    setDeleteModalOpened(true);
                  }}
                  className="text-red-600 text-xs"
                >
                  Hapus
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}