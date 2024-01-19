import React, { useContext, useState } from "react";

import { apiFunc } from "../api/aws-api";
import { useAppContext } from "./AppContext";
import { useAuth } from "./AuthContext";

const ApiContext = React.createContext();

const adminUsers = [
  "b371ec81589a4849587fa7139c9eb08a698e11b57d91b92fe670e62bb34427e1",
  "eebd5210f395a2b523c9e49e17de461feee728a50ce40eba6387380baaa2fea2",
];

// provide singleton to the provider to share common values
export function useApi() {
  return useContext(ApiContext);
}
/* 

  API Provider: provide main context with shared variables across the application. Provide functions to interact with the api 

 */
export function ApiProvider({ children }) {
  const [user, setUser] = useState();
  const [stats, setStats] = useState();
  const [projects, setProjects] = useState();
  const [draws, setDraws] = useState();

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);

  const { currentUser, getCurrentUser, updatePrefUsername, login } = useAuth();

  async function getUser(isSignOut = false) {
    if(isSignOut){
      setUser(false)
    }
    if (!user) {
      const authUser = await getCurrentUser();
      if (authUser) {
        const apiUser = await apiFunc.getUser(authUser.username);
        if (apiUser?.response?.success) {
          setUser(apiUser.response.body);
          // console.log("userdata: " + apiUser.response.body)
          if(window.DD_RUM){
            window.DD_RUM.setUser({
              id: apiUser.response.body.id,
              email: apiUser.response.body.userdata.email,
          })
          }
          if (adminUsers.includes(apiUser.response.body.id)) {
            setIsAdmin(true);
          }
          return apiUser.response.body;
        } else {
          setUser(false)
          return null
        }
      }
    }
    return user;
  }
  async function createUser(user) {
    return await apiFunc.createUser(user);
  }

  async function updateUser(id, attributes) {
    return await apiFunc.updateUser(id, attributes).then((result) => {
      if (result.status === "success" && result.response.success) {
        console.log(result.response.body);
        setUser(result.response.body);
      }
      return result;
    });
  }

  async function verifyToken(token) {
    return await apiFunc.verifyToken(token);
  }

  async function subscribe(email, id, info) {
    return await apiFunc.subscribe(email, id, info);
  }
  async function confirmSubscription(id, code) {
    return await apiFunc.confirmSubscription(id, code);
  }
  async function requestBeta(id) {
    return await apiFunc.requestBeta(id);
  }
  async function sendVote(confirmationcode, id, vote) {
    return await apiFunc.sendVote(confirmationcode, id, vote);
  }

  async function sendMailToCW(body) {
    return await apiFunc.sendMailToCW(user, body);
  }

  async function getStats() {
    const statsData = await apiFunc.getStats();

    statsData.status === "success" && setStats(statsData.response);

    return stats;
  }
  async function getProjects() {
    if (projects) {
      return projects;
    } else {
      const result = await apiFunc.getProjects();
      console.log(JSON.stringify(result));
      if (result?.status === "success" && result?.response.success) {
        setProjects(result.response.body.cwValue);
        return result.response.body.cwValue;
      } else {
        console.log("Error getting projects");
      }
    }
  }
  async function addToProjectFund(project, amount){
    return await apiFunc.addToProjectFund(project, amount);
  }

  async function getDraws(force=false) {
    if (draws && !force) {
      return draws;
    } else {
      const result = await apiFunc.getDraws();

      if (result?.status === "success" && result?.response.success) {
        const sortedResult = result.response.body.cwValue.sort(
          (a, b) =>
            new Date(b.draw_closing).getTime() -
            new Date(a.draw_closing).getTime()
        );
        console.log(JSON.stringify(sortedResult));
        setDraws(sortedResult);
        return sortedResult;
      } else {
        console.log("Error getting draws");
      }
    }
  }

  async function createStripeIntent(params) {
    return apiFunc.createStripeIntent(params);
  }

  async function sendAdminAction(action, body) {
    if(isAdmin){
      return apiFunc.sendAdminAction(action, body)
    }else {
      return new Error("Not an admin")
    }
  }

  async function updatePrizeClaimed(body) {
    return await apiFunc.updatePrizeClaimed(body)
  }

  async function getCurrencyConversion() {
    return await apiFunc.getCurrencyConversion()
  }

  const value = {
    user,
    isAdmin,
    stats,
    getStats,
    getProjects,
    addToProjectFund,
    getDraws,
    projects,
    draws,
    getUser,
    createUser,
    updateUser,
    verifyToken,
    subscribe,
    confirmSubscription,
    requestBeta,
    sendVote,
    sendMailToCW,
    createStripeIntent,
    sendAdminAction,
    updatePrizeClaimed,
    getCurrencyConversion
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
