import RestaurantDetailsHeader from "../component/RestaurantDetailHeader";

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <main>
      <RestaurantDetailsHeader name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
};
export default RestaurantLayout;
