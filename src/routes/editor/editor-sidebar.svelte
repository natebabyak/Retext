<script lang="ts">
import FolderTreeIcon from "@lucide/svelte/icons/folder-tree";
import SettingsIcon from "@lucide/svelte/icons/settings";
import latexdex from "#lib/assets/favicon.svg";
import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
import * as ToggleGroup from "#lib/components/ui/toggle-group/index.ts";

let sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header> </Sidebar.Header>
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
