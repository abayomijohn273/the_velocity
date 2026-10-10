import { withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/requireAuth';
import { listMembers } from '@/lib/db/members';

export const GET = withApi(async (req) => {
  const viewer = await requireAuth();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const search = (searchParams.get('search') ?? '').trim();
  const currentRole = (searchParams.get('currentRole') ?? '').trim();
  const industry = (searchParams.get('industry') ?? '').trim();

  const result = await listMembers({
    page,
    search,
    currentRole,
    industry,
    viewerIsMonetized: viewer.isMonetized,
  });
  return success(result);
});
