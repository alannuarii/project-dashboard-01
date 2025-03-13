import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Pastikan DATABASE_URL sudah diset
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Buat koneksi ke database
const client = postgres(process.env.DATABASE_URL);

// Ekspor instance Drizzle
export const db = drizzle(client);