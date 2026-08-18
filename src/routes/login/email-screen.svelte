<script lang="ts">
  import { createForm, formOptions } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import z from "zod";

  import { authClient } from "#lib/auth-client.ts";
  import * as Field from "#lib/components/ui/field/index.ts";

  let { step = $bindable() }: { step: "method" | "email" | "verify" } = $props();

  const schema = z.object({
    email: z.email(),
  });

  const formOpts = formOptions({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: schema,
    },
  });

  const form = createForm(() => ({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: value.email,
        type: "sign-in",
      });

      if (error) {
        toast.error("error");
        return;
      }
    },
  }));
</script>

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
