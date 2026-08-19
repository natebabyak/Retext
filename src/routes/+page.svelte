<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import SearchIcon from "@lucide/svelte/icons/search";

  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";
  import { Separator } from "#lib/components/ui/separator/index.ts";
  import * as Table from "#lib/components/ui/table/index.ts";
</script>

<Header />
<section class="space-y-4">
  <h1 class="max-w-3xl text-5xl leading-tight font-medium tracking-tighter text-balance">
    The collaborative markup platform for humans and agents
  </h1>
  <p class="text-muted-foreground text-balance">
    Research, write, and share at the speed of thought.
  </p>
  <div class="flex gap-2">
    <Button href="/sign-up" size="lg">
      Get Started
      <ArrowRight />
    </Button>
    <Button href="/pricing" size="lg" variant="outline">See Pricing</Button>
  </div>
</section>
<Separator />
<section>
  <h2 class="text-center text-3xl font-medium">Pricing</h2>
  <Table.Root>
    <Table.Header></Table.Header>
    <Table.Body></Table.Body>
  </Table.Root>
  <div>
    <Card.Header>Free</Card.Header>
  </div>
  <Separator orientation="vertical" />
  <Separator orientation="vertical" />
</section>
<Footer />
