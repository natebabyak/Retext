<script lang="ts">
import { EditorState } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror";
import { latex } from "codemirror-lang-latex";
import katex from "katex";
import { onDestroy, onMount } from "svelte";
import * as Resizable from "#lib/components/ui/resizable/index.ts";

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
  <Resizable.Pane>
    <div bind:this={editorContainer}></div>
  </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane> {@html katex.renderToString(editorContent)} </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
