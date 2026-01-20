import { env } from '@oakoss/config/env';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    globalThis.window === undefined
      ? env.VITE_APP_URL
      : globalThis.location.origin,
});

export const { useSession, signIn, signOut, signUp } = authClient;

export async function getSession() {
  const response = await authClient.getSession();
  return response.data;
}
