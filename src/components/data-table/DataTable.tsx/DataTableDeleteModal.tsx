import * as React from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DataTableDeleteModalProps {
    deleteModalOpened: boolean;
    // eslint-disable-next-line no-unused-vars
    setDeleteModalOpened: (open: boolean) => void;
    deleteLoading: boolean;
    deleteSuccess: boolean;
    deleteError: boolean;
    deleteConfirmTitle: string;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    deleteConfirmMessage: (item: any) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemToDelete: any;
    handleDelete: () => void;
    closeDeleteModal: () => void;
}

export function DataTableDeleteModal({
    deleteModalOpened,
    setDeleteModalOpened,
    deleteLoading,
    deleteSuccess,
    deleteError,
    deleteConfirmTitle,
    deleteConfirmMessage,
    itemToDelete,
    handleDelete,
    closeDeleteModal,
}: DataTableDeleteModalProps) {
    return (
        <Dialog open={deleteModalOpened} onOpenChange={setDeleteModalOpened}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {deleteLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-pulse" />
                                <span>Processing your request</span>
                            </div>
                        ) : deleteSuccess ? (
                            <div className="flex items-center justify-center space-x-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span>Success!</span>
                            </div>
                        ) : deleteError ? (
                            <div className="flex items-center justify-center space-x-2 text-red-600">
                                <XCircle className="w-5 h-5" />
                                <span>Error!</span>
                            </div>
                        ) : (
                            deleteConfirmTitle
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        {deleteLoading ? (
                            "Please wait while we process your request. Do not refresh the page."
                        ) : deleteSuccess ? (
                            "Data has been successfully deleted."
                        ) : deleteError ? (
                            "Failed to delete data. Please try again."
                        ) : (
                            itemToDelete ? deleteConfirmMessage(itemToDelete) : 'Apakah Anda yakin ingin menghapus item ini?'
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center">
                    {!deleteLoading && !deleteSuccess && !deleteError && (
                        <>
                            <Button
                                variant="outline"
                                onClick={closeDeleteModal}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                className="flex-1"
                            >
                                Delete
                            </Button>
                        </>
                    )}
                    {(deleteSuccess || deleteError) && (
                        <Button
                            variant="outline"
                            onClick={closeDeleteModal}
                            className="flex-1"
                        >
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
