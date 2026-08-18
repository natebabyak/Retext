<script lang="ts">
  import "./layout.css";
  import "katex/dist/katex.min.css";
  import { ModeWatcher } from "mode-watcher";

  import { Toaster } from "#lib/components/ui/sonner/index.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";

  let { children } = $props();
</script>

<svelte:head>
  <link href="#lib/assets/favicon.svg" rel="icon" />
  <title>The AI-native markup platform: LaTeXdex</title>
  <meta
    name="description"
    content="LaTeXdex is the AI-native markup platform. Built by humans and agents; for humans and agents."
  />
</svelte:head>

<ModeWatcher />
<Toaster />
<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
