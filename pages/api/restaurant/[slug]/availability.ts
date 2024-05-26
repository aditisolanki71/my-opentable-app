import { NextApiRequest, NextApiResponse } from "next";
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
  const { slug, day, time, partySize } = req.query as Partial<props>;
  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  return res.json({ slug, day, time, partySize });
}

// https://localhost:3000/api/restaurant/vivan-cuisin/availabilty
// {"errorMessage":"Invalid data provided"}

//http://localhost:3000/api/restaurant/1/availability?day=2023-01-01&time=20:00:00.000Z&partySize=3
// {"slug":"1","day":"2023-01-01","time":"20:00:00.000Z","partySize":"3"}