<script>
	export let unit;
	export let dgData;

	const isDataAvailable = (data) => data && data.length > 0;

	const showValue = (val, digits = 2, suffix = '') =>
		val && val > 0 ? `${val.toFixed(digits)}${suffix}` : `0${suffix}`;
</script>

<div class="card bg-dark rounded-0 border-2 border-light p-2 offset-md-2 col-md-8">
	<div class="mb-2">
		<h5 class="text-light">Unit {unit}</h5>
		<span class="badge rounded-0 {isDataAvailable(dgData) ? 'text-bg-success' : 'text-bg-secondary'}">
			{isDataAvailable(dgData) ? 'Operating' : 'Standby'}
		</span>
	</div>

	{#if isDataAvailable(dgData)}
		<!-- Power Cards -->
		{#each [
			{ title: 'Active Power', index: 0, digits: 0, suffix: ' kW' },
			{ title: 'Reactive Power', index: 6, digits: 0, suffix: ' kVAR' },
			{ title: 'Power Factor', index: 5, digits: 2, suffix: '' }
		] as item}
			<div class="card rounded-0 mx-2 mb-2">
				<div class="card-header bg-dark text-light">{item.title}</div>
				<div class="card-body bg-dark-subtle">
					<h6>{showValue(dgData[item.index]?._value, item.digits, item.suffix)}</h6>
				</div>
			</div>
		{/each}

		<!-- Voltage Section -->
		<div class="card bg-dark rounded-0 border-0 p-2">
			<h6 class="text-light mb-2">Voltage Generator</h6>
			<div class="row gx-0">
				{#each [
					{ label: 'Voltage L1-L2', index: 7 },
					{ label: 'Voltage L2-L3', index: 8 },
					{ label: 'Voltage L3-L1', index: 9 }
				] as v}
					<div class="col-4">
						<div class="card rounded-0">
							<div class="card-header bg-dark text-light">{v.label}</div>
							<div class="card-body bg-dark-subtle">
								<h6>{showValue(dgData[v.index]?._value)}</h6>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current Section -->
		<div class="card bg-dark rounded-0 border-0 p-2">
			<h6 class="text-light mb-2">Current Generator</h6>
			<div class="row gx-0">
				{#each [
					{ label: 'Current L1', index: 1 },
					{ label: 'Current L2', index: 2 },
					{ label: 'Current L3', index: 3 }
				] as c}
					<div class="col-4">
						<div class="card rounded-0">
							<div class="card-header bg-dark text-light">{c.label}</div>
							<div class="card-body bg-dark-subtle">
								<h6>{showValue(dgData[c.index]?._value)}</h6>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Placeholder when loading -->
		<div class="text-center text-light p-3">
			<div class="spinner-border text-light mb-2" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
			<p>Memuat data unit {unit}...</p>
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
</style>
