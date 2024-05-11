import Link from "next/link";
import Navbar from "../../components/Navbar";
import RestaurantDetailsHeader from "../component/RestaurantDetailHeader";
import RestaurantNavbar from "../component/RestaurantNavbar";
import RestaurantTitle from "../component/RestaurantTitle";
import RestaurantRating from "../component/RestaurantRating";
import RestaurantDescription from "../component/RestaurantDescription";
import RestaurantImages from "../component/RestaurantImages";
import RestaurantReviews from "../component/RestaurantReviews";
import RestaurantReservationCard from "../component/RestaurantReservationCadrd";

const RestaurantDeatils = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Navbar />
        <RestaurantDetailsHeader /> {/* DESCRIPTION PORTION */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavbar />
            <RestaurantTitle />
            <RestaurantRating />
            <RestaurantDescription />
            <RestaurantImages />
            <RestaurantReviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <RestaurantReservationCard />
          </div>
        </div>
      </main>
    </main>
  );
};
export default RestaurantDeatils;
