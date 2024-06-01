import axios from "axios";
import { useState } from "react";

interface Props {
  slug: string;
  partySize: string;
  day: string;
  time: string;
}
const useAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{ time: string; available: boolean }[]>(
    [] | null
  );

  const fetchAvailalities = async ({ slug, partySize, day, time }: Props) => {
    console.log("hook", slug, partySize, day, time);
    setLoading(true);
    try {
      // await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      console.log("response data is", response.data);
      setData(response.data.availabilities);
    } catch (e) {
      setLoading(false);
      setError(error?.response?.data?.errorMessage || "err");
    }
  };

  return { loading, data, error, fetchAvailalities };
};
export default useAvailability;
