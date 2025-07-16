import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./errors.js";
import { createUser } from "../db/queries/users.js";
import { hashPassword } from "./auth.js";

export async function handlerUsersCreate(req: Request, res: Response) {
  type parameters = {
    email: string;
    password: string;
  };

  const params: parameters = req.body;
  if (!params.email) {
    throw new BadRequestError("Email is required");
  }

  const user = await createUser({
    email: params.email,
    hashed_password: await hashPassword(params.password),
  });
  respondWithJSON(res, 201, user);
}
