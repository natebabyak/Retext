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
  <title>Retext</title>
  <meta
    name="description"
    content="Retext is the AI-native markup platform. Built by humans and agents; for humans and agents."
  />
</svelte:head>

<ModeWatcher />
<Toaster />
<Tooltip.Provider delayDuration={300}>
  {@render children()}
</Tooltip.Provider>
