import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

/* 

  Component:  Private Route
  Function: - a custom route component to make sure the inside can only be accessed by authenticated users
  
 */
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, getCurrentUser } = useAuth();
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true)

  // async function isLoggedInUser () {
  //   const result = await currentUser();
  //   result ? setLoggedIn(true) : setLoggedIn(false);
  //   setLoading(false);
  // }

  async function prepare() {
    await getCurrentUser().then(() => {
      console.log("user loaded and checked")
      setLoading(false)
    });
  }

  useEffect(() => {
    prepare();
    // setTimeout(() => {setLoading(false)}, 3000)
  }, []);

  // TODO make this switch pls
  // if (!currentUser) return <div>loading</div>;
  // return (
  //   <>{loading && <Loading message={"Logging in..."} />}
  //     {!loggedIn && !loading && <Navigate to="/login" />}
  //     {loggedIn && !loading && <Outlet />}
  //   </>
  // );
return loading ? <Loading /> : (currentUser ? <Outlet /> : <Navigate to="/login" />);

}
