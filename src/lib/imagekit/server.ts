import 'server-only';
import ImageKit from 'imagekit';
import { env } from '@/lib/config/env';

let client: ImageKit | null = null;

/** Server-side ImageKit client (uses the private key — never expose to the browser). */
export const getImageKit = (): ImageKit => {
  if (!client) {
    client = new ImageKit({
      publicKey: env.imagekit.publicKey,
      privateKey: env.imagekit.privateKey,
      urlEndpoint: env.imagekit.urlEndpoint,
    });
  }
  return client;
};

export const AVATAR_FOLDER = '/velocity';
