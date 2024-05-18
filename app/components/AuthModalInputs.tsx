import React from "react";
interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}
interface InputsProps {
  inputs: Inputs;
  handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}
function AuthModalInputs(props: InputsProps) {
  const { inputs, handleChangeInputs, isSignIn } = props;
  const { firstName, lastName, email, phone, city, password } = inputs;

  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChangeInputs}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChangeInputs}
          />
        </div>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeInputs}
        />
      </div>

      {isSignIn ? null : (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={handleChangeInputs}
            />
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="City"
              name="city"
              value={city}
              onChange={handleChangeInputs}
            />
          </div>
        </>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChangeInputs}
        />
      </div>
    </div>
  );
}
export default AuthModalInputs;
