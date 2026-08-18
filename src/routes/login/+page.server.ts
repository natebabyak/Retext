import { resolve } from "$app/paths";
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = locals;

  if (user) {
    redirect(303, resolve("/artifacts/search"));
  }
};
