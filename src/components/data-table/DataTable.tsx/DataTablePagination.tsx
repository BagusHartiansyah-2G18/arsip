import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface DataTablePaginationProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
}

export function DataTablePagination({ table }: DataTablePaginationProps) {
    // Pagination helper function
    const generatePaginationItems = (): React.ReactNode[] => {
        const currentPage = table.getState().pagination.pageIndex + 1;
        const totalPages = table.getPageCount();
        const items: React.ReactNode[] = [];

        if (totalPages <= 1) {
            return items;
        }

        // Always show first page
        items.push(
            <PaginationItem key="page-1">
                <PaginationLink
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        table.setPageIndex(0);
                    }}
                    isActive={currentPage === 1}
                    className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors"
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Show ellipsis if current page is far from start
        if (currentPage > 4) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) {
                items.push(
                    <PaginationItem key={`page-${i}`}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                table.setPageIndex(i - 1);
                            }}
                            isActive={currentPage === i}
                            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        // Show ellipsis if current page is far from end
        if (currentPage < totalPages - 3) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Always show last page (if more than 1 page)
        if (totalPages > 1) {
            items.push(
                <PaginationItem key={`page-${totalPages}`}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex(totalPages - 1);
                        }}
                        isActive={currentPage === totalPages}
                        className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
                <p className="text-xs font-medium">Baris per halaman</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px] text-xs rounded-md">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-xs font-medium">
                    Halaman {table.getState().pagination.pageIndex + 1} dari{' '}
                    {table.getPageCount()}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.previousPage();
                                }}
                                className={`h-8 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors ${!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : ''}`}
                            />
                        </PaginationItem>
                        {generatePaginationItems()}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    table.nextPage();
                                }}
                                className={`h-8 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors ${!table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
