import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RestaurantDetailsHeader from "../../component/RestaurantDetailHeader";
import RestaurantNavbar from "../../component/RestaurantNavbar";

const RestaurantMenu = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Navbar />
        <RestaurantDetailsHeader />
        {/* DESCRIPTION PORTION */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavbar />
            <RestaurantMenu />
          </div>
        </div>
        {/* DESCRIPTION PORTION */}
      </main>
    </main>
  );
};

export default RestaurantMenu;
