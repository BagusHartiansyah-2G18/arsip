import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Icdt {
  judul: string;
  sendValue: (v: string[]) => void;
  dlist: string[];
  error?: React.ReactNode;
}

export function SpendataanText({ judul, sendValue, dlist,error }: Icdt) {
  const [Ijudul, _Ijudul] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [preventClose, setPreventClose] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track input focus
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true); // buka dropdown saat fokus
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPreventClose(false); // reset preventClose saat input blur
  };

  // Klik di luar untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (preventClose) return;  
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [preventClose]);

  // Tambah item baru
  const handleAdd = () => {
    if (Ijudul.trim() && !dlist.includes(Ijudul)) {
      sendValue([...dlist, Ijudul]);
      _Ijudul('');
    }
  };

  // Hapus item biasa
  const handleDelete = (item: string) => {
    const cleaned = item.trim().toLowerCase();
    sendValue(dlist.filter((d) => d.trim().toLowerCase() !== cleaned));
  };
 
  const handleDeleteWithPrevent = (item: string) => {
    setPreventClose(true);  
    handleDelete(item);
  };

  return (
    <div ref={containerRef} className="relative flex-1 w-full">
      <FormItem>
        <FormLabel className="text-xs font-medium text-gray-700">{judul} {dlist.length >0 && ` (${dlist.length} data)`}</FormLabel>
        <FormControl>
          <Input
            ref={inputRef}
            placeholder={`Tambahkan ${judul}`}
            className="pr-20 text-xs h-8 rounded-md border-gray-200  focus:border-emerald-300 focus:ring-emerald-100"
            value={Ijudul}
            onChange={(e) => _Ijudul(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
          />
        </FormControl>

        <div className="absolute right-2 top-[26px]">
          <button
            type="button"
            onMouseDown={handleAdd} // onMouseDown agar tidak kalah dengan blur
            className="bg-emerald-500 text-white text-xs px-3 py-1 rounded hover:bg-emerald-600 transition"
          >
            Add
          </button>
        </div>

        {showDropdown && (
          <div
            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow text-xs max-h-40 overflow-auto"
          >
            {dlist?.map((item, idx) => (
              <div
                key={idx}
                className="group flex justify-between items-center px-3 py-2 rounded-md bg-white hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-700">{item}</span>
                <button
                  onMouseDown={() => handleDeleteWithPrevent(item)}
                  className="bg-red-400 text-black-400 hover:text-gray-700 text-xs px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-red-300"
                  aria-label={`Hapus ${item}`}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
        <FormMessage className="text-xs" >{error}</FormMessage>
      </FormItem>
    </div>
  );
}
