<script lang="ts">
import "./layout.css";
import Footer from "#lib/components/footer.svelte";
import Header from "#lib/components/header.svelte";

let { children } = $props();
</script>

<svelte:head>
	<link href="#lib/assets/favicon.svg" rel="icon">
	<title>LaTeXdex</title>
	<meta
		name="description"
		content="LaTeX and Markdown prompts, skills, snippets, templates, and more. Built for agents and people."
	>
</svelte:head>

<Header />
{@render children()}
<Footer />
