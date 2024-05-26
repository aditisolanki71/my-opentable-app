import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
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

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });
  //   return res.json({ slug, day, time, partySize });
  //http://localhost:3000/api/restaurant/1/availability?day=2023-01-01&time=00:30:00.000Z&partySize=3
  //{"searchTimes":["00:00:00.000Z","00:30:00.000Z","01:00:00.000Z","01:30:00.000Z"]}

  const bookingTablesObj: {
    [key: string]: { [key: number]: true };
  } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provider",
    });
  }

  const tables = restaurant.tables;

  const searchTimeWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimeWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });
  return res.json({
    searchTimes,
    bookings,
    bookingTablesObj,
    tables,
    searchTimeWithTables,
  });
}

// https://localhost:3000/api/restaurant/vivan-cuisin/availabilty
// {"errorMessage":"Invalid data provided"}

//http://localhost:3000/api/restaurant/1/availability?day=2023-01-01&time=20:00:00.000Z&partySize=3
// {"slug":"1","day":"2023-01-01","time":"20:00:00.000Z","partySize":"3"}
