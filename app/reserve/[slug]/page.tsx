import ReserveHeader from "./component/ReserveHeader";
import ReserveForm from "./component/ReserveForm";

const Reserve = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader />
        <ReserveForm />
      </div>
    </div>
  );
};
export default Reserve;
