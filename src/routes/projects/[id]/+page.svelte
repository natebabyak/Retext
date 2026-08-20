<script lang="ts">
  import { EditorState } from "@codemirror/state";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Plus from "@lucide/svelte/icons/plus";
  import { basicSetup, EditorView } from "codemirror";
  import { latex } from "codemirror-lang-latex";
  import katex from "katex";
  import { onDestroy, onMount } from "svelte";

  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Resizable from "#lib/components/ui/resizable/index.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";

  // eslint-disable-next-line
  let editorContainer: HTMLDivElement;
  let view: EditorView;

  let editorContent = $state("");

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      editorContent = update.state.doc.toString();
    }
  });

  let editorState = EditorState.create({
    doc: "Start document",
    extensions: [basicSetup, latex(), updateListener],
  });

  onMount(() => {
    view = new EditorView({
      state: editorState,
      parent: editorContainer,
    });
  });

  onDestroy(() => {
    if (view) {
      view.destroy();
    }
  });
</script>

<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane minSize={20} collapsible>
    <div class="p-2">
      <InputGroup.Root>
        <InputGroup.Textarea placeholder="Ask anything..." />
        <InputGroup.Addon align="block-end">
          <Tooltip.Root>
            <Tooltip.Trigger>
              {#snippet child({ props })}
                <InputGroup.Button {...props} size="icon-xs" variant="secondary">
                  <Plus />
                </InputGroup.Button>
              {/snippet}
            </Tooltip.Trigger>
            <Tooltip.Content>Add attachment</Tooltip.Content>
          </Tooltip.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <InputGroup.Button {...props} variant="ghost">
                  Options
                  <ChevronDown />
                </InputGroup.Button>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.GroupHeading>Mode</DropdownMenu.GroupHeading>
                <DropdownMenu.Item>Auto</DropdownMenu.Item>
                <DropdownMenu.Item>Agent</DropdownMenu.Item>
                <DropdownMenu.Item>Ask</DropdownMenu.Item>
                <DropdownMenu.Item>Plan</DropdownMenu.Item>
                <DropdownMenu.Item>Research</DropdownMenu.Item>
                <DropdownMenu.Item>Write</DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Group>
                <DropdownMenu.GroupHeading>Reasoning</DropdownMenu.GroupHeading>
                <DropdownMenu.Item>Auto</DropdownMenu.Item>
                <DropdownMenu.Item>Low</DropdownMenu.Item>
                <DropdownMenu.Item>Medium</DropdownMenu.Item>
                <DropdownMenu.Item>High</DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <InputGroup.Button size="icon-xs" variant="default" class="ml-auto">
            <ArrowUp />
          </InputGroup.Button>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>
    <div bind:this={editorContainer}></div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>{@html katex.renderToString(editorContent)}</Resizable.Pane>
</Resizable.PaneGroup>
