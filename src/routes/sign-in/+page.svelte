<script lang="ts">
  import { resolve } from "$app/paths";
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";
  import { createForm, formOptions } from "@tanstack/svelte-form";
  import { REGEXP_ONLY_DIGITS } from "bits-ui";
  import { toast } from "svelte-sonner";
  import { backInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import z from "zod";

  import { authClient } from "#lib/auth-client.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";
  import * as Field from "#lib/components/ui/field/index.js";
  import * as InputOTP from "#lib/components/ui/input-otp/index.ts";
  import { Input } from "#lib/components/ui/input/index.ts";
  import { Separator } from "#lib/components/ui/separator/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";

  let step = $state<"email" | "otp">("email");

  const formOpts = formOptions({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const form = createForm(() => ({
    ...formOpts,
    onSubmit: async ({ value }) => {
      if (step === "email") {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email: value.email,
          type: "sign-in",
        });

        if (error) {
          toast.error("error");
          return;
        }

        step = "otp";
        return;
      }

      const { error } = await authClient.emailOtp.checkVerificationOtp({
        email: value.email,
        type: "sign-in",
        otp: value.otp,
      });

      if (error) {
        toast.error("error");
        return;
      }
    },
  }));
</script>

<h1>Welcome</h1>
<main>
  <Card.Root class="w-sm">
    {#if step === "email"}
      <div in:fly={{ duration: 300, easing: backInOut, x: -8 }}>
        <Card.Content class="space-y-4">
          <form
            onsubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
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
                      autocapitalize="off"
                      autocomplete="email"
                      autocorrect="off"
                      autofocus
                      name={field.name}
                      onblur={field.handleBlur}
                      placeholder="Your email address"
                      value={field.state.value}
                      oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
                    />
                    <Field.Error></Field.Error>
                  </Field.Field>
                {/snippet}
              </form.Field>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting, state.isTouched]}
              >
                {#snippet children([canSubmit, isSubmitting, isTouched])}
                  <Button
                    disabled={!isTouched || !canSubmit || isSubmitting}
                    size="lg"
                    type="submit"
                  >
                    {#if isSubmitting}
                      <Spinner />
                    {:else}
                      Continue with email
                    {/if}
                  </Button>
                {/snippet}
              </form.Subscribe>
            </Field.Group>
          </form>
          <div class="flex items-center gap-2">
            <Separator class="flex-1" />
            <p>or</p>
            <Separator class="flex-1" />
          </div>
          <div class="flex flex-col gap-2">
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
          </div>
        </Card.Content>
      </div>
    {:else}
      <div>
        <Card.Content>
          <p>
            We sent a one-time password to {form.state.values.email}
          </p>
          <InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS}>
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells.slice(0, 3) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                {#each cells.slice(3, 6) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
        </Card.Content>
        <Card.Footer>
          <Button size="lg">Open email app</Button>
          <Button size="lg" variant="ghost">Resend</Button>
        </Card.Footer>
      </div>
    {/if}
  </Card.Root>
</main>
<footer>
  <p>
    <a href={resolve("/terms")}>Terms of Service</a>
    and
    <a href={resolve("/privacy")}>Privacy Policy</a>
  </p>
</footer>
