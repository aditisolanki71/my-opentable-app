import SearchHeader from "./component/SearchHeader";
import SearchSidebar from "./component/SearchSidebar";
import SearchRestaurantCard from "./component/SearchRestaurantCard";
import { PrismaClient } from "@prisma/client";

interface SearchProps {
  params: {};
  searchParams: {
    city: string;
  };
}

const prisma = new PrismaClient();
const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
};

const fetchRestaurantByCity = async (city: string) => {
  if (!city) {
    return prisma.restaurant.findMany();
  }
  return await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations;
};

const fetchCuisines = async () => {
  const cuisine = await prisma.cuisine.findMany();
  return cuisine;
};

const Search = async (props: SearchProps) => {
  console.log("search page props", props);
  const { searchParams } = props;
  const { city } = searchParams;
  console.log("ct", city);

  const restaurants = await fetchRestaurantByCity(city);
  console.log("my restau", restaurants);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  console.log("my locations", locations);
  console.log("my cuisines", cuisines);

  return (
    <>
      <SearchHeader />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar locations={locations} cuisines={cuisines} />
        <div className="w-5/6">
          {restaurants?.length > 0 ? (
            restaurants?.map((restaurant) => (
              <SearchRestaurantCard
                key={restaurant?.id}
                restaurant={restaurant}
              />
            ))
          ) : (
            <p>No Restaurant Found</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Search;
