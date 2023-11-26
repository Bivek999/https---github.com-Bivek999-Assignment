import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./Context";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const contextData = useContext(AuthContext);
  const logindata = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users/check`, { email, password })
      .then((result) => {
        if (result.status === 200) {
          // console.log(result);
          const { setUserNamePassword } = contextData;
          setUserNamePassword(
            result.data.firstName,
            result.data.lastName,
            result.data.phone,
            result.data.email
          );
          navigate("/profile");
        }
      })
      .catch((err) => {
        // console.log(err);
        setError(err);
      });
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <>
      <div className="container">
        <div
          className="border shadow justify-content-center align-items-center"
          style={{ padding: "10px" }}
        >
          <form onSubmit={logindata}>
            <h2>
              <center>Login</center>
            </h2>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                placeholder="UserName/Email"
                autoComplete="off"
                name="useremail"
                className="form-control round-0"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                autoComplete="off"
                name="userpass"
                className="form-control round-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>{error ? <p>Invalid Id Password!</p> : <></>}</div>
            <button type="submit" className=" btn btn-success w-100 round-0">
              Login
            </button>
          </form>
          <br />
          <br />
          <div>
            If You Want To Create New Account? <Link to="/">Signup</Link>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Login;
