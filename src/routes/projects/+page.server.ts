import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resolve } from "$app/paths";
import { getProjects } from "#lib/projects.remote.ts";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = locals;

  if (!user) {
    redirect(302, resolve("/login"));
  }

  const projects = await getProjects();

  return { projects };
};
