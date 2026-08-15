<script lang="ts">
import { Button } from "#lib/components/ui/button/index.ts";
import * as Card from "#lib/components/ui/card/index.ts";
</script>

<main class="grid grid-cols-3 gap-4 p-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Free</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<Button variant="outline" class="w-full">Get started for free</Button>
		</Card.Content>
		<Card.Footer>
			<ul>
				<li></li>
			</ul>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Pro</Card.Title>
			<Card.Description>For power users</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<span class="text-3xl tracking-tighter font-medium">$20</span>
				<span class="text-xs text-muted-foreground">/mo</span>
			</div>
			<Button class="w-full">Upgrade to Pro</Button>
		</Card.Content>
		<Card.Footer>
			<ul>
				<li>Unlimited projects</li>
				<li>Real-time collaboration</li>
			</ul>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Max</Card.Title>
			<Card.Description>For</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<span class="text-3xl tracking-tighter font-medium">$50</span>
				<span class="text-xs text-muted-foreground">/mo</span>
			</div>
			<Button variant="outline" class="w-full">Upgrade to Max</Button>
		</Card.Content>
		<Card.Footer>
			<ul></ul>
		</Card.Footer>
	</Card.Root>
</main>
