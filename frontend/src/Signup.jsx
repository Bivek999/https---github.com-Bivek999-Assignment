import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [inputError, setInputError] = useState();
  const [error, setError] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/users`, formData)
      .then((result) => {
        // console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      });
  };

  return (
    <div
      className="container"
      style={{ background: "white", margin: "2rem", padding: "2rem" }}
    >
      <div className="main">
        <div
          className="broder shadow "
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="mb-6">
            <h2>
              <center>Register</center>
            </h2>
            <form onSubmit={handleSubmit} className="">
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
              <div>
                {error ? (
                  <div style={{ color: "red", fontWeight: "600" }}>
                    <p>You are already an existing user !</p>
                  </div>
                ) : (
                  <></>
                )}
                <div>{inputError ? <p>inputError</p> : <></>}</div>
              </div>
              <button type="submit" className="btn btn-success w-100 round-0">
                Register
              </button>
            </form>
            <br />
            <br />
            <div>
              Are You An Existing User? <Link to="/login">Login</Link>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
