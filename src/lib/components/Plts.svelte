<script>
	import Battery from './Battery.svelte';
	import WeatherStation from './WeatherStation.svelte';

	export let weatherData;
	export let it1Data;
	export let it2Data;
	export let lvsw1Data;
	export let lvsw2Data;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card bg-dark rounded-0 border-2 border-light p-2">
	<div class="mb-2">
		<a href="/plts" class="unit d-block text-light">PLTS</a>
		{#if lvsw1Data[0]?._value + lvsw2Data[0]?._value === 0}
			<span class="badge rounded-0 text-bg-warning">Standby</span>
		{:else}
			<span class="badge rounded-0 text-bg-success">Operating</span>
		{/if}
	</div>
	{#if isDataAvailable(lvsw1Data) || isDataAvailable(lvsw2Data)}
		<div class="row gx-2">
			<div class="col-md-4">
				<div class="card rounded-0 mb-2">
					<div class="card-header bg-dark text-light">Active Power</div>
					<div class="card-body bg-dark-subtle">
						<h6>{(lvsw1Data[0]?._value + lvsw2Data[0]?._value).toFixed(0)} kW</h6>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Reactive Power</div>
					<div class="card-body bg-dark-subtle">
						<h6>{(lvsw1Data[4]?._value + lvsw2Data[4]?._value).toFixed(0)} kVAR</h6>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Power Factor</div>
					<div class="card-body bg-dark-subtle">
						<h6>
							{lvsw1Data[3]?._value !== 0
								? lvsw1Data[3]?._value.toFixed(2)
								: lvsw2Data[3]?._value.toFixed(2)}
						</h6>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="row gx-2">
			<div class="col-md-4">
				<div class="card rounded-0 mb-2">
					<div class="card-header bg-dark text-light">Active Power</div>
					<div class="card-body bg-dark-subtle">
						<h6>0 kW</h6>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Reactive Power</div>
					<div class="card-body bg-dark-subtle">
						<h6>0 kVAR</h6>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Power Factor</div>
					<div class="card-body bg-dark-subtle">
						<h6>0</h6>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- BSS  -->
	<Battery {it1Data} {it2Data} />

	<!-- Weather Station  -->
	<WeatherStation {weatherData} />
</div>

<style>
	.unit {
		margin: 0px;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
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
