<script lang="ts">
  import { resolve } from "$app/paths";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import Search from "@lucide/svelte/icons/search";
  import Settings from "@lucide/svelte/icons/settings";
  import {
    type ColumnDef,
    createTable,
    FlexRender,
    renderSnippet,
    tableFeatures,
  } from "@tanstack/svelte-table";

  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import { Badge } from "#lib/components/ui/badge/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import * as Empty from "#lib/components/ui/empty/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Item from "#lib/components/ui/item/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Table from "#lib/components/ui/table/index.ts";
  import * as ToggleGroup from "#lib/components/ui/toggle-group/index.ts";
  import { createProject, getProjects } from "#lib/projects.remote.ts";

  type Project = Awaited<ReturnType<typeof getProjects>>[number];

  let data = $state<Array<Project>>(getProjects().current ?? []);

  const features = tableFeatures({});

  const columns: Array<ColumnDef<typeof features, Project>> = [
    {
      id: "title",
      header: "Title",
      cell: ({ row }) =>
        renderSnippet(nameSnippet, {
          title: row.original.title,
          owner: row.original.owner?.name ?? "",
        }),
    },
    {
      id: "collaborators",
      header: "Collaborators",
      cell: ({ row }) =>
        renderSnippet(collaboratorsSnippet, {
          collaborators: row.original.collaborators,
        }),
    },
    {
      id: "lastModified",
      header: "Last Modified",
      cell: ({ row }) => row.original.updatedAt.toLocaleString(),
    },
    {
      id: "actions",
      cell: ({ row }) =>
        renderSnippet(actionsSnippet, {
          projectId: row.original.id,
        }),
    },
  ];

  const table = createTable({
    features,
    columns,
    get data() {
      return data;
    },
  });
</script>

{#snippet nameSnippet({ title, owner }: { title: string; owner: string })}
  <Item.Content>
    <Item.Title>
      {title}
    </Item.Title>
    <Item.Description>by {owner}</Item.Description>
  </Item.Content>
{/snippet}

{#snippet collaboratorsSnippet({ collaborators }: { collaborators: Project["collaborators"] })}
  <Avatar.Group>
    {#each collaborators as collaborator}
      <Avatar.Root>
        <Avatar.Image src={collaborator.image} />
      </Avatar.Root>
    {/each}
  </Avatar.Group>
{/snippet}

{#snippet actionsSnippet({ projectId }: { projectId: Project["id"] })}
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button href={resolve("/projects/[id]", { id: projectId })} size="icon" variant="ghost">
          <Ellipsis />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content></DropdownMenu.Content>
  </DropdownMenu.Root>
{/snippet}

<svelte:head>
  <title>Projects - Retext</title>
  <meta name="description" content="TODO" />
</svelte:head>

<Sidebar.Provider>
  <Sidebar.Root collapsible="icon" variant="inset">
    <Sidebar.Header>
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Retext</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Role</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive>All</Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Owner</Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Editor</Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Viewer</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Tags</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Viewer</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Sidebar.MenuButton>
        <Settings />
        Settings
      </Sidebar.MenuButton>
    </Sidebar.Footer>
  </Sidebar.Root>
  <Sidebar.Inset>
    <main class="flex-1">
      <h1 class="text-2xl font-medium">Projects</h1>
      <InputGroup.Root class="w-full max-w-sm">
        <InputGroup.Input placeholder="Search projects..." />
        <InputGroup.Addon>
          <Search />
        </InputGroup.Addon>
      </InputGroup.Root>
      <Table.Root>
        <Table.Header>
          {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
            <Table.Row>
              {#each headerGroup.headers as header (header.id)}
                <Table.Head>
                  <FlexRender {header} />
                </Table.Head>
              {/each}
            </Table.Row>
          {/each}
        </Table.Header>
        <Table.Body>
          {#each table.getRowModel().rows as row (row.id)}
            <Table.Row>
              {#each row.getAllCells() as cell (cell.id)}
                <Table.Cell>
                  <FlexRender {cell} />
                </Table.Cell>
              {/each}
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell>
                <Empty.Root>
                  <Empty.Header>
                    <Empty.Media variant="icon"></Empty.Media>
                    <Empty.Title>No Projects Yet</Empty.Title>
                    <Empty.Description>
                      You haven't created any projects yet. Get started by creating your first
                      project.
                    </Empty.Description>
                  </Empty.Header>
                  <Empty.Content>
                    <Button onclick={() => createProject()}>Create my first project</Button>
                  </Empty.Content>
                </Empty.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
