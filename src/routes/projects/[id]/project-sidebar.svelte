<script lang="ts">
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";

  import SettingsDialog from "./settings-dialog.svelte";
</script>

<Sidebar.Root
  collapsible="icon"
  side="left"
  variant="sidebar"
  class="top-(--header-height) h-[calc(100vh-var(--footer-height)-var(--header-height))]"
>
  <Sidebar.Header></Sidebar.Header>
  <Sidebar.Content></Sidebar.Content>
  <Sidebar.Footer>
    <SettingsDialog />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
