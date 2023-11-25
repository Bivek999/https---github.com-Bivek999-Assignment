import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./Context";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const context = useContext(AuthContext);
  const [edit, SetEdit] = useState(false);
  // ========================================
  const handleEdit = () => {
    SetEdit(true);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const contextData = useContext(AuthContext);
  console.log({ context });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        email: context.email,
      };
    });
    await axios
      .post(`http://localhost:5000/users/updates`, formData)
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
          //   navigate("/profile");
        }
      })
      .catch((err) => console.log(err));
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
              onChange={(e) =>
                setFormData((prev) => {
                  console.log(prev);
                  return {
                    ...prev,
                    firstName: e.target.value,
                  };
                })
              }
            />
          </div>
          <div>
            <label>Lats Name</label>
            <input
              type="text"
              placeholder={context.lastName}
              name="lastName"
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
          <div>
            <label>Number</label>
            <input
              type="text"
              placeholder="Enter New Number"
              name="phone"
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

          <button type="submit">Submit</button>
        </form>
      </>
    );
  };

  return (
    <div>
      <h2>Welcome, {context ? context.firstName : "User"}!</h2>
      <p>Email: {context ? context.email : "N/A"}</p>
      <p>Phone Number: {context ? context.phone : "N/A"}</p>
      <button onClick={handleEdit}>Edit Profile</button>

      <div>{edit ? editable() : <></>}</div>
    </div>
  );
};

export default Profile;
