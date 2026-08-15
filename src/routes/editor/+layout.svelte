<script lang="ts">
import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Menubar from "#lib/components/ui/menubar/index.ts";
import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
import EditorSidebar from "./editor-sidebar.svelte";

let { children } = $props();
</script>

<svelte:head>
  <title>LaTeXdex Editor</title>
  <meta name="description" content="TODO">
</svelte:head>

<Sidebar.Provider>
  <EditorSidebar />
  <div class="flex flex-col h-screen w-full">
    <header class="p-2 border-b flex">
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
    <main class="flex-1">
      {@render children()}
    </main>
    <footer class="p-1 border-t">
      <Button size="icon-xs" variant="ghost">
        <PanelLeftIcon />
      </Button>
    </footer>
  </div>
</Sidebar.Provider>
