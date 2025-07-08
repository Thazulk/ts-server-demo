import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;

  const profaneWords = ["kerfuffle", "sharbert", "fornax"];
  const cleanedBody = params.body
    .split(" ")
    .map((word) => {
      if (profaneWords.includes(word.toLowerCase())) {
        return "****";
      }
      return word;
    })
    .join(" ");

  if (params.body.length > maxChirpLength) {
    throw new Error("Chirp is too long");
  }

  respondWithJSON(res, 200, {
    cleanedBody,
  });
}
