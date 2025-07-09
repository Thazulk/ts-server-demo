import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";
import { asc } from "drizzle-orm";

export async function createChirp(chirp: NewChirp) {
  const [rows] = await db.insert(chirps).values(chirp).returning();
  return rows;
}

//Get all chirps ascending by createdAt
export async function getChirps() {
  const rows = await db.select().from(chirps).orderBy(asc(chirps.createdAt));
  return rows;
}
