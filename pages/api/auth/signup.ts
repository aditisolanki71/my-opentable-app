import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//http://localhost:3000/api/auth/signup
//postman http://localhost:3000/api/auth/signup -->GET nd POST both work

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST Request
  if (req.method === "POST") {
    const body = req.body;
    const { firstName, lastName, email, city, phone, password } = body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First Name is Invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last Name is Invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is Invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is Invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not Strong",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res.status(400).json({ errorMessage: "Email already in used" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        city,
        phone,
        email,
      },
    });

    return res.status(400).json({
      hello: user,
    });
  }
}
