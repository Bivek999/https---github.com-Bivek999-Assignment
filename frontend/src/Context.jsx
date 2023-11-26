import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  setUserNamePassword: (fn, ln, ph, email) => {},
});

export function AuthContextProvider(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  function setUserNamePassword(fn, ln, ph, email) {
    setEmail(email);
    setFirstName(fn);
    setLastName(ln);
    setPhone(ph);
  }

  return (
    <AuthContext.Provider
      value={{
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        setUserNamePassword: setUserNamePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
