<script lang="ts">
import FolderTreeIcon from "@lucide/svelte/icons/folder-tree";
import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
import SettingsIcon from "@lucide/svelte/icons/settings";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Menubar from "#lib/components/ui/menubar/index.ts";
import * as Sidebar from "#lib/components/ui/sidebar/index.ts";

let { children } = $props();
</script>

<svelte:head>
  <title>My Projects - LaTeXdex</title>
  <meta name="description" content="TODO">
</svelte:head>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header>
    <Sidebar.MenuButton> </Sidebar.MenuButton>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.Content>
        <Sidebar.Menu>
          <Sidebar.MenuButton>
            <FolderTreeIcon />
            Files
          </Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Content>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.MenuButton size="lg">
      <SettingsIcon />
      Settings
    </Sidebar.MenuButton>
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
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
  {@render children()}
  <footer class="p-1 border-t">
    <Button size="icon-xs" variant="ghost">
      <PanelLeftIcon />
    </Button>
  </footer>
</div>
