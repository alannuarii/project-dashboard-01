<script>
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Dashboard PLTD Tahuna</title>
	<meta name="description" content="Dashboard PLTD Tahuna" />
</svelte:head>

<main class="desktop bg-dark">
	<Header />

	<div class="content px-0">
		<slot />
	</div>
</main>

<style>
	.content {
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
		padding-top: 55px;
		/* padding-bottom: 50px; */
	}
	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		.content {
			padding-top: 60px;
		}
	}
</style>
