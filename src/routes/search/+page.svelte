<script lang="ts">
import Funnel from "@lucide/svelte/icons/funnel";
import SearchIcon from "@lucide/svelte/icons/search";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Card from "#lib/components/ui/card/index.ts";
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
import { getArtifacts } from "./artifacts.remote";
</script>

<main>
	<div class="max-w-xs w-full mx-auto sticky top-4 gap-2 flex">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search anything..." />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
		</InputGroup.Root>
		<Button size="icon" variant="outline">
			<Funnel />
		</Button>
	</div>
	<ul>
		{#each await getArtifacts() as artifact}
			<li>
				<Card.Root>
					<Card.Header>
						<Card.Title>
							{artifact.title}
						</Card.Title>
						<Card.Description>
							{artifact.description}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			</li>
		{/each}
	</ul>
</main>
