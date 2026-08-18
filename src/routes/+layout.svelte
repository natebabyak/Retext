<script lang="ts">
  import "./layout.css";
  import "katex/dist/katex.min.css";

  let { children } = $props();
</script>

<svelte:head>
  <link href="#lib/assets/favicon.svg" rel="icon" />
  <title>LaTeXdex</title>
  <meta name="description" content="The AI-native LaTeX platform for humans and agents" />
</svelte:head>

{@render children()}
