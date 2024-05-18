import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
//ths middleware will run before each nd evry req

const prisma = new PrismaClient();

export default async function handler(req: NextRequest, res: NextResponse) {
  console.log("hello from middleware");

  console.log(
    "This middleware will run before eaach and every endpoint req try in postman check output in terminal"
  );
  console.log(
    "middleware called on every page change as well try in chrome.check output n terminal"
  );

  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken) {
    // return res.status(401).json({
    //   errorMessage: "Unauthorized request (no bearer token)",
    // });

    return new NextResponse(
      JSON.stringify({ errorMessage: "unauthorized request" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    // return res.status(401).json({
    //   errorMessage: "Unauthorization req (no token)",
    // });
    return new NextResponse(
      JSON.stringify({ errorMessage: "unauthorized request" }),
      { status: 401 }
    );
  }

  // encode token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  //verify token
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "unauthorized request" }),
      { status: 401 }
    );
  }
}

//i don't want to cll middlewarae on every single req
//We are having only authentication logic inside middleware
//I don't want to check authentication on every req.
export const config = {
  matcher: ["/api/auth/me", "/api/"],
};
