import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_APP_URL: z.url().optional(),
  },
  clientPrefix: 'VITE_',
  runtimeEnv: process.env,
  server: {
    // Database
    DATABASE_URL: z.url(),

    // OAuth Providers (optional)
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    // Environment
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),

    // Authentication
    SESSION_SECRET: z.string().min(32),
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});

export type Env = typeof env;
