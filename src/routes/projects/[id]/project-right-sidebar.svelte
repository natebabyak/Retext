<script lang="ts">
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
</script>

<Sidebar.Root
  collapsible="offcanvas"
  side="right"
  variant="sidebar"
  class="top-(--header-height) h-[calc(100vh-var(--footer-height)-var(--header-height))]"
>
  <Sidebar.Content></Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
