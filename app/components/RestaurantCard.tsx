import Link from "next/link";
import { RestaurantCardProps } from "../page";
import Price from "./Price";
interface Props {
  restaurant: RestaurantCardProps;
}
const RestaurantCard = ({ restaurant }: Props) => {
  console.log("--------------------restaurant card", restaurant);
  const { id, name, main_image, cuisine, location, price, slug } = restaurant;

  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link
        href={`restaurant/${slug}`}
        className="font-bold text-gray-700 text-2xl"
      >
        <img
          src="https://resizer.otstatic.com/v2/photos/wide-huge/2/31852905.jpg"
          alt=""
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuisine?.name}</p>

            {/* <p className="mr-3">$$$$</p> */}
            <Price price={price} />
            <p>{location?.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};
export default RestaurantCard;
