<script lang="ts">
import {
  type ColumnDef,
  createTable,
  FlexRender,
  tableFeatures,
} from "@tanstack/svelte-table";
import * as Item from "#lib/components/ui/item/index.ts";
import { getProjects } from "#lib/projects.remote.ts";
import type { project, projectTag } from "#lib/server/db/schema.ts";

type Project = typeof project.$inferSelect & {
  tags: Array<typeof projectTag.$inferSelect>;
};

let data = $state<Array<Project>>(getProjects().current ?? []);

const features = tableFeatures({});

const columns: Array<ColumnDef<typeof features, Project>> = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "title",
  },
  {
    accessorKey: "tags",
  },
  {
    accessorKey: "updatedAt",
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

<table>
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr>
        {#each headerGroup.headers as header (header.id)}
          <th>
            {#if !header.isPlaceholder}
              <FlexRender {header} />
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row (row.id)}
      {@const cells = row.getAllCells()}
      <tr>
        <Item.Root variant="outline">
          <Item.Content>
            <Item.Title>{cells[2]}</Item.Title>
          </Item.Content>
        </Item.Root>
      </tr>
    {/each}
  </tbody>
</table>
