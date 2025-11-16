import * as React from 'react';
import { Plus, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { flexRender } from '@tanstack/react-table';

interface DataTableBodyProps {
    table: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    finalColumns: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
    loading: boolean;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    emptyStateActionLabel?: string;
    emptyStateOnAction?: () => void;
}

export function DataTableBody({
    table,
    finalColumns,
    loading,
    emptyStateTitle = 'Tidak ada data',
    emptyStateDescription = 'Belum ada data yang tersedia. Mulai dengan menambahkan data baru.',
    emptyStateActionLabel,
    emptyStateOnAction,
}: DataTableBodyProps) {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                    <TableRow key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                        {headerGroup.headers.map((header: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            return (
                                <TableHead key={header.id} className="px-4 py-3 text-xs text-gray-900">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {loading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                        <TableRow key={`skeleton-${idx}`}>
                            {finalColumns.map((_, colIdx) => (
                                <TableCell key={`skeleton-col-${colIdx}`} className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            {row.getVisibleCells().map((cell: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                <TableCell key={cell.id} className="px-4 py-3 text-xs text-gray-900">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={finalColumns.length}
                            className="p-0"
                        >
                            <Empty className="border-dashed">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                <FileText className="w-3 h-3 text-gray-400" />
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Calendar className="w-3 h-3 text-gray-400" />
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                                                <Plus className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                    </EmptyMedia>
                                    <EmptyTitle>{emptyStateTitle}</EmptyTitle>
                                    <EmptyDescription>{emptyStateDescription}</EmptyDescription>
                                </EmptyHeader>
                                {emptyStateActionLabel && emptyStateOnAction && (
                                    <EmptyContent>
                                        <Button onClick={emptyStateOnAction} className="bg-blue-600 hover:bg-blue-700 text-white">
                                            <Plus className="w-4 h-4 mr-2" />
                                            {emptyStateActionLabel}
                                        </Button>
                                    </EmptyContent>
                                )}
                            </Empty>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
