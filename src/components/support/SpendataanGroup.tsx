import React, { useState, useMemo, useEffect } from 'react';
import {
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Icdt {
  judul: string;
  field: string[];
  sendValue: (data: { nama: string; value: string; keterangan?: string }[]) => void;
  initialData?: { nama: string; value: string; keterangan?: string }[];
}

export function SpendataanGroup({ judul, field, sendValue, initialData }: Icdt) {
  const [dlist, setDlist] = useState<{ nama: string; value: string; }[]>(initialData?.filter(obj=>Object.values(obj)[0] !== '') || []);
  const [inputValue, setInputValue] = useState('');
  const [editingNama, setEditingNama] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false); // langsung show jika ada data
  const [error, setError] = useState<string | null>(null);

  const nextField = useMemo(() => { 
    return editingNama || field.find(nama => !dlist.some(item => item.nama[0] === nama[0]));
  }, [dlist, editingNama, field]);

  useEffect(() => {
    sendValue(dlist);
    if (!nextField) {
    setShowDropdown(false);
  }

  }, [dlist, sendValue]);

  const handleAdd = () => {
    if (!inputValue.trim()) {
      setError('Input tidak boleh kosong');
      return;
    }
    if (!nextField || dlist.some(item => item.nama === nextField)) {
      setError('Field sudah diisi');
      return;
    }

    setDlist(prev => [...prev, { nama: nextField, value: inputValue }]);
    setInputValue('');
    setEditingNama(null);
    setShowDropdown(true);
    setError(null);
  };

  const handleDelete = (index: number) => {
    const updated = [...dlist];
    updated.splice(index, 1);
    setDlist(updated);
    setInputValue('');
    setEditingNama(null);
    setShowDropdown(true);
  };

  const handleEdit = (index: number) => {
    const item = dlist[index];
    setInputValue(item.value);
    setEditingNama(item.nama);
    const updated = [...dlist];
    updated.splice(index, 1);
    setDlist(updated);
    setShowDropdown(true);
  };
  
  return (
    <div className="text-sm text-gray-600">
      <div className="relative flex-1">
        <FormItem>
          <FormLabel className="text-xs font-medium text-gray-700">
            {judul} {nextField ? `(${nextField})` : ''}
          </FormLabel>

          <FormControl>
            <Input
              aria-label={`Input untuk ${nextField || 'semua data'}`}
              placeholder={nextField ? `Isi ${nextField}` : '✅ Semua data sudah lengkap'}
              className="pr-20 text-xs h-8 rounded-md border-gray-200 focus:border-emerald-300 focus:ring-emerald-100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
              onBlur={(e) => {
                setTimeout(() => {
                  if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-item')) {
                    setShowDropdown(false);
                  }
                }, 150);
              }}
            />
          </FormControl>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          {nextField && (
            <div className="absolute right-2 top-[24px]">
              <button
                type="button"
                onClick={handleAdd}
                className="bg-emerald-500 text-white text-xs px-3 py-1 rounded hover:bg-emerald-600 transition"
              >
                Add
              </button>
            </div>
          )}

          {showDropdown && dlist.length > 0 && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded shadow text-xs max-h-40 overflow-auto">
              {dlist.map((item, idx) => (
                <div
                  key={idx}
                  className="dropdown-item group flex justify-between items-center px-3 py-2 rounded-md bg-white hover:bg-gray-50 transition cursor-pointer"
                  onMouseDown={() => handleEdit(idx)}
                >
                  <div className="flex flex-col text-gray-700">
                    <span className="font-semibold">{item.nama}</span>
                    <span className="text-[11px] text-gray-600">{item.value}</span>
                  </div>
                  <button
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleDelete(idx);
                    }}
                    className="bg-red-400 text-white hover:bg-red-500 text-xs px-2 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-red-300"
                    aria-label={`Hapus ${item.nama}`}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormItem>
      </div>
    </div>
  );
}
