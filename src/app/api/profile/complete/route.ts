import { withApi, parseBody } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/requireAuth';
import { completeProfileSchema } from '@/lib/validation/profile';
import { toUserProfile, upsertProfile } from '@/lib/db/profiles';
import { updateUser } from '@/lib/db/users';

export const POST = withApi(async (req) => {
  const user = await requireAuth();
  const input = await parseBody(req, completeProfileSchema);

  const profileRow = await upsertProfile(user.id, {
    ...input,
    referredBy: input.referredBy || null,
  });
  await updateUser(user.id, { is_registration_complete: true });

  return success({
    user: { ...user, isRegistrationComplete: true },
    profile: toUserProfile(profileRow, user.email),
  });
});
