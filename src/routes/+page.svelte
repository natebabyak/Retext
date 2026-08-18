<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import SearchIcon from "@lucide/svelte/icons/search";

  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
</script>

<Header />
<section class="relative flex max-w-7xl flex-col items-center justify-center gap-8 rounded-4xl">
  <h1 class="max-w-3xl text-center text-5xl tracking-tighter text-balance">
    The AI-native markup platform
  </h1>
  <p>
    Search from thousands of prompts, snippets, templates, and more. Start using them in seconds
  </p>
  <div class="flex gap-2">
    <Button href="/sign-up" size="lg">
      Get Started
      <ArrowRight />
    </Button>
    <Button href="/pricing" size="lg" variant="outline">See Pricing</Button>
  </div>
</section>
<section>
  <InputGroup.Root>
    <InputGroup.Input />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
  </InputGroup.Root>
  <h2 class="text-center text-5xl tracking-tighter">Built for the agent era</h2>
</section>
<Footer />
