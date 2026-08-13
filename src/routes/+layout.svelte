<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import Footer from "#lib/components/footer.svelte";
	import Header from "#lib/components/header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon}>
	<title>LaTeXdex</title>
	<meta name="description" content="">
</svelte:head>

<Header />
{@render children()}
<Footer />
