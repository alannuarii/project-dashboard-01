<script>
	import logo from '../img/np.png';
	import Timer from './Timer.svelte';
</script>

<nav class="navbar bg-dark fixed-top">
	<div class="container-fluid">
		<a class="navbar-brand text-light fw-bold" href="/">
			<img src={logo} alt="Logo" height="24" class="d-inline-block align-text-top me-3" />
			<span class="d-none d-md-inline">Dashboard PLTD Tahuna</span>
		</a>
		<div class="d-flex align-items-center">
			<div class="me-4 d-none d-md-flex"><Timer /></div>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<a href="/logout" class="logout btn btn-sm btn-danger border-2 border rounded-0 text-light">Logout</a
			>
		</div>
	</div>
</nav>

<style>
	@media screen and (max-width: 1000px) {
		.logout {
			font-size: 0.8rem;
		}
	}
</style>
