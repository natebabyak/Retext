<script>
import SearchIcon from "@lucide/svelte/icons/search";
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
</script>

<main>
	<InputGroup.Root>
		<InputGroup.Input />
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
	</InputGroup.Root>
</main>
