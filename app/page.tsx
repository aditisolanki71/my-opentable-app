import { Cuisine, PRICE, PrismaClient, Location } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import "tailwindcss/tailwind.css";

export interface RestaurantCardProps {
  id: string;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardProps[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
    },
  });
  console.log("***** restau *****", restaurants);
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  console.log("my data", restaurants);

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants &&
          restaurants?.map((restaurant: RestaurantCardProps) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
      </div>
    </main>
  );
}
