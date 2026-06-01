import { withApi } from '@/lib/api/handler';
import { ApiError, success } from '@/lib/api/response';
import { requireAuth } from '@/lib/api/requireAuth';
import { ACCEPTED_IMAGE_TYPES, MAX_AVATAR_BYTES } from '@/lib/constants/upload';
import { AVATAR_FOLDER, getImageKit } from '@/lib/imagekit/server';

export const POST = withApi(async (req) => {
  const user = await requireAuth();

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    throw new ApiError('Invalid upload request', 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    throw new ApiError('No file provided', 400);
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new ApiError('Unsupported file type. Use JPG, PNG, or WEBP.', 415);
  }
  if (file.size > MAX_AVATAR_BYTES) {
    throw new ApiError('Image is too large. Maximum size is 5MB.', 413);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split('.').pop() || 'jpg';

  const uploaded = await getImageKit().upload({
    file: buffer,
    fileName: `avatar_${user.id}_${Date.now()}.${extension}`,
    folder: AVATAR_FOLDER,
    useUniqueFileName: true,
  });

  return success({ url: uploaded.url });
});
