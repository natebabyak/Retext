<script lang="ts">
  import {
    ChevronRightIcon,
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    GitBranchIcon,
    SearchIcon,
  } from "@lucide/svelte";

  import * as Collapsible from "#lib/components/ui/collapsible/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import type { ProjectFile } from "#lib/server/db/schema.ts";

  import SettingsDialog from "./settings-dialog.svelte";

  let { files }: { files: ProjectFile[] } = $props();

  type FileTree = {
    [key: string]: FileTree | null;
  };

  type TreeNode = [name: string, children: FileTree | null];

  let tree = $derived.by(() => {
    const root: FileTree = {};

    for (const path of files.map((f) => f.path)) {
      const parts = path.split("/");
      let current = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;

        if (isFile) {
          current[part] = current[part] || null;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    }

    return root;
  });
</script>

<Sidebar.Root
  collapsible="icon"
  class="top-(--header-height) h-[calc(100vh-var(--footer-height)-var(--header-height))] overflow-hidden *:data-[sidebar=sidebar]:flex-row"
>
  <Sidebar.Root collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)] border-e">
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltipContentProps={{ hidden: false }}>
            {#snippet tooltipContent()}
              Project Structure
            {/snippet}
            <FolderOpenIcon />
            Project Structure
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltipContentProps={{ hidden: false }}>
            {#snippet tooltipContent()}
              Search
            {/snippet}
            <SearchIcon />
            Search
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltipContentProps={{ hidden: false }}>
            {#snippet tooltipContent()}
              Source Control
            {/snippet}
            <GitBranchIcon />
            Source Control
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>
  </Sidebar.Root>
  <Sidebar.Root collapsible="none" class="flex-1">
    <Sidebar.Header></Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Project</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each Object.entries(tree) as node}
              {@render Tree({ node })}
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <SettingsDialog />
    </Sidebar.Footer>
  </Sidebar.Root>
</Sidebar.Root>

{#snippet Tree({ node }: { node: TreeNode })}
  {@const [name, children] = node}
  {#if !children}
    <Sidebar.MenuButton
      isActive={name === "button.svelte"}
      class="data-[active=true]:bg-transparent"
    >
      <FileIcon />
      {name}
    </Sidebar.MenuButton>
  {:else}
    <Sidebar.MenuItem>
      <Collapsible.Root
        class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      >
        <Collapsible.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton {...props}>
              <ChevronRightIcon class="transition-transform" />
              <FolderIcon />
              {name}
            </Sidebar.MenuButton>
          {/snippet}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Sidebar.MenuSub>
            {#each Object.entries(children) as subNode}
              {@render Tree({ node: subNode })}
            {/each}
          </Sidebar.MenuSub>
        </Collapsible.Content>
      </Collapsible.Root>
    </Sidebar.MenuItem>
  {/if}
{/snippet}
