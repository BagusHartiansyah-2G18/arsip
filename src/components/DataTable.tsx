'use client';

import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import {
    createActionColumn,
    createRowNumberColumn,
    DataTableBody,
    DataTableDeleteModal,
    DataTableHeader,
    DataTablePagination,
    DataTableToolbar
} from '@/components/data-table/DataTable.tsx';
import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'list' | 'grid';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading?: boolean;
    title?: string;
    searchPlaceholder?: string;
    addButtonText?: string;
    onAdd?: () => void;
    // eslint-disable-next-line no-unused-vars
    onEdit?: (item: TData) => void;
    // eslint-disable-next-line no-unused-vars
    onDelete?: (item: TData) => void;
    // eslint-disable-next-line no-unused-vars
    onView?: (item: TData) => void;
    deleteConfirmTitle?: string;
    // eslint-disable-next-line no-unused-vars
    deleteConfirmMessage?: (item: TData) => string;
    refresh?: () => void;
    onOpenFilter?: () => void;
    filterDrawer?: React.ReactNode;
    searchKey?: string; // Key to search in
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    emptyStateActionLabel?: string;
    emptyStateOnAction?: () => void;
    // Grid view props
    enableGridView?: boolean;
    // eslint-disable-next-line no-unused-vars
    gridViewComponent?: (item: TData) => React.ReactNode;
    defaultViewMode?: ViewMode;
    customActions?: {
        label: string;
        icon?: React.ReactNode;
        onClick: (item: TData) => void;
        variant?: 'default' | 'danger' | 'success'; // opsional styling
        }[];

}

