import RestaurantNavbar from "../component/RestaurantNavbar";
import RestaurantTitle from "../component/RestaurantTitle";
import RestaurantRating from "../component/RestaurantRating";
import RestaurantDescription from "../component/RestaurantDescription";
import RestaurantImages from "../component/RestaurantImages";
import RestaurantReviews from "../component/RestaurantReviews";
import RestaurantReservationCard from "../component/RestaurantReservationCard";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

interface RestaurantProps {
  id: string;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

interface RestaurantDetailProps {
  params: {
    slug: string;
  };
  searchParams: {};
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (
  slug: string
): Promise<RestaurantProps> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

const RestaurantDeatils = async (props: RestaurantDetailProps) => {
  console.log("restaurant detail page", props);
  const {
    params: { slug },
  } = props;

  const selectedRestaurant = await fetchRestaurantBySlug(slug);
  console.log("selected restau", selectedRestaurant);
  const { name, description, images } = selectedRestaurant;

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={slug} />
        <RestaurantTitle title={name} />
        <RestaurantRating />
        <RestaurantDescription description={description} />
        <RestaurantImages images={images} />
        <RestaurantReviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <RestaurantReservationCard />
      </div>
    </>
  );
};
export default RestaurantDeatils;
