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

  //   if (!searchTimesWithTables) {
  //     return res.status(400).json({
  //       errorMessage: "Invalid data",
  //     });
  //   }

  console.log("1 is", searchTimesWithTables);
  const searchTimeWithTables = searchTimesWithTables?.find((t) => {
    console.log("time date", t.date);
    console.log("new date", new Date(`${day}T${time}`));
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  });

  console.log("hey there", searchTimeWithTables);
  //   if (!searchTimeWithTables) {
  //     return res.status(400).json({
  //       errorMessage: "No Availability",
  //     });
  //   }

  //we have data like this
  //   {
  //     date: 2023-05-22T02:30:00.000Z
  //     time: "02:30:00.000z",
  //     tables: [
  //         {id:1, restaurant_id: 1,seats:4},
  //         {id:2, restaurant_id: 1,seats:4},
  //         {id:3, restaurant_id: 1,seats:4},
  //         {id:4, restaurant_id: 1,seats:2},
  //     ]
  //   }

  //need in below format
  // {
  //     2: [4] -->table id 4 contains 2 seats
  //     4: [1,2,3] -->table id 1,2,3 contains 4 seats
  // }

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables?.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id);
    } else {
      tablesCount[4].push(table.id);
    }
  });

  const tablesToBooks: number[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount && tablesCount?.[4].length) {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount && tablesCount?.[2].length) {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }
  return res.status(400).json({
    tablesCount,
    tablesToBooks,
  });
}

// http://localhost:3000/api/restaurant/1/reserve?day=2023-01-01&time=00:30:00.000Z&partySize=3
//{"slug":"1","day":"2023-01-01","time":"00:30:00.000Z","partySize":"3"}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-01-01&time=00:00:00.000Z&partySize=3
