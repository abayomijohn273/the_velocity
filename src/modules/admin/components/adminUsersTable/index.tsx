'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/formErrors';
import { useUpdateUserMonetized, useUpdateUserStatus } from '@/hooks/admin/useAdminUsers';
import type { AdminUser } from '@/lib/db/users';
import StatusBadge from '@/modules/admin/components/statusBadge';
import ConfirmActionModal from '@/modules/admin/components/confirmActionModal';

interface AdminUsersTableProps {
  users: AdminUser[];
}

type PendingAction =
  | { kind: 'status'; id: string; name: string; status: 'approved' | 'rejected' }
  | { kind: 'monetized'; id: string; name: string; nextValue: boolean };

const AdminUsersTable = ({ users }: AdminUsersTableProps) => {
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const updateStatus = useUpdateUserStatus();
  const updateMonetized = useUpdateUserMonetized();

  const nameFor = (user: AdminUser) =>
    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email;

  const joinedFor = (user: AdminUser) =>
    new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const isPending = updateStatus.isPending || updateMonetized.isPending;

  const handleConfirm = () => {
    if (!pendingAction) return;

    if (pendingAction.kind === 'status') {
      updateStatus.mutate(
        { id: pendingAction.id, status: pendingAction.status },
        {
          onSuccess: () => {
            toast.success(
              pendingAction.status === 'approved' ? 'User approved.' : 'User rejected.'
            );
            setPendingAction(null);
          },
          onError: (error) => toast.error(getErrorMessage(error)),
        }
      );
      return;
    }

    updateMonetized.mutate(
      { id: pendingAction.id, isMonetized: pendingAction.nextValue },
      {
        onSuccess: () => {
          toast.success(
            pendingAction.nextValue ? 'User marked as monetized.' : 'User unmarked as monetized.'
          );
          setPendingAction(null);
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  const modalCopy = (() => {
    if (!pendingAction) return { title: '', message: '', confirmLabel: '' };

    if (pendingAction.kind === 'status') {
      return {
        title: pendingAction.status === 'approved' ? 'Approve this user?' : 'Reject this user?',
        message: `${pendingAction.name} will ${
          pendingAction.status === 'approved'
            ? 'be able to log in immediately.'
            : 'no longer be able to log in until approved.'
        }`,
        confirmLabel: pendingAction.status === 'approved' ? 'Approve' : 'Reject',
      };
    }

    return {
      title: pendingAction.nextValue ? 'Mark as monetized?' : 'Remove monetized status?',
      message: `${pendingAction.name} will ${
        pendingAction.nextValue
          ? 'be able to see other members’ LinkedIn and email links.'
          : 'no longer be able to see other members’ LinkedIn and email links.'
      }`,
      confirmLabel: pendingAction.nextValue ? 'Mark as monetized' : 'Remove monetized',
    };
  })();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/60 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Monetized</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 font-medium text-black">{nameFor(user)}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{joinedFor(user)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.accountStatus} />
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setPendingAction({
                        kind: 'monetized',
                        id: user.id,
                        name: nameFor(user),
                        nextValue: !user.isMonetized,
                      })
                    }
                    disabled={isPending}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.isMonetized
                        ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {user.isMonetized ? 'Monetized' : 'Not monetized'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({
                          kind: 'status',
                          id: user.id,
                          name: nameFor(user),
                          status: 'approved',
                        })
                      }
                      disabled={isPending || user.accountStatus === 'approved'}
                      className="rounded-full border border-secondary/30 px-3 py-1.5 text-xs font-semibold text-secondary transition hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({
                          kind: 'status',
                          id: user.id,
                          name: nameFor(user),
                          status: 'rejected',
                        })
                      }
                      disabled={isPending || user.accountStatus === 'rejected'}
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmActionModal
        open={!!pendingAction}
        title={modalCopy.title}
        message={modalCopy.message}
        confirmLabel={modalCopy.confirmLabel}
        loading={isPending}
        onConfirm={handleConfirm}
        onClose={() => setPendingAction(null)}
      />
    </div>
  );
};

export default AdminUsersTable;
