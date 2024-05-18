import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const bearerToken = req.headers["authorization"];
  //   if (!bearerToken) {
  //     return res.status(401).json({
  //       errorMessage: "Unauthorized request (no bearer token)",
  //     });
  //   }

  //   const token = bearerToken.split(" ")[1];

  //   if (!token) {
  //     return res.status(401).json({
  //       errorMessage: "Unauthorization req (no token)",
  //     });
  //   }

  //   // encode token
  //   const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //   //verify token
  //   try {
  //     await jose.jwtVerify(token, secret);
  //   } catch (error) {
  //     return res.status(401).json({
  //       errorMessage: "Unauthorized request(tpken invalid)`",
  //     });
  //   }

  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  //decode token
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized Email`",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      errorMessage: "User not found",
    });
  }

  return res.json({
    id: user?.id,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    city: user.city,
  });
}
