import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//http://localhost:3000/api/auth/signup
//postman http://localhost:3000/api/auth/signup -->GET nd POST both work

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST Request
  if (req.method === "POST") {
    return res.status(400).json({
      hello: "Aditi",
    });
  }
}
