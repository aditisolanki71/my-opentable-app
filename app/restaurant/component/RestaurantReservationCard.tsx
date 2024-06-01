"use client";

import { partySizes, times } from "../../../data";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAvailability from "../../../hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

interface RestaurantReservationCardProps {
  openTime: string;
  closeTime: string;
  slug: string;
}
const RestaurantReservationCard = (props: RestaurantReservationCardProps) => {
  const { openTime, closeTime, slug } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const day = date.toISOString().split("T")[0];
      setDay(day);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimesByRestaurantOpenWindow = () => {
    // openTime  = 14:30:00.000Z --> 2:30PM
    // closeTime = 21:30:00.000Z --> 9:30PM

    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  };
  const { fetchAvailalities, loading, error, data } = useAvailability();
  console.log("final data is", data);
  const handleClick = () => {
    fetchAvailalities({ slug, partySize, day, time });
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes?.length > 0 &&
            partySizes?.map((size) => (
              <option value={size.value}>{size.label}</option>
            ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date2</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-28"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-35%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {/* {times.map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))} */}
            {filterTimesByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Find a Time"}
        </button>
      </div>
      {data && data?.length > 0 ? (
        <div className="mt-4">
          <p className="text-red">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data?.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">{time.time}</p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default RestaurantReservationCard;
