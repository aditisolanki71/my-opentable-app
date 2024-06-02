import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import findAvailableTables from "../../../../services/restaurant/findAvailableTables";
interface props {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { slug, day, time, partySize } = req.query as Partial<props>;
  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
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
      errorMessage: "Invalid data provider",
    });
  }

  const tables = restaurant.tables;


  const searchTimesWithTables = await findAvailableTables({ time, day, res,restaurant });

  if(!searchTimesWithTables) {
    return res.status(400).json({
        errorMessage: "Invalid data",
      });
  }
  const availabilities = searchTimesWithTables?
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return res.json({
    availabilities,
  });
}

// https://localhost:3000/api/restaurant/vivan-cuisin/availabilty
// {"errorMessage":"Invalid data provided"}

//http://localhost:3000/api/restaurant/1/availability?day=2023-01-01&time=15:00:00.000Z&partySize=4
// {"slug":"1","day":"2023-01-01","time":"20:00:00.000Z","partySize":"3"}
