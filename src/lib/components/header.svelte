<script lang="ts">
  import McpIcon from "@iconify-svelte/bxl/mcp";
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import DatabaseIcon from "@lucide/svelte/icons/database";
  import LogOutIcon from "@lucide/svelte/icons/log-out";
  import PenToolIcon from "@lucide/svelte/icons/pen-tool";
  import SearchIcon from "@lucide/svelte/icons/search";

  import favicon from "#lib/assets/favicon.svg";
  import { authClient } from "#lib/auth-client.ts";
  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import * as Item from "#lib/components/ui/item/index.js";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as NavigationMenu from "#lib/components/ui/navigation-menu/index.ts";
  import { navigationMenuTriggerStyle } from "#lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";

  const SOLUTIONS = [
    {
      href: "/",
      title: "For Authors",
    },
    {
      href: "/",
      title: "For Engineers",
    },
    {
      href: "/",
      title: "For Researchers",
    },
    {
      href: "/",
      title: "For Students",
    },
  ] satisfies Array<{
    href: string;
    title: string;
  }>;

  const session = authClient.useSession();
</script>

<header class="flex justify-between items-center p-4">
  <a href="/">
    <img alt="LaTeXdex logo" src={favicon} />
    <span class="sr-only">LaTeXdex</span>
  </a>
  {#if !$session.data}
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul class="w-lg grid grid-cols-3">
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/editor" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="bg-primary text-primary-foreground bg-linear-to-b from-white/50 to-black/50 p-4 via-transparent"
                        >
                          <PenToolIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>Editor</Item.Title>
                        <Item.Description>
                          The last markup editor you'll ever want to use
                        </Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="bg- text-primary-foreground bg-linear-to-b from-white/25 to-black/25 shadow via-transparent p-4"
                        >
                          <DatabaseIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>Editor</Item.Title>
                        <Item.Description>The last editor you'll ever need</Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="bg-orange-700 text-primary-foreground bg-linear-to-b from-white/25 to-black/25 via-transparent p-4"
                        >
                          <McpIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>MCP</Item.Title>
                        <Item.Description>Let</Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
          <NavigationMenu.Content class="min-w-lg">
            <ul>
              {#each SOLUTIONS as { href, title }}
                <li>
                  <Item.Root>
                    {#snippet child({ props })}
                      <NavigationMenu.Link {href} {...props}>
                        <Item.Content>
                          <Item.Title>{title}</Item.Title>
                        </Item.Content>
                      </NavigationMenu.Link>
                    {/snippet}
                  </Item.Root>
                </li>
              {/each}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content class="min-w-lg">
            <NavigationMenu.Link>Link</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/pricing" class={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  {/if}
  {#if $session.data}
    <div class="flex gap-2 items-center">
      <Button href="/projects" variant="outline">Projects</Button>
      <Button href="/artifacts/search" variant="outline">
        <SearchIcon />
        Artifacts
        <Kbd.Root>&#x2318;K</Kbd.Root>
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar.Root>
            <Avatar.Image src={$session.data.user.image} alt="@shadcn" />
            <Avatar.Fallback>{$session.data.user.name.charAt(0)}</Avatar.Fallback>
          </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onclick={() => authClient.signOut()}>
            <LogOutIcon /> Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  {:else}
    <Button href="/sign-in">
      Get Started
      <ArrowRightIcon />
    </Button>
  {/if}
</header>
