<script lang="ts">
  import ArrowBigUpIcon from "@lucide/svelte/icons/arrow-big-up";
  import CommandIcon from "@lucide/svelte/icons/command";
  import SearchIcon from "@lucide/svelte/icons/search";

  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Command from "#lib/components/ui/command/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as Menubar from "#lib/components/ui/menubar/index.ts";

  let open = $state(false);
</script>

<header class="flex h-(--header-height) items-center gap-2 border-b px-2">
  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Insert</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>View</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Format</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Help</Menubar.Trigger>
    </Menubar.Menu>
  </Menubar.Root>
  <Button onclick={() => (open = true)} variant="outline" class="w-full max-w-xs">
    <SearchIcon />
    Search Workspace
    <Kbd.Root class="ml-auto">
      <CommandIcon class="size-3" />
      <ArrowBigUpIcon class="size-3" />
      P
    </Kbd.Root>
  </Button>
  <Avatar.Group class="ml-auto"></Avatar.Group>
  <Button>Share</Button>
</header>
<Command.Dialog bind:open>
  <Command.Input></Command.Input>
</Command.Dialog>
