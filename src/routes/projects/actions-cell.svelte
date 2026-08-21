<script lang="ts">
  import {
    CloudUploadIcon,
    CopyIcon,
    EllipsisIcon,
    FileDown,
    FileDownIcon,
    PenIcon,
    Trash2Icon,
  } from "@lucide/svelte";

  import * as AlertDialog from "#lib/components/ui/alert-dialog/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";

  let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} size="icon" variant="ghost">
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <PenIcon />
        Rename
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <CopyIcon />
        Copy
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <FileDownIcon />
        Download PDF
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <CloudUploadIcon />
        Publish Artifact
      </DropdownMenu.Item>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          {#snippet child({ props })}
            <DropdownMenu.Item {...props}>
              <Trash2Icon />
              Delete
            </DropdownMenu.Item>
          {/snippet}
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
