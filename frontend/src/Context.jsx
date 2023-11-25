// import React from 'react'

// const Context = () => {
//     const []
//   return (

//   )
// }

// export default Context

import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  //   isLoggedIn: false,
  //   onLogout: () => {},
  //   onLogin: (email, password) => {},
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  setUserNamePassword: (fn, ln, ph, email) => {},
});

export function AuthContextProvider(props) {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  //   useEffect(() => {
  //     const userStoredLogin = localStorage.getItem("isLoggedIn");

  //     if (userStoredLogin) {
  //       setIsLoggedIn(true);
  //     }
  //   }, []);

  //   function logoutHandler() {
  //     localStorage.removeItem("isLoggedIn");
  //     setIsLoggedIn(false);
  //   }
  function setUserNamePassword(fn, ln, ph, email) {
    setEmail(email);
    setFirstName(fn);
    setLastName(ln);
    setPhone(ph);
  }

  //   function loginHandler() {
  //     localStorage.setItem("isLoggedIn", "1");
  //     setIsLoggedIn(true);
  //   }

  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn: isLoggedIn,
        // onLogin: loginHandler,
        // onLogout: logoutHandler,
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

// import React from "react";

// const AuthContext = React.createContext({
//   isLoggedIn: false,
//   onLogout: () => {},
// });

// export default AuthContext;
