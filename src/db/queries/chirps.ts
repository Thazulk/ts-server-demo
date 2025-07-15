import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";
import { asc, eq } from "drizzle-orm";

export async function createChirp(chirp: NewChirp) {
  const [rows] = await db.insert(chirps).values(chirp).returning();
  return rows;
}

//Get all chirps ascending by createdAt
export async function getChirps() {
  const rows = await db.select().from(chirps).orderBy(asc(chirps.createdAt));
  return rows;
}

//Get a chirp by id
export async function getChirpById(chirpID: string) {
  const rows = await db.select().from(chirps).where(eq(chirps.id, chirpID));
  return rows[0];
}
