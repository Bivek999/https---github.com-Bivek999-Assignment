import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./Context";
import { useNavigate } from "react-router-dom";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const context = useContext(AuthContext);
  const [edit, SetEdit] = useState(false);
  // ========================================
  const handleEdit = () => {
    SetEdit(true);
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: context.firstName,
    lastName: context.lastName,
    email: context.email,
    phone: context.phone,
  });

  const contextData = useContext(AuthContext);
  //   console.log({ context });
  const handleSubmit = async (e) => {
    e.preventDefault();

    SetEdit(false);
    axios
      .post(`http://localhost:5000/users/updates`, formData)
      .then((result) => {
        if (result.status === 200) {
          //   console.log(result);
          const { setUserNamePassword } = contextData;
          setUserNamePassword(
            result.data.firstName,
            result.data.lastName,
            result.data.phone,
            result.data.email
          );
        }
      })
      .catch((err) => console.log(err));

    axios.post(`http://localhost:5000/users/updates`, { email });
  };
  const editable = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder={context.firstName}
              name="firstName"
              className="form-control round-0"
              onChange={(e) =>
                setFormData((prev) => {
                  //   console.log(prev);
                  return {
                    ...prev,
                    firstName: e.target.value,
                  };
                })
              }
            />
          </div>
          <br />
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder={context.lastName}
              name="lastName"
              className="form-control round-0"
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    lastName: e.target.value,
                  };
                })
              }
            />
          </div>
          <br />
          <div>
            <label>Number</label>
            <input
              type="text"
              placeholder="Enter New Number"
              name="phone"
              className="form-control round-0"
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    phone: e.target.value,
                  };
                })
              }
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  };

  return (
    <div
      className="border shadow"
      style={{
        margin: "2rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Welcome, {context ? context.firstName : "User"}!</h2>
      <p>Email: {context ? context.email : "N/A"}</p>
      <p>Phone Number: {context ? context.phone : "N/A"}</p>
      <button onClick={handleEdit}>Edit Profile</button>
      <br />
      <br />
      <hr></hr>
      <br />
      <div>{edit ? editable() : <></>}</div>
    </div>
  );
};

export default Profile;
