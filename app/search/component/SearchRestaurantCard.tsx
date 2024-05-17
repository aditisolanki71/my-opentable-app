import { Cuisine, PRICE, Location } from "@prisma/client";
import Link from "next/link";
import Price from "../../components/Price";

interface SearchRestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
  };
}
const SearchRestaurantCard = (props: SearchRestaurantCardProps) => {
  const { restaurant } = props;
  console.log("search restaurant card is", restaurant);
  const { name, main_image, price, cuisine, location, slug } = restaurant;

  return (
    <div className="border-b flex pb-5">
      <img
        src={main_image}
        alt=""
        className="w-44 h-36 rounded"
        // height={100}
        // width={100}
      />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            {/* <p className="mr-4">$$$ </p> */}
            <Price price={price} />
            <p className="mr-4 capitalize">{cuisine?.name}</p>
            <p className="mr-4 capitalize">{location?.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};
export default SearchRestaurantCard;
