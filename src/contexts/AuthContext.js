import React, { useContext, useState } from "react";
import { useEffect } from "react";
// import { auth, userFunctions } from "../firebase";

import { userFunc } from "../api/aws-auth";
import Loading from "../components/Loading";

const AuthContext = React.createContext();

// provide singleton to the provider to share common values
export function useAuth() {
  return useContext(AuthContext);
}
/* 

  Auth Provider: provide auth context to access authentication variables and functions to interact with the auth service

 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  function signup(username, password, email) {
    return userFunc.signup(username, password, email);
  }

  function resendSignup(username) {
    return userFunc.resendSignup(username);
  }

  function confirmSignup(username, code) {
    return userFunc.confirmSignup(username, code);
  }

  function login(username, password) {
    // prohibit multiple login requests at one time
    if(loading && new Date().getTime()-loading > 10*2000)
    setLoading(new Date().getTime())
    return userFunc.signin(username, password);
  }

  function logout() {
    return userFunc.signout();
  }

  function resetPassword(username) {
    return userFunc.forgotPassword(username);
  }

  function resetPasswordSubmit(username, code, password) {
    return userFunc.forgotPasswordSubmit(username, code, password);
  }

  function updatePrefUsername(prefUsername) {
    // const user = await getCurrentUser();
    return getCurrentUser().then((user) =>
      userFunc.updateUser(user, { preferred_username: prefUsername })
    );
    // return userFunc.updateUser(currUser, {"preferred_username": prefUsername})
  }

  function updateEmail(email) {
    return userFunc.updateUser(currentUser, { email: email });
  }

  function updatePassword(password) {
    return userFunc.updatePassword(currentUser, password);
  }

  function deleteUser() {
    return userFunc.deleteUser();
  }

  async function getCurrentUser() {
    const user = await userFunc.currentUser();
    setCurrentUser(user);
    // setLoading(false) // the api provider takes care of loading right now
    return user;
  }

  // useEffect(() =>{
  //   if(!currentUser){
  //     getCurrentUser()
  //   }
  // }, []);

  const value = {
    currentUser,
    getCurrentUser,
    login,
    signup,
    resendSignup,
    confirmSignup,
    logout,
    resetPassword,
    resetPasswordSubmit,
    updatePrefUsername,
    updateEmail,
    updatePassword,
    deleteUser,
  };

  useEffect(()=>{
    console.log("renderAuthContext")
  })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
