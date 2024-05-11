import Navbar from "../components/Navbar";
import SearchHeader from "./component/SearchHeader";
import SearchSidebar from "./component/SearchSidebar";
import SearchRestaurantCard from "./component/SearchRestaurantCard";

const Search = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Navbar />
        <SearchHeader />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSidebar />
          <div className="w-5/6">
            <SearchRestaurantCard />
          </div>
        </div>
      </main>
    </main>
  );
};
export default Search;
