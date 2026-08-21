<script lang="ts">
  import { ChevronDownIcon, ChevronsUpDownIcon, PlusIcon, SearchIcon } from "@lucide/svelte";
  import { createTable, FlexRender } from "@tanstack/svelte-table";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Empty from "#lib/components/ui/empty/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import { Skeleton } from "#lib/components/ui/skeleton/index.ts";
  import * as Table from "#lib/components/ui/table/index.ts";
  import { createProject, getProjects } from "#lib/projects.remote.ts";

  import { columns } from "./columns";
  import { features } from "./features";
  import ProjectsSidebar from "./projects-sidebar.svelte";

  const projectsQuery = getProjects();

  const table = createTable({
    features,
    columns,
    get data() {
      return projectsQuery.current ?? [];
    },
  });
</script>

<svelte:head>
  <title>Projects - Retext</title>
  <meta name="description" content="TODO" />
</svelte:head>

<Sidebar.Provider>
  <ProjectsSidebar />
  <Sidebar.Inset>
    <main class="flex-1">
      <h1 class="text-2xl font-medium">Projects</h1>
      <InputGroup.Root class="w-full max-w-sm">
        <InputGroup.Input
          placeholder="Search projects..."
          bind:value={() => table.atoms.globalFilter.get(), (v) => table.setGlobalFilter(v)}
        />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <Button onclick={() => createProject()}>
        <PlusIcon />
        Create Project
      </Button>
      {#if projectsQuery.error}
        <Empty.Root></Empty.Root>
      {:else}
        <Table.Root>
          <Table.Caption>
            {table.getFilteredSelectedRowModel().rows.length}
            of
            {table.getFilteredRowModel().rows.length}
            row(s) selected
          </Table.Caption>
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
            {#if projectsQuery.loading && !projectsQuery.current}
              {#each { length: 10 } as _}
                <Table.Row>
                  <Table.Cell colspan={4}>
                    <Skeleton class="h-16 w-full p-4" />
                  </Table.Cell>
                </Table.Row>
              {/each}
            {:else}
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
            {/if}
          </Table.Body>
        </Table.Root>
      {/if}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
