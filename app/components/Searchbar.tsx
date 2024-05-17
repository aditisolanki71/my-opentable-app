"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [location, setLocaion] = useState("");

  const handleClick = () => {
    if (location === "") {
      return;
    }
    router.push(`/search?city=${location}`);
    setLocaion("");
  };
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocaion(e?.target?.value)}
      />
      <button
        onClick={handleClick}
        className="rounded bg-red-600 px-9 py-2 text-white"
      >
        Let's go
      </button>
    </div>
  );
};

export default Searchbar;
