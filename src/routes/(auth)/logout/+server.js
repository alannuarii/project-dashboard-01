// src/routes/(auth)/logout/+server.js

export async function GET({ cookies }) {
    cookies.delete('auth', {
      path: '/',  // Pastikan menentukan path saat menghapus cookie
      httpOnly: true, // Untuk meningkatkan keamanan
      secure: false, // Ganti ke `true` di production
    });
  
    return new Response(null, {
      status: 302,
      headers: { Location: '/login' }, // Redirect ke halaman utama setelah logout
    });
  }
  