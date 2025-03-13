import jwt from "jsonwebtoken";
 
const JWT_SECRET = process.env.JWT_SECRET; // Gunakan kunci rahasia yang kuat
 
 export async function handle({ event, resolve }) {
     const token = event.cookies.get("auth");
 
     if (token) {
         try {
             // Verifikasi dan decode token JWT
             const decodedToken = jwt.verify(token, JWT_SECRET);
 
             // Simpan informasi pengguna di `locals` agar dapat diakses di seluruh aplikasi
             event.locals.user = {
                 id: decodedToken.id,
                 name: decodedToken.name,
                 email: decodedToken.email,
             };
         } catch (error) {
             console.error("Invalid or expired JWT:", error);
             event.locals.user = null;
 
             // Hapus cookie jika token tidak valid
             event.cookies.delete("auth");
         }
     } else {
         event.locals.user = null; // Jika tidak ada token, tidak ada data pengguna
     }
 
     // Izinkan akses ke halaman login, register, dan endpoint auth tanpa autentikasi
     if (
         !event.locals.user &&
         event.url.pathname !== "/login" &&
         event.url.pathname !== "/register" &&
         !event.url.pathname.startsWith("/api/auth")
     ) {
         return new Response(null, {
             status: 302,
             headers: { Location: "/login" },
         });
     }
 
     // Cegah pengguna yang sudah login mengakses halaman login dan register
     if (event.locals.user && (event.url.pathname === "/login" || event.url.pathname === "/register")) {
         return new Response(null, {
             status: 302,
             headers: { Location: "/" }, // Arahkan ke halaman utama
         });
     }
 
     return resolve(event);
 }