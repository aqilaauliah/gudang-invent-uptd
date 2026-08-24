import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = 'Hapus Data',
    message = 'Data yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?',
    confirmText = 'Hapus',
    processing = false,
}) {
    return (
        <Modal open={open} onClose={onClose} title={title} size="sm">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-danger-soft">
                    <AlertTriangle className="h-6 w-6 text-danger" />
                </div>
                <p className="text-sm leading-6 text-muted">{message}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose}>
                    Batal
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={processing}>
                    {processing ? 'Memproses...' : confirmText}
                </Button>
            </div>
        </Modal>
    );
}
