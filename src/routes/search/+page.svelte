<script lang="ts">
import BirdIcon from "@lucide/svelte/icons/bird";
import Funnel from "@lucide/svelte/icons/funnel";
import SearchIcon from "@lucide/svelte/icons/search";
import Footer from "#lib/components/footer.svelte";
import Header from "#lib/components/header.svelte";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Card from "#lib/components/ui/card/index.ts";
import * as Empty from "#lib/components/ui/empty/index.ts";
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
import { Skeleton } from "#lib/components/ui/skeleton/index.ts";
import { getArtifacts } from "./artifacts.remote";

let q = $state("");
</script>

<div class="min-h-screen">
  <Header />
  <main class="flex-1">
    <div class="max-w-xs w-full mx-auto sticky top-4 gap-2 flex">
      <InputGroup.Root>
        <InputGroup.Input placeholder="Search anything..." bind:value={q} />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <Button size="icon" variant="outline">
        <Funnel />
      </Button>
    </div>
    {#await getArtifacts({ q })}
      <ul class="grid sm:grid-cols-2 grid-cols-1 p-4 gap-4 md:grid-cols-3">
        {#each { length: 20 } as _}
          <li>
            <Card.Root>
              <Card.Header>
                <Skeleton class="w-full h-4" />
                <Skeleton class="w-full h-3.5" />
              </Card.Header>
              <Card.Content>
                <Skeleton class="w-full h-24" />
              </Card.Content>
            </Card.Root>
          </li>
        {/each}
      </ul>
    {:then artifacts}
      {#if artifacts.length > 0}
        <ul>
          {#each artifacts as { title, description }}
            <li>
              <Card.Root>
                <Card.Header>
                  <Card.Title>{title}</Card.Title>
                  <Card.Description>{description}</Card.Description>
                </Card.Header>
              </Card.Root>
            </li>
          {/each}
        </ul>
      {:else}
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="icon">
              <BirdIcon />
            </Empty.Media>
            <Empty.Title>No Artifacts Found</Empty.Title>
            <Empty.Description>
              We couldn't find any artifacts matching your search. Maybe this is
              a sign that you should create a new artifact.
            </Empty.Description>
          </Empty.Header>
          <Empty.Content>
            <div class="flex gap-2">
              <Button>Create Artifact</Button>
              <Button variant="outline">Clear Search</Button>
            </div>
          </Empty.Content>
        </Empty.Root>
      {/if}
    {/await}
  </main>
  <Footer />
</div>
