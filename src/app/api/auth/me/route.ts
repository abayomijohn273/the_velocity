import { withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/requireAuth';
import { getProfile, toUserProfile } from '@/lib/db/profiles';

export const GET = withApi(async () => {
  const user = await requireAuth();
  const profileRow = await getProfile(user.id);
  const profile = profileRow ? toUserProfile(profileRow, user.email) : null;
  return success({ user, profile });
});
