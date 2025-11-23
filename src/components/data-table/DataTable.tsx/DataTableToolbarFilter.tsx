import React,{useState,useEffect} from 'react';
import { ChevronDown, Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Kbd } from '@/components/ui/kbd';

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  onOpenFilter?: () => void;
  onAdd?: () => void;
  addButtonText?: string;
  table: any; // instance react-table
}

export function DataTableToolbarFilter({
  searchPlaceholder = 'Cari...',
  onOpenFilter,
  onAdd,
  addButtonText = 'Tambah',
  table,
}: DataTableToolbarProps) {
    const [searchValue, setSearchValue] = useState(table.getState().globalFilter ?? '');

    useEffect(() => {
    const timeout = setTimeout(() => {
        table.setGlobalFilter(searchValue.length ? searchValue : undefined);
    }, 300);
    return () => clearTimeout(timeout);
    }, [searchValue, table])

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between py-3 gap-3">
      {/* Search box */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}

          className="pl-9 pr-20 text-xs h-8 rounded-md border-gray-200 focus:border-emerald-300 focus:ring-emerald-100"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Kbd variant="outline" className="text-[9px] px-1 py-0.5">⌘</Kbd>
          <Kbd variant="outline" className="text-[9px] px-1 py-0.5">K</Kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onOpenFilter && (
          <Button
            variant="outline"
            onClick={onOpenFilter}
            className="h-8 px-3 text-xs rounded-md border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        )}

        {/* Column visibility toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 px-3 text-xs rounded-md border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize text-xs"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {onAdd && (
          <Button
            onClick={onAdd}
            className="h-8 px-3 text-xs rounded-md bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}