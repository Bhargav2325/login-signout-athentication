import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [country, countryChange] = useState("india");
  const [address, addressChange] = useState("");
  const [gender, genderChange] = useState("male");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isprocesed = true;
    let errormessage = "Please enter the vale in : ";
    if (id == null || id == "") {
      isprocesed = false;
      errormessage += "Fullname,";
    }
    if (name == null || name == "") {
      isprocesed = false;
      errormessage += " Username,";
    }
    if (password == null || password == "") {
      isprocesed = false;
      errormessage += " Password,";
    }
    if (email == null || email == "") {
      isprocesed = false;
      errormessage += " Email,";
    }
    if (phone == null || phone == "") {
      isprocesed = false;
      errormessage += " Phone";
    }
    if (!isprocesed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isprocesed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isprocesed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regObj = {
      id,
      name,
      password,
      email,
      phone,
      country,
      address,
      gender,
    };
    // console.log(regObj);
    if (IsValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered Successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error(`Registration failed: ${err.message}`);
        });
    }
  };
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handlesubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-3xl text-blue-500 mb-4">
            <h1>Register</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 focus:border-blue-500 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              value={id}
              onChange={(e) => idChange(e.target.value)}
              type="text"
              placeholder="Enter Your Full Name..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Name<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              value={name}
              onChange={(e) => nameChange(e.target.value)}
              type="text"
              placeholder="Enter Your User Name..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              value={email}
              onChange={(e) => emailChange(e.target.value)}
              type="email"
              placeholder="Enter Your Email..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={password}
              onChange={(e) => passwordChange(e.target.value)}
              type="password"
              placeholder="Enter Password..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone<span className="text-red-500 mx-1">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              value={phone}
              onChange={(e) => phoneChange(e.target.value)}
              type="tel"
              placeholder="Enter Phone..."
              pattern="^[6-9]\d{9}$"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country<span className="text-red-500 mx-1">*</span>
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 focus:border-blue-500 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              value={country}
              onChange={(e) => countryChange(e.target.value)}
            >
              <option value="india">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address<span className="text-red-500 mx-1">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:border-blue-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              value={address}
              onChange={(e) => addressChange(e.target.value)}
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender<span className="text-red-500 mx-1">*</span>
            </label>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="male"
                name="gender"
                className="h-4 w-4 mr-2"
                checked={gender === "male"}
                onChange={() => genderChange("male")}
              />
              <label className="mr-4 text-sm">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                className="h-4 w-4 mr-2"
                checked={gender === "female"}
                onChange={() => genderChange("female")}
              />
              <label className="text-sm">Female</label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              type="button"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
