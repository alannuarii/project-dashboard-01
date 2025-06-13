<script>
	import Unit from '$lib/components/detail/Unit.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import Error from '$lib/components/Error.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let dgData = [];
	let error = null;

	let unitId = get(page).params.unit;

	const fetchData = async () => {
		try {
			const dgRes = await fetch(`/api/dg${unitId}`);

			if (!dgRes.ok) {
				throw new Error('Failed to fetch data');
			}

			const dg1 = await dgRes.json();
			dgData = dg1;
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
			<Error message={error} />
		{:else}
			<div class="row text-center">
				<h4 class="text-light mb-2 d-md-none">Dashboard PLTD Tahuna</h4>
				<div class="mb-2 d-md-none"><Timer /></div>
				{#if isDataAvailable(dgData)}
					<h5 class="text-light mb-2">{dgData[4]?._value.toFixed(2)} Hz</h5>
				{:else}
					<h5 class="text-light mb-2">0 Hz</h5>
				{/if}
				<div>
					<Unit unit={unitId} {dgData} />
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
