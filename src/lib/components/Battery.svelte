<script>
	export let it1Data;
	export let it2Data;

	const isDataAvailable = (data) => data && data.length > 0;
</script>

<div class="card rounded-0 mb-2">
	<div class="card-header bg-dark text-light">Battery Storage System</div>
	<div class="card-body bg-dark">
		{#if isDataAvailable(it1Data) || isDataAvailable(it2Data)}
			<div class="row gx-2">
				<div class="col-6">
					<div class="card rounded-0 mb-2">
						<div class="card-header bg-dark text-light">Feeder #1</div>
						<div class="card-body bg-dark-subtle">
							<h6>{it1Data[0]._value.toFixed(0)} kW</h6>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="card rounded-0 mb-2">
						<div class="card-header bg-dark text-light">Feeder #2</div>
						<div class="card-body bg-dark-subtle">
							<h6>{it2Data[0]._value.toFixed(0)} kW</h6>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<h5 class="text-center">Loading</h5>
		{/if}
		{#if isDataAvailable(it1Data) || isDataAvailable(it2Data)}
			<div class="row gx-2">
				<div class="col-6">
					<div class="card rounded-0 mb-2">
						<div class="card-header bg-dark text-light">Status</div>
						<div class="card-body bg-dark-subtle">
							{#if it1Data[0]._value > 0}
								<h6>Discharging</h6>
							{:else if it1Data[0]._value <= -1}
								<h6>Charging</h6>
							{:else}
								<h6>-</h6>
							{/if}
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="card rounded-0 mb-2">
						<div class="card-header bg-dark text-light">Status</div>
						<div class="card-body bg-dark-subtle">
							{#if it2Data[0]._value > 0}
								<h6>Discharging</h6>
							{:else if it2Data[0]._value <= -1}
								<h6>Charging</h6>
							{:else}
								<h6>-</h6>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{:else}
			<h5 class="text-center">Loading</h5>
		{/if}
	</div>
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
