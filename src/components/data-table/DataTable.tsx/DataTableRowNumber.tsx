import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';

export function createRowNumberColumn<TData>(): ColumnDef<TData> {
    return {
        id: 'rowNumber',
        header: 'No',
        enableHiding: false,
        enableSorting: false,
        cell: ({ row, table }) => {
            const currentPage = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            const rowNumber = currentPage * pageSize + row.index + 1;
            return (
                <div className="text-center text-xs text-muted-foreground">
                    {rowNumber}
                </div>
            );
        },
    };
}
