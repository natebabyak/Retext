<script lang="ts">
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { Button } from "#lib/components/ui/button/index.ts";
	import * as Card from "#lib/components/ui/card/index.ts";
</script>

<main>
	<Card.Root>
		<Card.Header>
			<Card.Title>Free</Card.Title>
			<Card.Description>$0/month</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button>
				Get Started
				<ArrowRightIcon />
			</Button>
		</Card.Content>
		<Card.Footer> </Card.Footer>
	</Card.Root>
</main>
