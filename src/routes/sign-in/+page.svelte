<script lang="ts">
import GithubIcon from "@iconify-svelte/mdi/github";
import GoogleIcon from "@iconify-svelte/mdi/google";
import PhoneIcon from "@lucide/svelte/icons/phone";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Card from "#lib/components/ui/card/index.ts";
import * as Field from "#lib/components/ui/field/index.js";
import { Input } from "#lib/components/ui/input/index.ts";
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
import { Separator } from "#lib/components/ui/separator/index.ts";
</script>

<main>
	<Card.Root class="max-w-sm w-full mx-auto">
		<Card.Header>
			<Card.Title>Get Started</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content class="flex-col flex gap-4">
			<div class="flex flex-col gap-2">
				<Button size="lg">
					<PhoneIcon />
					Continue with Phone
				</Button>
				<Button size="lg">
					<GithubIcon />
					Continue with GitHub
				</Button>
				<Button size="lg">
					<GoogleIcon />
					Continue with Google
				</Button>
			</div>
			<div class="flex items-center gap-2">
				<Separator class="flex-1" />
				<p>or</p>
				<Separator class="flex-1" />
			</div>
			<form>
				<Field.Group>
					<Field.Field>
						<Field.Label>Email</Field.Label>
						<Input />
					</Field.Field>
				</Field.Group>
				<Button size="lg" type="submit"> Continue with Email </Button>
			</form>
		</Card.Content>
		<Card.Footer> </Card.Footer>
	</Card.Root>
</main>
