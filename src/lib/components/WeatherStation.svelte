<script>
	export let weatherData;

	const units = (field) => {
		if (field === 'External Temperature' || field === 'Air Temperature') {
			return '°C';
		} else if (field === 'Global Irradiance') {
			return 'W/m2';
		} else if (field === 'Wind Direction') {
			return '°';
		} else if (field === 'Wind Speed') {
			return 'm/s';
		} else if (field === 'Relative Humidity') {
			return '%';
		} else if (field.includes('Voltage')) {
			return 'V';
		} else if (field.includes('Current')) {
			return 'A';
		} else if (field === 'Generator Frequency') {
			return 'Hz';
		} else if (field === 'Power Factor') {
			return '';
		} else if (field === 'Active Power') {
			return 'kW';
		} else if (field === 'Reactive Power') {
			return 'kVAR';
		}
	};

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card rounded-0 mb-2">
	<div class="card-header bg-dark text-light">Weather Station</div>
	{#if isDataAvailable(weatherData)}
		<div class="card-body bg-dark">
			<div class="d-flex flex-wrap justify-content-between">
				<div class="card card-ws rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Air Temperature</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[0]._value.toFixed(0)} {units(weatherData[0]._field)}</h6>
					</div>
				</div>

				<div class="card card-ws rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">External Temperature</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[1]._value.toFixed(0)} {units(weatherData[1]._field)}</h6>
					</div>
				</div>

				<div class="card card-ws rounded-0 mb-2">
					<div class="card-header bg-dark text-light">Global Irradiance</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[2]._value.toFixed(0)} {units(weatherData[2]._field)}</h6>
					</div>
				</div>

				<div class="card card-ws rounded-0 mb-2">
					<div class="card-header bg-dark text-light">Relative Humidity</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[3]._value.toFixed(0)} {units(weatherData[3]._field)}</h6>
					</div>
				</div>

				<div class="card card-ws rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light">Wind Direction</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[4]._value.toFixed(0)}{units(weatherData[4]._field)}</h6>
					</div>
				</div>

				<div class="card card-ws rounded-0 mb-2 d-none d-md-block">
					<div class="card-header bg-dark text-light text-wrap">Wind Speed</div>
					<div class="card-body bg-dark-subtle">
						<h6>{weatherData[5]._value.toFixed(0)} {units(weatherData[5]._field)}</h6>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<h5 class="text-center">Loading</h5>
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

	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		.card-ws {
			width: 49%;
		}
	}
</style>
