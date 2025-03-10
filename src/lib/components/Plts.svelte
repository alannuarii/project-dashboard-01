<script>
	import Battery from './Battery.svelte';
	import WeatherStation from './WeatherStation.svelte';

	export let weatherData;
	export let it1Data;
	export let it2Data;
	export let lvsw1Data;
	export let lvsw2Data;

	const isDataAvailable = (data) => data && data.length > 0;

	console.log(lvsw1Data);
	console.log(lvsw2Data);
</script>

<div class="card rounded-0 border-4 p-2">
	<div class="mb-2">
		<h5>PLTS</h5>
		{#if isDataAvailable(lvsw1Data) || isDataAvailable(lvsw2Data)}
			{#if lvsw1Data[0]._value + lvsw2Data[0]._value !== 0}
				<span class="badge rounded-0 text-bg-success">Operating</span>
			{:else}
				<span class="badge rounded-0 text-bg-warning">Standby</span>
			{/if}
		{/if}
	</div>
	{#if isDataAvailable(lvsw1Data) || isDataAvailable(lvsw2Data)}
		<div class="row gx-2">
			<div class="col-4">
				<div class="card rounded-0 mb-2">
					<div class="card-header">Active Power</div>
					<div class="card-body">
						<h6>{(lvsw1Data[0]._value + lvsw2Data[0]._value).toFixed(0)} kW</h6>
					</div>
				</div>
			</div>
			<div class="col-4">
				<div class="card rounded-0 mb-2">
					<div class="card-header">Reactive Power</div>
					<div class="card-body">
						<h6>{(lvsw1Data[4]._value + lvsw2Data[4]._value).toFixed(0)} kVAR</h6>
					</div>
				</div>
			</div>
			<div class="col-4">
				<div class="card rounded-0 mb-2">
					<div class="card-header">Power Factor</div>
					<div class="card-body">
						<h6>
							{lvsw1Data[3]._value !== 0
								? lvsw1Data[3]._value.toFixed(2)
								: lvsw2Data[3]._value.toFixed(2)}
						</h6>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<h5 class="text-center">Loading</h5>
	{/if}

	<!-- BSS  -->
	<Battery {it1Data} {it2Data} />

	<!-- Weather Station  -->
	<WeatherStation {weatherData} />
</div>

<style>
	h5 {
		margin: 0px;
		font-size: 0.9rem;
		font-weight: 600;
	}
	h6,
	.card-header {
		margin: 0px;
		font-size: 0.7rem;
	}
	.card-header,
	.card-body {
		padding: 0.5rem;
	}
</style>
