import { parseBody, withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAdmin } from '@/lib/api/requireAuth';
import { toAuthUser, updateUserStatus } from '@/lib/db/users';
import { updateUserStatusSchema } from '@/lib/validation/admin';

interface Context {
  params: Promise<{ id: string }>;
}

export const PATCH = withApi<Context>(async (req, ctx) => {
  await requireAdmin();
  const { status } = await parseBody(req, updateUserStatusSchema);
  const { id } = await ctx.params;

  const updated = await updateUserStatus(id, status);
  return success({ user: toAuthUser(updated) });
});
