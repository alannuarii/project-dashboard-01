<script>
	export let unit;
	export let dgData;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card bg-dark rounded-0 border-2 border-light p-2">
	<div class="mb-2">
		<h5 class="text-light">Unit {unit}</h5>
		{#if dgData[0]._value !== 0 && dgData[0]._value !== 'N/A'}
			<span class="badge rounded-0 text-bg-success">Operating</span>
		{:else if dgData[0]._value === 0}
			<span class="badge rounded-0 text-bg-warning">Standby</span>
		{:else}
			<span class="badge rounded-0 text-bg-secondary">Not Available</span>
		{/if}
	</div>
	{#if isDataAvailable(dgData)}
		<div class="card rounded-0 mb-2">
			<div class="card-header bg-dark text-light">Active Power</div>
			<div class="card-body bg-dark-subtle">
				<h6>{dgData[0]._value > 0 ? dgData[0]._value.toFixed(0) : 0} kW</h6>
			</div>
		</div>
		<div class="card rounded-0 mb-2 d-none d-md-block">
			<div class="card-header bg-dark text-light">Reactive Power</div>
			<div class="card-body bg-dark-subtle">
				<h6>{dgData[6]._value > 0 ? dgData[6]._value.toFixed(0) : 0} kVAR</h6>
			</div>
		</div>
		<div class="card rounded-0 d-none d-md-block">
			<div class="card-header bg-dark text-light">Power Factor</div>
			<div class="card-body bg-dark-subtle">
				<h6>{dgData[5]._value > 0 ? dgData[5]._value.toFixed(2) : 0}</h6>
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
</style>
