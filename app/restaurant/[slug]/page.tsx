import RestaurantDetailsHeader from "../component/RestaurantDetailHeader";
import RestaurantNavbar from "../component/RestaurantNavbar";
import RestaurantTitle from "../component/RestaurantTitle";
import RestaurantRating from "../component/RestaurantRating";
import RestaurantDescription from "../component/RestaurantDescription";
import RestaurantImages from "../component/RestaurantImages";
import RestaurantReviews from "../component/RestaurantReviews";
import RestaurantReservationCard from "../component/RestaurantReservationCard";

const RestaurantDeatils = () => {
  return (
    <>
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
    </>
  );
};
export default RestaurantDeatils;
