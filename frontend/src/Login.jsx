import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./Context";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const contextData = useContext(AuthContext);
  const logindata = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users/check`, { email, password })
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
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
      .catch((err) => console.log(err));
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <>
      <div style={{ textAlign: "center", justifyContent: "center" }}>Login</div>
      <form onSubmit={logindata}>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Signup</Link>
    </>
  );
}

export default Login;
