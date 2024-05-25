import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { getCookie, deleteCookie } from "cookies-next";

export const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      setAuthState({
        data: null,
        error: null,
        loading: true,
      });
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      console.log("res", response);
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (e: any) {
      console.log("err", e.response.data);
      setAuthState({
        data: null,
        error: e.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    {
      try {
        setAuthState({
          data: null,
          error: null,
          loading: true,
        });
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
          {
            email,
            password,
            firstName,
            lastName,
            city,
            phone,
          }
        );

        console.log("res", response);
        setAuthState({
          data: response.data,
          error: null,
          loading: false,
        });
        handleClose();
      } catch (e: any) {
        console.log("err", e.response.data);
        setAuthState({
          data: null,
          error: e.response.data.errorMessage,
          loading: false,
        });
      }
    }
  };
  const signout = () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return {
    signin,
    signup,
    signout,
    // fetchUser,
  };
};
