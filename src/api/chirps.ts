import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./errors.js";
import { createChirp, getChirps } from "../db/queries/chirps.js";

export async function validateChirp(chirp: string) {
  const maxChirpLength = 140;
  if (chirp.length > maxChirpLength) {
    throw new BadRequestError(
      `Chirp is too long. Max length is ${maxChirpLength}`
    );
  }

  const words = chirp.split(" ");

  const badWords = ["kerfuffle", "sharbert", "fornax"];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const loweredWord = word.toLowerCase();
    if (badWords.includes(loweredWord)) {
      words[i] = "****";
    }
  }

  const cleaned = words.join(" ");

  return cleaned;
}

export async function handlerChirpsCreate(req: Request, res: Response) {
  type parameters = {
    body: string;
    userId: string;
  };

  const params: parameters = req.body;

  const cleanedChirp = await validateChirp(params.body);

  const chirp = await createChirp({
    body: cleanedChirp,
    userId: params.userId,
  });
  respondWithJSON(res, 201, chirp);
}

export async function handlerChirpsGet(req: Request, res: Response) {
  const chirps = await getChirps();
  respondWithJSON(res, 200, chirps);
}
