<script lang="ts">
import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
import favicon from "#lib/assets/favicon.svg";
import { Button } from "#lib/components/ui/button/index.ts";
import * as NavigationMenu from "#lib/components/ui/navigation-menu/index.ts";
import { navigationMenuTriggerStyle } from "#lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
</script>

<header class="flex justify-between items-center p-4">
	<a href="/">
		<img alt="LaTeXdex logo" src={favicon}>
		<span class="sr-only">LaTeXdex</span>
	</a>
	<NavigationMenu.Root>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<NavigationMenu.Link>Link</NavigationMenu.Link>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<NavigationMenu.Link>Link</NavigationMenu.Link>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<NavigationMenu.Link>Link</NavigationMenu.Link>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link
					href="/pricing"
					class={navigationMenuTriggerStyle()}
				>
					Pricing
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
	<Button href="/sign-in" size="lg">
		Get Started
		<ArrowRightIcon />
	</Button>
</header>
