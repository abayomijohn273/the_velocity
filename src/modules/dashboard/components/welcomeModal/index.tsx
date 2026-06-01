'use client';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Confetti } from '@phosphor-icons/react';
import { Fragment } from 'react';
import FormButton from '@/components/ui/formButton';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
  name?: string;
}

const WelcomeModal = ({ open, onClose, name }: WelcomeModalProps) => {
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
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                <Confetti size={32} weight="fill" className="text-secondary" />
              </div>
              <DialogTitle className="text-2xl font-bold text-black">
                Welcome{name ? `, ${name}` : ''}! 🎉
              </DialogTitle>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Your profile is all set. You’re now part of The Velocity — a circle of rising stars
                collaborating and moving together to achieve big things.
              </p>
              <FormButton type="button" onClick={onClose} className="mt-6">
                Explore the community
              </FormButton>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WelcomeModal;
