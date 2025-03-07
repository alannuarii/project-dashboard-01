<script>
	export let unit;
</script>

<div class="card rounded-0 border-4 p-2">
	<div class="mb-2">
		<h5>Unit {unit}</h5>
		<span class="badge rounded-0 text-bg-success">Operating</span>
	</div>
	<div class="card rounded-0 mb-2">
		<div class="card-header">Active Power</div>
		<div class="card-body">
			<h6>600 kW</h6>
		</div>
	</div>
	<div class="card rounded-0 mb-2">
		<div class="card-header">Reactive Power</div>
		<div class="card-body">
			<h6>200 kVAR</h6>
		</div>
	</div>
	<div class="card rounded-0">
		<div class="card-header">Power Factor</div>
		<div class="card-body">
			<h6>0.95</h6>
		</div>
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
