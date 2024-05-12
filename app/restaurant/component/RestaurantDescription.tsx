interface RestaurantDescriptionProps {
  description: string;
}

const RestaurantDescription = (props: RestaurantDescriptionProps) => {
  const { description } = props;
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
};
export default RestaurantDescription;
