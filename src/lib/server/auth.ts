import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth/minimal";
import { emailOTP, username } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import Stripe from "stripe";
import { db } from "#lib/server/db/drizzle.ts";
import { sendEmail } from "#lib/server/email.ts";
import { getRequestEvent } from "$app/server";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-07-29.dahlia",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          sendEmail({
            from: "noreply@latexdex.com",
            to: email,
            subject: "Sign in OTP",
            html: `Your OTP is ${otp}`,
          });
        } else if (type === "email-verification") {
          sendEmail({
            from: "noreply@latexdex.com",
            to: email,
            subject: "Email Verification OTP",
            html: `Your OTP is ${otp}`,
          });
        } else {
          sendEmail({
            from: "noreply@latexdex.com",
            to: email,
            subject: "Password Reset OTP",
            html: `Your OTP is ${otp}`,
          });
        }
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
      createCustomerOnSignUp: true,
    }),
    username(),
    sveltekitCookies(getRequestEvent),
  ],
});
