<script lang="ts">
import "./layout.css";

let { children } = $props();
</script>

<svelte:head>
  <link href="#lib/assets/favicon.svg" rel="icon">
  <title>LaTeXdex</title>
  <meta
    name="description"
    content="LaTeX and Markdown prompts, skills, snippets, templates, and more. Built for agents and people."
  >
</svelte:head>

{@render children()}
