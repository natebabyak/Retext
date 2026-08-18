<script lang="ts">
  import DotField from "#lib/components/dot-field.svelte";
  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
</script>

<Header />
<section
  class="flex min-h-[80vh] relative bg-primary rounded-4xl max-w-7xl flex-col gap-8 justify-center items-center"
>
  <h1 class="tracking-tighter max-w-3xl text-5xl text-center text-primary-foreground text-balance">
    Beautiful markup made as easy as copy and paste
  </h1>
  <p class="text-primary-foreground">
    Search from thousands of prompts, snippets, templates, and more. Start using them in seconds
  </p>
  <div class="flex gap-2">
    <Button href="/sign-up" size="lg" variant="outline">Get Started</Button>
    <Button href="/pricing" size="lg">See Pricing</Button>
  </div>
  <DotField class="absolute top-0 right-0 left-0 bottom-0" />
</section>
<section>
  <h2 class="text-center text-5xl tracking-tighter">Built for the agent era</h2>
</section>
<Footer />
