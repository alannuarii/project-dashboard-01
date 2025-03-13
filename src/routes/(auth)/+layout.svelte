<svelte:head>
	<title>Login | Dashboard PLTD Tahuna</title>
	<meta name="description" content="Dashboard PLTD Tahuna" />
</svelte:head>

<main class="container-fluid d-flex justify-content-center align-items-center">
	<slot />
</main>

<style>
	main {
		background-image: url('../../lib/img/bg.jpg');
		background-size: cover;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
