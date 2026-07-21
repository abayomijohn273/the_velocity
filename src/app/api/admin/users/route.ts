import { withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAdmin } from '@/lib/api/requireAuth';
import { listUsersForAdmin } from '@/lib/db/users';
import type { AccountStatus } from '@/types/user';

export const GET = withApi(async (req) => {
  await requireAdmin();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const search = (searchParams.get('search') ?? '').trim();
  const status = (searchParams.get('status') ?? '') as AccountStatus | '';

  const result = await listUsersForAdmin({ page, search, status });
  return success(result);
});
