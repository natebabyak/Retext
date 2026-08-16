<script lang="ts">
import FolderTreeIcon from "@lucide/svelte/icons/folder-tree";
import SettingsIcon from "@lucide/svelte/icons/settings";
import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
</script>

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
