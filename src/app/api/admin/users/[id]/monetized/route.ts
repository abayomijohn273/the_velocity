import { parseBody, withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAdmin } from '@/lib/api/requireAuth';
import { toAuthUser, updateUserMonetized } from '@/lib/db/users';
import { updateUserMonetizedSchema } from '@/lib/validation/admin';

interface Context {
  params: Promise<{ id: string }>;
}

export const PATCH = withApi<Context>(async (req, ctx) => {
  await requireAdmin();
  const { isMonetized } = await parseBody(req, updateUserMonetizedSchema);
  const { id } = await ctx.params;

  const updated = await updateUserMonetized(id, isMonetized);
  return success({ user: toAuthUser(updated) });
});
