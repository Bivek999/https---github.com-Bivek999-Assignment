import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

console.log("abcd");
function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users`, formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                className="form-control round-0"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                className="form-control round-0"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                className="form-control round-0"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input
                type="number"
                placeholder="Phone/Mobile"
                name="phone"
                value={formData.phone}
                className="form-control round-0"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                className="form-control round-0"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-sucess w-100 round-0">
              Register
            </button>
          </form>
          {/* <p>{!formData.firstName?"Please Enter First Name...\n all the feild are menditory":!formData.lastName?"Please Enter Last Name...\n all the feild are menditory":!formData.email?"Please Enter Email...\n all the feild are menditory"?!formData.phone?"Please Enter Contact Number...\n all the feild are menditory":"Please Enter Password...\n all the feild are menditory"}</p> */}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
export default Signup;
