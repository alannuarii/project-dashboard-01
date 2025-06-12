<script>
	export let weatherData;
	export let it1Data;
	export let it2Data;
	export let lvsw1Data;
	export let lvsw2Data;

	const fallbackValue = 0;

	const dataFields = [
		'Air Temperature',
		'External Temperature',
		'Global Irradiance',
		'Relative Humidity',
		'Wind Direction',
		'Wind Speed'
	];

	const units = (field) => {
		if (field.includes('Temperature')) return '°C';
		if (field === 'Global Irradiance') return 'W/m2';
		if (field === 'Wind Direction') return '°';
		if (field === 'Wind Speed') return 'm/s';
		if (field === 'Relative Humidity') return '%';
		return '';
	};

	const getValueByField = (field) => {
		if (!weatherData) return fallbackValue;
		const item = weatherData.find((d) => d._field === field);
		return item ? item._value.toFixed(0) : fallbackValue;
	};

	const isDataAvailable = (data) => Array.isArray(data) && data.length > 0;
</script>

<div class="card bg-dark rounded-0 border-2 border-light p-2 offset-md-2 col-md-8">
	<!-- PLTS -->
	<div class="mb-2">
		<h5 class="text-light">PLTS</h5>
		{#if lvsw1Data && lvsw2Data}
			{#if lvsw1Data[0]?._value + lvsw2Data[0]?._value === 0}
				<span class="badge rounded-0 text-bg-warning">Standby</span>
			{:else}
				<span class="badge rounded-0 text-bg-success">Operating</span>
			{/if}
		{:else}
			<div class="spinner-border spinner-border-sm text-light" role="status"></div>
		{/if}
	</div>

	{#if isDataAvailable(lvsw1Data) && isDataAvailable(lvsw2Data) && isDataAvailable(it1Data) && isDataAvailable(it2Data) && isDataAvailable(weatherData)}
		<div class="row gx-2">
			{#each [{ label: 'Active Power', value: (lvsw1Data[0]?._value + lvsw2Data[0]?._value).toFixed(0) + ' kW' }, { label: 'Reactive Power', value: (lvsw1Data[4]?._value + lvsw2Data[4]?._value).toFixed(0) + ' kVAR' }, { label: 'Power Factor', value: lvsw1Data[3]?._value !== 0 ? lvsw1Data[3]?._value.toFixed(2) : lvsw2Data[3]?._value.toFixed(2) }] as card}
				<div class="col-md-4">
					<div class="card rounded-0 mb-2">
						<div class="card-header bg-dark text-light">{card.label}</div>
						<div class="card-body bg-dark-subtle">
							<h6>{card.value}</h6>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<!-- Battery Storage System -->
		<div class="card rounded-0 mb-2">
			<div class="card-header bg-dark text-light">Battery Storage System</div>
			<div class="card-body bg-dark">
				<div class="row gx-2">
					{#each [{ label: 'Feeder #1', value: it1Data[0]._value.toFixed(0) + ' kW' }, { label: 'Feeder #2', value: it2Data[0]._value.toFixed(0) + ' kW' }] as card}
						<div class="col-6">
							<div class="card rounded-0 mb-2">
								<div class="card-header bg-dark text-light">{card.label}</div>
								<div class="card-body bg-dark-subtle">
									<h6>{card.value}</h6>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="row gx-2">
					{#each [{ value: it1Data[0]._value }, { value: it2Data[0]._value }] as d}
						<div class="col-6">
							<div class="card rounded-0 mb-2">
								<div class="card-header bg-dark text-light">Status</div>
								<div class="card-body bg-dark-subtle">
									<h6>
										{d.value > 0 ? 'Discharging' : d.value <= -1 ? 'Charging' : '-'}
									</h6>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Weather Station -->
		<div class="card rounded-0 mb-2">
			<div class="card-header bg-dark text-light">Weather Station</div>
			<div class="card-body bg-dark">
				<div class="d-flex flex-wrap justify-content-between">
					{#each dataFields as field}
						<div class="card card-ws rounded-0 mb-2">
							<div class="card-header bg-dark text-light text-wrap">{field}</div>
							<div class="card-body bg-dark-subtle">
								<h6>{getValueByField(field)} {units(field)}</h6>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<!-- Spinner Placeholder -->
		<div class="text-center text-light p-3">
			<div class="spinner-border text-light mb-2" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			<p>Memuat data PLTS Sangihe...</p>
		</div>
	{/if}
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

	.card-ws {
		width: 32%;
	}

	@media screen and (max-width: 1000px) {
		.card-ws {
			width: 49%;
		}
	}
</style>
