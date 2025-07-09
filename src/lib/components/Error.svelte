<script>
	import error from '../img/error.gif';
	export let message = '';
</script>

{#if message}
	<div class="container-fluid">
		<div class="d-flex justify-content-center">
			<img src={error} class="img-fluid rounded-5" alt="" />
		</div>
		<div class="d-flex justify-content-center">
			<button
				class="btn btn-sm rounded-0 btn-outline-light"
				on:click={() => location.reload()}
				title="Reload Halaman"
			>
				Reload Page
			</button>
		</div>
	</div>
{/if}
