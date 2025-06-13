<script>
	import Unit from '$lib/components/Unit.svelte';
	import Plts from '$lib/components/Plts.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { onMount } from 'svelte';
	import Error from '$lib/components/Error.svelte';

	let dg1Data = [];
	let dg6Data = [];
	let dg7Data = [];
	let dg8Data = [];
	let dg9Data = [];
	let weatherData = [];
	let lvsw1Data = [];
	let lvsw2Data = [];
	let it1Data = [];
	let it2Data = [];
	let error = null;

	const fetchData = async () => {
		try {
			// Fetch data from both APIs
			const dg1Res = await fetch('/api/dg1');
			const dg6Res = await fetch('/api/dg6');
			const dg7Res = await fetch('/api/dg7');
			const dg8Res = await fetch('/api/dg8');
			const dg9Res = await fetch('/api/dg9');
			const weatherRes = await fetch('/api/weather-station');
			const lvsw1Res = await fetch('/api/lvsw1');
			const lvsw2Res = await fetch('/api/lvsw2');
			const it1Res = await fetch('/api/it1');
			const it2Res = await fetch('/api/it2');

			// Check if both requests are primaryful
			if (
				!dg1Res.ok ||
				!dg6Res.ok ||
				!dg7Res.ok ||
				!dg8Res.ok ||
				!dg9Res.ok ||
				!weatherRes.ok ||
				!lvsw1Res.ok ||
				!lvsw2Res.ok ||
				!it1Res.ok ||
				!it2Res.ok
			) {
				throw new Error('Failed to fetch data');
			}

			// Parse both JSON responses
			const dg1 = await dg1Res.json();
			const dg6 = await dg6Res.json();
			const dg7 = await dg7Res.json();
			const dg8 = await dg8Res.json();
			const dg9 = await dg9Res.json();
			const weather = await weatherRes.json();
			const lvsw1 = await lvsw1Res.json();
			const lvsw2 = await lvsw2Res.json();
			const it1 = await it1Res.json();
			const it2 = await it2Res.json();

			// Update the weatherData and dg7Data arrays
			dg1Data = dg1;
			dg6Data = dg6;
			dg7Data = dg7;
			dg8Data = dg8;
			dg9Data = dg9;
			weatherData = weather;
			lvsw1Data = lvsw1;
			lvsw2Data = lvsw2;
			it1Data = it1;
			it2Data = it2;
		} catch (err) {
			error = err.message;
		}
	};

	const noData = [
		{ _value: 'N/A' },
		{ _value: 'N/A' },
		{ _value: 'N/A' },
		{ _value: 'N/A' },
		{ _value: 'N/A' },
		{ _value: 'N/A' },
		{ _value: 'N/A' }
	];

	const notOperating = [
		{ _value: 0 },
		{ _value: 0 },
		{ _value: 0 },
		{ _value: 0 },
		{ _value: 0 },
		{ _value: '-' },
		{ _value: 0 }
	];

	const dgData = (data) => (data && data.length > 0 ? data : notOperating);

	const isDataAvailable = (data) => data && data.length > 0;

	$: frequency = () => {
		if (isDataAvailable(dg9Data)) {
			return dg9Data[4]._value;
		} else if (isDataAvailable(dg8Data)) {
			return dg8Data[4]._value;
		} else if (isDataAvailable(dg7Data)) {
			return dg7Data[4]._value;
		} else if (isDataAvailable(dg6Data)) {
			return dg6Data[4]._value;
		} else if (isDataAvailable(dg1Data)) {
			return dg1Data[4]._value;
		} else {
			return 0.0;
		}
	};

	onMount(() => {
		fetchData();

		const interval = setInterval(fetchData, 1000);

		return () => clearInterval(interval);
	});
</script>

<section class="desktop">
	<div class="container-fluid">
		{#if error}
			<Error message={error} />
		{:else}
			<div class="row text-center">
				<h4 class="text-light mb-2 d-md-none">Dashboard PLTD Tahuna</h4>
				<div class="mb-2 d-md-none"><Timer /></div>
				{#if isDataAvailable(dg9Data) || isDataAvailable(dg8Data) || isDataAvailable(dg7Data) || isDataAvailable(dg6Data) || isDataAvailable(dg1Data)}
					<h5 class="text-light">{frequency().toFixed(2)} Hz</h5>
				{:else}
					<h5 class="text-light">0 Hz</h5>
				{/if}
				<div class="col-md-8">
					<div class="row gx-3">
						<div class="col-md-3 col-6 py-2">
							<Unit unit={1} dgData={dgData(dg1Data)} />
						</div>
						<div class="col-md-3 col-6 py-2">
							<Unit unit={4} dgData={dgData(noData)} />
						</div>
						<div class="col-md-3 col-6 py-2">
							<Unit unit={5} dgData={dgData(noData)} />
						</div>
						<div class="col-md-3 col-6 py-2">
							<Unit unit={6} dgData={dgData(dg6Data)} />
						</div>
					</div>
					<div class="row gx-3">
						<div class="col-md-3 col-6 py-2">
							<Unit unit={7} dgData={dgData(dg7Data)} />
						</div>
						<div class="col-md-3 col-6 py-2">
							<Unit unit={8} dgData={dgData(dg8Data)} />
						</div>
						<div class="col-md-3 col-6 py-2">
							<Unit unit={9} dgData={dgData(dg9Data)} />
						</div>
					</div>
				</div>
				<div class="col-md-4 py-2">
					<Plts {weatherData} {it1Data} {it2Data} {lvsw1Data} {lvsw2Data} />
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- <section class="mobile">
	{#if error}
		<p>Error: {error}</p>
	{:else}
		<h1>Mobile</h1>
	{/if}
</section> -->

<!-- <style>
	.desktop {
		display: block;
	}

	.mobile {
		display: none;
	}

	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		.desktop {
			display: none;
		}
		.mobile {
			display: block !important;
		}
	}
</style> -->

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
