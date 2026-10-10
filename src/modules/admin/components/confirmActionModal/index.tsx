'use client';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import FormButton from '@/components/ui/formButton';

interface ConfirmActionModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmActionModal = ({
  open,
  title,
  message,
  confirmLabel,
  loading = false,
  onConfirm,
  onClose,
}: ConfirmActionModalProps) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
              <DialogTitle className="text-xl font-bold text-black">{title}</DialogTitle>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{message}</p>
              <div className="mt-6 flex gap-3">
                <FormButton type="button" variant="secondary" onClick={onClose} disabled={loading}>
                  Cancel
                </FormButton>
                <FormButton type="button" onClick={onConfirm} loading={loading}>
                  {confirmLabel}
                </FormButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmActionModal;
