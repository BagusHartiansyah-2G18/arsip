import React, { useState, useEffect } from 'react';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Icdt {
  judul: string;
  field: string[]; // optional preset judul
  sendValue: (data: { nama: string; value: string; keterangan?: string }[]) => void;
  initialData?: { nama: string; value: string; keterangan?: string }[]; 
  error?: React.ReactNode;
}

export function SpendataanAuto({ judul, field = [], sendValue, initialData = [],error:Ierror}: Icdt) {
  const [items, setItems] = useState<{ nama: string; value: string }[]>(initialData);
  const [newNama, setNewNama] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendValue(items);
  }, [items, sendValue]);

  const handleAddNama = () => {
    if (!newNama.trim()) {
      setError('Judul tidak boleh kosong');
      return;
    }
    if (items.some(item => item.nama === newNama)) {
      setError('Judul sudah ada');
      return;
    }

    setItems(prev => [...prev, { nama: newNama, value: '' }]);
    setNewNama('');
    setError(null);
  };

  const handleValueChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index].value = value;
    setItems(updated);
  };

  const handleDeleteNama = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="text-sm text-gray-600">
      <FormItem>
        <FormLabel className="text-xs font-medium text-gray-700">
          {judul}
        </FormLabel>

        <div className="flex gap-2 items-center mb-2">
          <Input
            placeholder="Tambah judul/keterangan"
            value={newNama}
            onChange={(e) => setNewNama(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNama();
              }
            }}
            className="text-xs h-8 rounded-md border-gray-200 focus:border-emerald-300 focus:ring-emerald-100"
          />
          <button
            type="button"
            onClick={handleAddNama}
            className="bg-emerald-500 text-white text-xs px-3 py-1 rounded hover:bg-emerald-600 transition"
          >
            Add
          </button>
        </div>

        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <div className="border-t border-gray-300 my-4"></div>
        <div className="space-y-2 mt-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-700 w-24 shrink-0">
                {item.nama}
              </label>
              <Input
                value={item.value}
                onChange={(e) => handleValueChange(idx, e.target.value)}
                placeholder={`Isi ${item.nama}`}
                className="text-xs h-8 rounded-md border-gray-200 focus:border-emerald-300 focus:ring-emerald-100 flex-1"
              />
              <button
                type="button"
                onClick={() => handleDeleteNama(idx)}
                className="text-red-500 text-xs hover:underline shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <FormMessage className="text-xs" >{Ierror}</FormMessage>
      </FormItem>
    </div>
  );
}