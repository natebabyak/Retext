<script lang="ts">
  import { resolve } from "$app/paths";
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";
  import { redirect } from "@sveltejs/kit";
  import { createForm, formOptions } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import z from "zod";

  import { authClient } from "#lib/auth-client.ts";
  import RetextIcon from "#lib/components/retext-icon.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";
  import * as Field from "#lib/components/ui/field/index.js";
  import { Input } from "#lib/components/ui/input/index.ts";
  import { Separator } from "#lib/components/ui/separator/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";

  import EmailScreen from "./email-screen.svelte";
  import MethodScreen from "./method-screen.svelte";
  import UsernameScreen from "./username-screen.svelte";
  import VerifyScreen from "./verify-screen.svelte";

  let step = $state<"method" | "email" | "verify" | "username">("method");
</script>

<Card.Root>
  <Card.Header>
    <RetextIcon class="size-8" />
  </Card.Header>
  <Card.Content></Card.Content>
  <Card.Footer>
    <p>
      <a href={resolve("/terms")}>Terms of Service</a>
      and
      <a href={resolve("/privacy")}>Privacy Policy</a>
    </p>
  </Card.Footer>
</Card.Root>

<div class="relative h-screen w-full">
  <header class="flex p-4">
    <a href={resolve("/")} class="text-"> Retext </a>
  </header>
  <Card.Root class="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
    <Card.Content>
      <form
        onsubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Field.Group>
          <form.Field name="email">
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
              </Field.Field>
            {/snippet}
          </form.Field>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
              isTouched: state.isTouched,
            })}
          >
            {#snippet children({ canSubmit, isSubmitting, isTouched })}
              <Button disabled={!isTouched || !canSubmit || isSubmitting} size="lg" type="submit">
                {#if isSubmitting}
                  <Spinner />
                {:else}
                  Continue with email
                {/if}
              </Button>
            {/snippet}
          </form.Subscribe>
          <div class="flex items-center gap-2">
            <Separator class="flex-1" />
            <p>or</p>
            <Separator class="flex-1" />
          </div>
          <Field.Field></Field.Field>
        </Field.Group>
      </form>
    </Card.Content>
    <Card.Footer></Card.Footer>
  </Card.Root>
</div>
