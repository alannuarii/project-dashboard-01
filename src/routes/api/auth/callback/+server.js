import { OAuth2Client } from "google-auth-library";
 import { db } from "../../../../lib/server/db/index";
 import { user } from "../../../../lib/server/db/schema";
 import { eq } from "drizzle-orm";
 import { encodeBase32LowerCase } from '@oslojs/encoding';
 import jwt from "jsonwebtoken";
 
 const CLIENT_ID = process.env.CLIENT_ID;
 const CLIENT_SECRET = process.env.CLIENT_SECRET;
 const REDIRECT_URI = process.env.REDIRECT_URI;
 
 const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
 const JWT_SECRET = process.env.JWT_SECRET;
 const JWT_EXPIRES_IN = "30d"; // Masa berlaku token
 
 export async function GET({ url, cookies }) {
     const code = url.searchParams.get("code");
 
     if (!code) {
         return new Response("Code not found", { status: 400 });
     }
 
     // Tukar kode dengan token
     const { tokens } = await oauth2Client.getToken(code);
     oauth2Client.setCredentials(tokens);
 
     // Ambil informasi pengguna dari Google
     const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
         headers: { Authorization: `Bearer ${tokens.access_token}` },
     });
 
     if (!userInfoResponse.ok) {
         return new Response("Failed to fetch user info", { status: 500 });
     }
 
     const userInfo = await userInfoResponse.json();
 
     // Periksa apakah pengguna sudah ada di database
     const existingUser = await db
         .select()
         .from(user)
         .where(eq(user.googleId, userInfo.id))
         .execute();
 
     if (existingUser.length === 0) {
         // Jika belum ada, masukkan pengguna baru ke database
         await db
             .insert(user)
             .values({
                 id: generateUserId(),
                 name: userInfo.name,
                 email: userInfo.email,
                 googleId: userInfo.id,
             })
             .execute();
     }
 
     // Buat JWT
     const tokenPayload = {
         id: userInfo.id,
         email: userInfo.email,
         name: userInfo.name,
     };
 
     const jwtToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
 
     // Simpan JWT di cookies
     cookies.set("auth", jwtToken, {
         httpOnly: true,
         secure: true, // Ubah ke true untuk production
         path: "/",
         maxAge: 60 * 60 * 24 * 30, // 1 bulan
     });
 
     return new Response(null, {
         status: 302,
         headers: { Location: "/" },
     });
 }
 
 function generateUserId() {
     // ID with 120 bits of entropy, or about the same as UUID v4.
     const bytes = crypto.getRandomValues(new Uint8Array(15));
     const id = encodeBase32LowerCase(bytes);
     return id;
 }