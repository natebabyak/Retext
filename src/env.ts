import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  BETTER_AUTH_SECRET: {},
  BETTER_AUTH_URL: {},
  DATABASE_URL: {},
  GITHUB_CLIENT_ID: {},
  GITHUB_CLIENT_SECRET: {},
  GOOGLE_CLIENT_ID: {},
  GOOGLE_CLIENT_SECRET: {},
  STRIPE_SECRET_KEY: {},
  STRIPE_WEBHOOK_SECRET: {},
});
