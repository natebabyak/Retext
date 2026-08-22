<script lang="ts">
  import {
    ChevronRightIcon,
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    GitBranchIcon,
    SearchIcon,
    type LucideIcon,
  } from "@lucide/svelte";

  import * as Collapsible from "#lib/components/ui/collapsible/index.ts";
  import * as ContextMenu from "#lib/components/ui/context-menu/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";

  import SettingsDialog from "./settings-dialog.svelte";
  import { getTab, setTab, type Tab } from "./tab.svelte";

  const TABS = [
    {
      Icon: FolderIcon,
      label: "Files",
      value: "files",
    },
    {
      Icon: GitBranchIcon,
      label: "Source Control",
      value: "sourceControl",
    },
  ] satisfies Array<{
    Icon: LucideIcon;
    label: string;
    value: Tab;
  }>;
</script>

<Sidebar.Root
  collapsible="icon"
  class="top-(--header-height) h-[calc(100vh-var(--footer-height)-var(--header-height))] overflow-hidden *:data-[sidebar=sidebar]:flex-row"
>
  <Sidebar.Root collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)] border-e">
    <Sidebar.Header>
      <Sidebar.Menu>
        {#each TABS as { Icon, label, value }}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton
              isActive={value === getTab()}
              onclick={() => setTab(value)}
              tooltipContentProps={{ hidden: false }}
              class="data-active:bg-primary data-active:text-primary-foreground"
            >
              {#snippet tooltipContent()}
                {label}
              {/snippet}
              <Icon />
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content />
    <Sidebar.Footer>
      <SettingsDialog />
    </Sidebar.Footer>
  </Sidebar.Root>
  <Sidebar.Root collapsible="none" class="flex-1">
    <Sidebar.Content>
      <Sidebar.Group>
        {#if getTab() === "files"}
          <Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
          <ContextMenu.Root>
            <ContextMenu.Trigger>
              {#snippet child({ props })}
                <Sidebar.GroupContent {...props}>
                  <Sidebar.Menu>
                    {#each Object.entries([]) as node}
                      {@render Tree({ node })}
                    {/each}
                  </Sidebar.Menu>
                </Sidebar.GroupContent>
              {/snippet}
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Item>New File</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        {/if}
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>
</Sidebar.Root>

{#snippet Tree({ node })}
  {let [name, children] = node}
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
