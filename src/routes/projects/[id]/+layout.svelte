<script lang="ts">
  import PanelLeftIcon from "@lucide/svelte/icons/panel-left";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Menubar from "#lib/components/ui/menubar/index.ts";

  let { children } = $props();
</script>

<svelte:head>
  <title>My Projects - Retext</title>
  <meta name="description" content="TODO" />
</svelte:head>

<div class="flex h-screen w-full flex-col">
  <header class="flex border-b p-2">
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Insert</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Format</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  </header>
  <div class="flex flex-1">
    <aside class="w-12 border-r"></aside>
    <main class="flex-1">
      {@render children()}
    </main>
  </div>
  <footer class="border-t p-1">
    <Button size="icon-xs" variant="ghost">
      <PanelLeftIcon />
    </Button>
  </footer>
</div>
