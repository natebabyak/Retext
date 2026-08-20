<script lang="ts">
  import PanelLeft from "@lucide/svelte/icons/panel-left";
  import Play from "@lucide/svelte/icons/play";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as Menubar from "#lib/components/ui/menubar/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";

  import ProjectFooter from "./project-footer.svelte";
  import ProjectHeader from "./project-header.svelte";
  import ProjectLeftSidebar from "./project-left-sidebar.svelte";
  import ProjectRightSidebar from "./project-right-sidebar.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>My Projects - Retext</title>
  <meta name="description" content="TODO" />
</svelte:head>

<div class="[--footer-height:calc(--spacing(8))] [--header-height:calc(--spacing(12))]">
  <Sidebar.Provider class="flex flex-col">
    <ProjectHeader />
    <div class="flex flex-1">
      <ProjectLeftSidebar />
      <main class="flex-1">
        {@render children()}
      </main>
      <ProjectRightSidebar />
    </div>
    <ProjectFooter />
  </Sidebar.Provider>
</div>
