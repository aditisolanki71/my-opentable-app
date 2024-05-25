"use client";

import { useContext } from "react";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  console.log("navbar data", data);
  return (
    <nav className="bg-white p-2 flex justify-between">
      <a href="" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </a>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
              >
                Logout{" "}
              </button>
            ) : (
              <>
                <AuthModal isSignin />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
