<script lang="ts">
import { basicSetup, EditorView } from "codemirror";
import { latex } from "codemirror-lang-latex";
import { onDestroy, onMount } from "svelte";

let editorContainer: HTMLDivElement;
let view: EditorView;

onMount(() => {
  view = new EditorView({
    doc: "Start document",
    parent: editorContainer,
    extensions: [basicSetup, latex()],
  });
});

onDestroy(() => {
  if (view) {
    view.destroy();
  }
});
</script>

<div bind:this={editorContainer}></div>
