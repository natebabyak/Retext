import type { getProjects } from "#lib/projects.remote.ts";
import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import type { features } from "./features";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import TitleCell from "./title-cell.svelte";
import CollaboratorsCell from "./collaborators-cell.svelte";
import ActionsCell from "./actions-cell.svelte";

type Project = Awaited<ReturnType<typeof getProjects>>[number];

const columnHelper = createColumnHelper<typeof features, Project>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllRowsSelected(),
        onCheckedChange: (checked) => table.toggleAllRowsSelected(checked),
        indeterminate:
          table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected(),
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (checked) => row.toggleSelected(checked),
      }),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: ({ row }) =>
      renderComponent(TitleCell, {
        id: row.original.id,
        title: row.original.title,
      }),
  }),
  columnHelper.accessor("collaborators", {
    header: "Collaborators",
    cell: ({ row }) =>
      renderComponent(CollaboratorsCell, {
        id: row.original.id,
        collaborators: row.original.collaborators,
      }),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Date Modified",
    cell: ({ row }) => row.original.updatedAt.toLocaleString(),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) =>
      renderComponent(ActionsCell, {
        id: row.original.id,
      }),
  }),
]);
