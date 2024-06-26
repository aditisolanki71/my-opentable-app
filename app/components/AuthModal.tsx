"use client";

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import { useAuth } from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(
      "inside useeffect",
      inputs,
      inputs.password.length,
      "email len",
      inputs.email.length
    );

    if (isSignin) {
      if (inputs.password.length <= 0 || inputs.email.length <= 0) {
        console.log("inside iffff");
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.city
      ) {
        return setDisabled(false);
      }
    }
  }, [inputs]);

  const { signin, signup } = useAuth();

  const { loading, data, error, setAuthState } = useContext(
    AuthenticationContext
  );

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          "bg-blue-400 text-white",
          ""
        )} border p-1 px-4 rounded mr-3`}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div className="p-2 h-[500px]">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "Log into your account",
                    "create your opentable account"
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInputs={handleChange}
                  isSignIn={isSignin}
                />
                <button
                  className={`uppercase ${
                    disabled ? "bg-gray-4" : "bg-red-600"
                  } w-full text-white p-3 rounded text-sm mb-5`}
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
