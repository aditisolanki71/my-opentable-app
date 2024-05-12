interface RestaurantImagesProps {
  images: string[];
}

const RestaurantImages = (props: RestaurantImagesProps) => {
  const { images } = props;
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photos
      </h1>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <img key={index} className="w-56 h-44 mr-1 mb-1" src={image} alt="" />
        ))}
      </div>
    </div>
  );
};
export default RestaurantImages;
