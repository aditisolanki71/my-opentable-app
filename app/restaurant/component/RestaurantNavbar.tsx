import Link from "next/link";

interface RestaurantNavbarProps {
  slug: string;
}

const RestaurantNavbar = (props: RestaurantNavbarProps) => {
  const { slug } = props;
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavbar;