export function DataTable<TData, TValue>({
    columns,
    data,
    loading = false,
    title,
    searchPlaceholder = 'Cari...',
    addButtonText = 'Tambah',
    onAdd,
    onEdit,
    onDelete,
    onView,
    deleteConfirmTitle = 'Konfirmasi Hapus',
    deleteConfirmMessage = () => 'Apakah Anda yakin ingin menghapus item ini?',
    onOpenFilter,
    filterDrawer,
    searchKey = 'title', // Default search key
    emptyStateTitle = 'Tidak ada data',
    emptyStateDescription = 'Belum ada data yang tersedia. Mulai dengan menambahkan data baru.',
    emptyStateActionLabel,
    emptyStateOnAction,
    refresh,
    enableGridView = false,
    gridViewComponent,
    defaultViewMode = 'list',
    customActions,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [deleteModalOpened, setDeleteModalOpened] = React.useState(false);
    const [itemToDelete, setItemToDelete] = React.useState<TData | null>(null);
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);
    const [deleteError, setDeleteError] = React.useState(false);
    const [viewMode, setViewMode] = React.useState<ViewMode>(defaultViewMode);

    // Ensure modal resets to confirm state when opened
    const setDeleteModalOpenedWithReset = React.useCallback((open: boolean) => {
        if (open) {
            setDeleteLoading(false);
            setDeleteSuccess(false);
            setDeleteError(false);
        }
        setDeleteModalOpened(open);
    }, []);

    // Create base columns with row number
    const baseColumns = React.useMemo(() => {
        const rowNumberColumn = createRowNumberColumn<TData>();
        return [rowNumberColumn, ...columns];
    }, [columns]);

    // Create action column if needed
    const actionColumn = React.useMemo(() => {
        return createActionColumn<TData>({
            onView,
            onEdit,
            onDelete,
            setItemToDelete,
            setDeleteModalOpened: setDeleteModalOpenedWithReset,
            customActions
        });
    }, [onView, onEdit, onDelete, setDeleteModalOpenedWithReset]);

    // Combine all columns
    const finalColumns = React.useMemo(() => {
        return actionColumn ? [...baseColumns, actionColumn] : baseColumns;
    }, [baseColumns, actionColumn]);

    const table = useReactTable({
        data,
        columns: finalColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // Get the first available column for search if searchKey doesn't exist
    const searchColumn = React.useMemo(() => {
        const allColumns = table.getAllColumns();
        const specifiedColumn = allColumns.find(col => col.id === searchKey);
        if (specifiedColumn) {
            return specifiedColumn;
        }

        const filterableColumns = allColumns.filter(col => col.getCanFilter());
        return filterableColumns.length > 0 ? filterableColumns[0] : null;

    }, [table, searchKey]);

    const closeDeleteModal = () => {
        setDeleteModalOpened(false);
        setItemToDelete(null);
        setDeleteLoading(false);
        setDeleteSuccess(false);
        setDeleteError(false);
    };

    const handleDelete = async () => {
        if (itemToDelete && onDelete) {
            setDeleteLoading(true);
            try {
                await onDelete(itemToDelete);
                setDeleteSuccess(true);
                setDeleteLoading(false);
                if (refresh) refresh();
                // eslint-disable-next-line no-unused-vars
            } catch (_error) {
                setDeleteError(true);
                setDeleteLoading(false);
                if (refresh) refresh();
            }
        }
    };

    // Render grid view
    const renderGridView = () => {
        if (!gridViewComponent) return null;

        // Get paginated data for grid view
        const paginatedData = table.getRowModel().rows.map(row => row.original);

        if (loading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="animate-pulse h-80">
                            <div className="bg-gray-200 h-56 rounded-t-lg mb-3"></div>
                            <div className="p-3 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-7 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (paginatedData.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <Grid3X3 className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyStateTitle}</h3>
                    <p className="text-gray-600 mb-4 max-w-sm">{emptyStateDescription}</p>
                    {emptyStateActionLabel && emptyStateOnAction && (
                        <Button onClick={emptyStateOnAction} className="bg-emerald-500 hover:bg-emerald-600">
                            {emptyStateActionLabel}
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
                {paginatedData.map((item, index) => (
                    <div key={index}>
                        {gridViewComponent(item)}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Header */}
            <DataTableHeader title={title} />

            {/* Toolbar with View Switcher */}
            <div className="flex items-center justify-between mb-4">
                <DataTableToolbar
                    searchPlaceholder={searchPlaceholder}
                    searchColumn={searchColumn}
                    onOpenFilter={onOpenFilter}
                    onAdd={onAdd}
                    addButtonText={addButtonText}
                    table={table}
                />

                {/* View Mode Switcher */}
                {enableGridView && (
                    <TooltipProvider>
                        <motion.div
                            className="flex items-center border border-gray-200 rounded-lg p-1 bg-white shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <Button
                                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setViewMode('list')}
                                            className="h-8 w-8 p-0 transition-all duration-200"
                                        >
                                            <motion.div
                                                animate={{ rotate: viewMode === 'list' ? 0 : 180 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <List className="h-4 w-4" />
                                            </motion.div>
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tampilan List</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <Button
                                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                            size="sm"
                                            onClick={() => setViewMode('grid')}
                                            className="h-8 w-8 p-0 transition-all duration-200"
                                        >
                                            <motion.div
                                                animate={{ rotate: viewMode === 'grid' ? 0 : 180 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Grid3X3 className="h-4 w-4" />
                                            </motion.div>
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tampilan Grid</p>
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    </TooltipProvider>
                )}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {viewMode === 'grid' && enableGridView ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                        >
                            {renderGridView()}
                        </motion.div>
                        {/* Pagination for Grid View */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                        >
                            <DataTablePagination table={table} />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                    >
                        {/* Table */}
                        <motion.div
                            className="rounded-md border overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                        >
                            <DataTableBody
                                table={table}
                                finalColumns={finalColumns}
                                loading={loading}
                                emptyStateTitle={emptyStateTitle}
                                emptyStateDescription={emptyStateDescription}
                                emptyStateActionLabel={emptyStateActionLabel}
                                emptyStateOnAction={emptyStateOnAction}
                            />
                        </motion.div>

                        {/* Pagination for List View */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                        >
                            <DataTablePagination table={table} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filter Drawer */}
            {filterDrawer}

            {/* Delete Confirmation Modal */}
            <DataTableDeleteModal
                deleteModalOpened={deleteModalOpened}
                setDeleteModalOpened={setDeleteModalOpened}
                deleteLoading={deleteLoading}
                deleteSuccess={deleteSuccess}
                deleteError={deleteError}
                deleteConfirmTitle={deleteConfirmTitle}
                deleteConfirmMessage={deleteConfirmMessage}
                itemToDelete={itemToDelete}
                handleDelete={handleDelete}
                closeDeleteModal={closeDeleteModal}
            />
        </div>
    );
}
