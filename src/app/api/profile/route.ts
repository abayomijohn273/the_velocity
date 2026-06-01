import { withApi, parseBody } from '@/lib/api/handler';
import { ApiError, success } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/requireAuth';
import { completeProfileSchema } from '@/lib/validation/profile';
import { getProfile, toUserProfile, upsertProfile } from '@/lib/db/profiles';

export const GET = withApi(async () => {
  const user = await requireAuth();
  const profileRow = await getProfile(user.id);
  const profile = profileRow ? toUserProfile(profileRow, user.email) : null;
  return success({ user, profile });
});

export const PATCH = withApi(async (req) => {
  const user = await requireAuth();
  if (!user.isRegistrationComplete) {
    throw new ApiError('Finish setting up your profile first.', 403);
  }

  const input = await parseBody(req, completeProfileSchema);
  const profileRow = await upsertProfile(user.id, {
    ...input,
    referredBy: input.referredBy || null,
    avatar: input.avatar || null,
  });

  return success({ user, profile: toUserProfile(profileRow, user.email) });
});
