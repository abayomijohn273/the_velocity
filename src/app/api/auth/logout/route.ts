import { withApi } from '@/lib/api/handler';
import { success } from '@/lib/api/response';
import { clearAuthCookie } from '@/lib/auth/cookies';

export const POST = withApi(async () => {
  await clearAuthCookie();
  return success({ loggedOut: true });
});
