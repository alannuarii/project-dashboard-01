<script>
	import logo from '$lib/img/np.png';
</script>

<section class="container-fluid d-flex justify-content-center align-items-center w-50">
	<div class="card bg-dark p-5 shadow rounded-0">
		<div class="d-flex justify-content-center">
			<img src={logo} class="img-fluid mb-4" alt="" />
		</div>
		<div class="text-center text-light">
			<h5 class="fw-bold">LOGIN</h5>
			<h6 class="">DASHBOARD PLTD TAHUNA</h6>
		</div>
		<div>
			<a href="/api/auth/login" class="btn btn-secondary w-100 rounded-0"
				><i class="bi-google me-2"></i>Login with Google Account</a
			>
		</div>
	</div>
</section>

<style>
	img {
		width: 35%;
	}
	/* Mobile specific */
	@media screen and (max-width: 1000px) {
		section {
			width: 100% !important;
		}
		img {
			width: 75%;
		}
	}
</style>
