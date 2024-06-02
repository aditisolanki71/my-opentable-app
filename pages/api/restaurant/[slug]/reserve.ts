import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import findAvailableTables from "../../../../services/restaurant/findAvailableTables";

interface props {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as Partial<props>;
  console.log("*****hi");

  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "fail",
    });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  //   if (
  //     new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
  //     new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  //   ) {
  //     return res.status(400).json({
  //       errorMessage: "Restaurant not found",
  //     });
  //   }

  const searchTimesWithTables = await findAvailableTables({
    time,
    day,
    res,
    restaurant,
  });

  if (!searchTimesWithTables) {
    return res.status(400).json({
      errorMessage: "Invalid data",
    });
  }

  const searchTimeWithTables = searchTimesWithTables?.find((t) => {
    console.log("time date", t.date);
    console.log("new date", new Date(`${day}T${time}`));
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  });

  if (!searchTimeWithTables) {
    return res.status(400).json({
      errorMessage: "No Availability",
    });
  }
  return res.status(400).json({
    searchTimeWithTables,
    searchTimesWithTables,
  });
}

// http://localhost:3000/api/restaurant/1/reserve?day=2023-01-01&time=00:30:00.000Z&partySize=3
//{"slug":"1","day":"2023-01-01","time":"00:30:00.000Z","partySize":"3"}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-01-01&time=00:00:00.000Z&partySize=3
