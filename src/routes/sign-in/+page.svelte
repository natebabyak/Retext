<script lang="ts">
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";
  import { createForm, formOptions } from "@tanstack/svelte-form";
  import z from "zod";
  import { authClient } from "#lib/auth-client.ts";
  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";
  import * as Field from "#lib/components/ui/field/index.js";
  import { Input } from "#lib/components/ui/input/index.ts";
  import { Separator } from "#lib/components/ui/separator/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";

  const formOpts = formOptions({
    defaultValues: {
      email: "",
    },
  });

  const form = createForm(() => ({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await authClient.emailOtp.sendVerificationOtp({
        email: value.email,
        type: "sign-in",
      });
    },
  }));
</script>

<Header />
<main>
  <Card.Root class="max-w-sm w-full mx-auto">
    <Card.Header>
      <Card.Title>Get Started</Card.Title>
      <Card.Description></Card.Description>
    </Card.Header>
    <Card.Content class="flex-col flex gap-4">
      <div class="flex flex-col gap-2">
        <Button
          onclick={async () =>
            await authClient.signIn.social({
              provider: "github",
            })}
        >
          <GithubIcon />
          Continue with GitHub
        </Button>
        <Button
          onclick={async () =>
            await authClient.signIn.social({
              provider: "google",
            })}
        >
          <GoogleIcon />
          Continue with Google
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <Separator class="flex-1" />
        <p>or</p>
        <Separator class="flex-1" />
      </div>
      <form
        onsubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Field.Group>
          <form.Field
            name="email"
            validators={{
              onChange: z.email(),
            }}
          >
            {#snippet children(field)}
              <Field.Field>
                <Field.Label>Email</Field.Label>
                <Input
                  name={field.name}
                  onblur={field.handleBlur}
                  value={field.state.value}
                  oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
                />
              </Field.Field>
            {/snippet}
          </form.Field>
        </Field.Group>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {#snippet children(state)}
            <Button disabled={!state.canSubmit || state.isSubmitting} type="submit">
              {#if state.isSubmitting}
                <Spinner />
              {:else}
                Continue with Email
              {/if}
            </Button>
          {/snippet}
        </form.Subscribe>
      </form>
    </Card.Content>
    <Card.Footer>
      Already have an account? <a href="/sign-up">Sign up</a>
    </Card.Footer>
  </Card.Root>
</main>
<Footer />
