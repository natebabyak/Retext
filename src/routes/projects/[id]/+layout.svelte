<script lang="ts">
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";

  import type { LayoutProps } from "./$types";
  import ProjectFooter from "./project-footer.svelte";
  import ProjectHeader from "./project-header.svelte";
  import ProjectSidebar from "./project-sidebar.svelte";

  let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
  <title>My Projects - Texfolia</title>
  <meta name="description" content="TODO" />
</svelte:head>

<div class="[--footer-height:calc(--spacing(8))] [--header-height:calc(--spacing(12))]">
  <Sidebar.Provider class="flex flex-col">
    <ProjectHeader project={data.project} />
    <div class="flex flex-1">
      <ProjectSidebar files={data.project?.files ?? []} />
      <main class="flex-1">
        {@render children()}
      </main>
    </div>
    <ProjectFooter />
  </Sidebar.Provider>
</div>
