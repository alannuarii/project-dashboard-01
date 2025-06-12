<script>
	export let weatherData;

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
		}
	};

	const getValueByField = (field) => {
		if (!weatherData) return fallbackValue;
		const item = weatherData.find((d) => d._field === field);
		return item ? item._value.toFixed(0) : fallbackValue;
	};
</script>

<div class="card rounded-0 mb-2">
	<div class="card-header bg-dark text-light">Weather Station</div>
	<div class="card-body bg-dark">
		<div class="d-flex flex-wrap justify-content-between">
			{#each dataFields as field}
				<div
					class="card card-ws rounded-0 mb-2 {field.includes('Wind') ||
					field.includes('Air') ||
					field.includes('External')
						? 'd-none d-md-block'
						: ''}"
				>
					<div class="card-header bg-dark text-light text-wrap">{field}</div>
					<div class="card-body bg-dark-subtle">
						<h6>{getValueByField(field)} {units(field)}</h6>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
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
