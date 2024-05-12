import RestaurantDetailsHeader from "../../component/RestaurantDetailHeader";
import RestaurantMenus from "../../component/RestaurantMenus";
import RestaurantNavbar from "../../component/RestaurantNavbar";

const RestaurantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar />
        <RestaurantMenus />
      </div>
    </>
  );
};

export default RestaurantMenu;
