import { OAuth2Client } from "google-auth-library";
 
 const CLIENT_ID = "942802219199-hrnqvkm5c0dgtfq73t7v3qagkd4nr3qp.apps.googleusercontent.com";
 const REDIRECT_URI = "http://localhost:3000/api/auth/callback";
 const oauth2Client = new OAuth2Client(CLIENT_ID, "", REDIRECT_URI);
 
 export async function GET() {
   const authUrl = oauth2Client.generateAuthUrl({
     access_type: "offline",
     scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
   });
 
   return new Response(null, {
     status: 302,
     headers: { Location: authUrl },
   });
 }