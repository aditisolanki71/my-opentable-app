import { format } from "date-fns";
import { convertToDisplayTime } from "../../../utils/ConvertToDisplayTime";
import Reserve from "../page";
interface ReserveHeader {
  image: string;
  name: string;
  date: string;
  partySize: string;
}
const ReserveHeader = (props: ReserveHeader) => {
  const { image, name, date, partySize } = props;
  console.log("reserve header", props);

  const [day, time] = date.split("T");
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-24 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "ccc, LLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) > 1 ? "Person" : "pPeople"}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReserveHeader;
