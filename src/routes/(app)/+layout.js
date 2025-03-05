import { browser } from '$app/environment';

if (browser) {
    // Impor JavaScript Bootstrap hanya di sisi client
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
}