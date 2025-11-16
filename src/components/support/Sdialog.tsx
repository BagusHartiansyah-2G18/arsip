import * as React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from '@/components/ui/dialog';

export interface Icdt {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  title?: string;
  description?: string;
  confirmMessage?: (item: any) => string;
  item?: unknown;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Sdialog: React.FC<Icdt> = ({
  open,
  onOpenChange,
  loading = false,
  success = false,
  error = false,
  title = 'Konfirmasi',
  description,
  confirmMessage,
  item,
  confirmLabel = 'Lanjutkan',
  cancelLabel = 'Batal',
  onConfirm,
  onClose,
  children
}) => {
  const renderTitle = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-pulse" />
          <span>Memproses...</span>
        </div>
      );
    }
    if (success) {
      return (
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>Berhasil</span>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <XCircle className="w-5 h-5" />
          <span>Gagal</span>
        </div>
      );
    }
    return title;
  };

  const renderDescription = () => {
    if (loading) {
      return 'Mohon tunggu, sedang memproses permintaan Anda.';
    }
    if (success) {
      return 'Aksi berhasil dilakukan.';
    }
    if (error) {
      return 'Terjadi kesalahan. Silakan coba lagi.';
    }
    return item && confirmMessage ? confirmMessage(item) : description ?? 'Apakah Anda yakin ingin melanjutkan aksi ini?';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{renderTitle()}</DialogTitle>
          <DialogDescription className="text-center">{renderDescription()}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="flex justify-center">
          {!loading && !success && !error && (
            <>
              <Button variant="outline" onClick={onClose} className="flex-1">
                {cancelLabel}
              </Button>
              <Button variant="default" type="submit" onClick={onConfirm} className="flex-1">
                {confirmLabel}
              </Button>
            </>
          )}
          {(success || error) && (
            <Button variant="outline" onClick={onClose} className="flex-1">
              Tutup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};