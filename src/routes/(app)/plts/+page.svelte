<script>
	import Plts from '$lib/components/detail/Plts.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { onMount } from 'svelte';

	let weatherData = [];
	let lvsw1Data = [];
	let lvsw2Data = [];
	let it1Data = [];
	let it2Data = [];
	let error = null;

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const weatherRes = await fetch('/api/weather-station');
			const lvsw1Res = await fetch('/api/lvsw1');
			const lvsw2Res = await fetch('/api/lvsw2');
			const it1Res = await fetch('/api/it1');
			const it2Res = await fetch('/api/it2');

			// Check if both requests are primaryful
			if (!weatherRes.ok || !lvsw1Res.ok || !lvsw2Res.ok || !it1Res.ok || !it2Res.ok) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const weather = await weatherRes.json();
			const lvsw1 = await lvsw1Res.json();
			const lvsw2 = await lvsw2Res.json();
			const it1 = await it1Res.json();
			const it2 = await it2Res.json();

			// Update the weatherData and dg7Data arrays
			weatherData = weather;
			lvsw1Data = lvsw1;
			lvsw2Data = lvsw2;
			it1Data = it1;
			it2Data = it2;
		} catch (err) {
			error = err.message;
		}
	};

	const isDataAvailable = (data) => data && data.length > 0;

	onMount(() => {
		fetchData();

		const interval = setInterval(fetchData, 1000);

		return () => clearInterval(interval);
	});
</script>

<section class="desktop">
	<div class="container-fluid mb-3">
		{#if error}
			<p class="text-center p-5">Error: {error}</p>
		{:else}
			<div class="row text-center">
				<h4 class="text-light mb-2 d-md-none">Dashboard PLTD Tahuna</h4>
				<div class="mb-2 d-md-none"><Timer /></div>
				{#if isDataAvailable(lvsw1Data) || isDataAvailable(lvsw2Data)}
					<h5 class="text-light mb-2">
						{lvsw1Data[2]?._value.toFixed(2) || lvsw2Data[2]?._value.toFixed(2) || 0} Hz
					</h5>
				{:else}
					<h5 class="text-light mb-2">0 Hz</h5>
				{/if}
				<div>
					<Plts {weatherData} {it1Data} {it2Data} {lvsw1Data} {lvsw2Data} />
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	h4 {
		margin: 0px;
		font-size: 1.5rem;
	}
	h5 {
		margin: 0px;
		font-size: 2.3rem;
		font-weight: 900;
	}
</style>
