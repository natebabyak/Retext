<script lang="ts">
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";

  import { authClient } from "#lib/auth-client.ts";
  import { Button } from "#lib/components/ui/button/index.ts";

  let { step = $bindable() }: { step: "method" | "email" | "verify" } = $props();
</script>

<div>
  <Button
    onclick={async () =>
      await authClient.signIn.social({
        provider: "github",
      })}
    size="lg"
    variant="outline"
  >
    <GithubIcon />
    Continue with GitHub
  </Button>
  <Button
    onclick={async () =>
      await authClient.signIn.social({
        provider: "google",
      })}
    size="lg"
    variant="outline"
  >
    <GoogleIcon />
    Continue with Google
  </Button>
  <Button onclick={() => (step = "email")} size="lg" variant="outline">Continue with email</Button>
</div>
