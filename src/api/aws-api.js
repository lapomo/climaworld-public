import { Amplify, API } from "aws-amplify";

Amplify.configure({
    API: {
      endpoints: [
        {
          name: "climaworldapi",
          endpoint:
            "https://r56h06155l.execute-api.eu-central-1.amazonaws.com/default",
        },
      ],
    },
  });

const apiName = "climaworldapi";
const headers = {
    "x-api-key": process.env.REACT_APP_AWS_API_KEY_CLIMAWORLDAPI,
    "Access-Control-Allow-Origin": "*",
  };

async function sendRequest(method, path, body) {
    let currentRequest = method + path
    if(body) currentRequest += JSON.stringify(body)
    console.log("sending request.. " + currentRequest)
    const localStorageRequestItem = localStorage.getItem("tempRequest")
    // console.log(JSON.stringify(JSON.parse(localStorageRequestItem).body))
    if(localStorageRequestItem && localStorageRequestItem !== undefined){
        const localRequestItem = JSON.parse(localStorageRequestItem)
        console.log(currentRequest + ":::" + localRequestItem.body)
        if(currentRequest === localRequestItem.body && new Date().getTime() - localRequestItem.timestamp <= 5000){
            console.log("Repeated api request, skipping this one")
            return
        }
    }
    localStorage.setItem("tempRequest", JSON.stringify({timestamp: new Date().getTime(), body: currentRequest}))
    try {
        const data = await API[method](apiName, "/" + path, {
            headers: headers,
            body: body ? body : null,
        })
        if(data){
            // console.log("data received: ", JSON.stringify(data))
        }
        return {status: "success", response: data}
    } catch (e) {
        console.error("Something went wrong: ", JSON.stringify(e))
        return {status: "failed", message: "Something went wrong: " + e.message}
    }
}

const getStats = async () => {
    return await sendRequest("get", "stats"); // TODO: divide stat requests in more static (projects) and more dynamic (trees, co2) data to minimise request load
}
const getProjects = async () => {
    return await sendRequest("get", "stats?id=CW1676971095691&returnAttributes=cwValue" )
}
const addToProjectFund = async (project, amount) => {
    return await sendRequest("post", "hooks?origin=app&action=addtoprojectfund", {project: project, amount: amount})
}
const getDraws = async () => {
    return await sendRequest("get", "stats?id=CW1675436910303&returnAttributes=cwValue" )
}

const getUser = async (id) => {
    if (id !== null && id !== "undefined") {
        id = String(id)
    }
    return await sendRequest("get", "user?id=" + id + "&returnAttributes=tickets,userdata,id,meta")
}

// ** creating a user is done on signup confirmation as a lambda function in aws **
const createUser = async (user) => {
    return await sendRequest("post", "user", user);
}

const updateUser = async (id, attributes) => {
    return await sendRequest("patch", "user", {id: id, attributes: attributes});
}

const verifyToken = async (token) => {
    return await sendRequest("get", "verify?token=" + token);
}

const subscribe = async (email, id, info) => {
    return await sendRequest("post", "subscriber", {email: email, id: id, info: info});
}
const confirmSubscription = async (id, code) => {
    return await sendRequest("patch", "subscriber", {id: id, confirmationcode: code});
}
const requestBeta = async (id) => {
    return await sendRequest("post", "betarequest", {id: id});
}
const sendVote = async (confirmationcode, id, vote) => {
    return await sendRequest("post", "subscribe", {confirmationcode: confirmationcode, id: id, vote: vote, task: "vote"});
}
const sendMailToCW = async (user, body) => {
    return await sendRequest("post", "hooks?origin=app&action=sendcwmail", {user: user, body: body});
}
const updatePrizeClaimed = async (body) => {
    return await sendRequest("post", "hooks?origin=app&action=updatePrizeClaimed", body)
}
const getCurrencyConversion = async () => {
    return await sendRequest("get", "hooks?origin=app&action=convertcurrency")
}

const createStripeIntent = async (params) => {
    return await sendRequest("post", "hooks?origin=stripe&action=createIntent", params)
}

const getLocale = async () => {
    return await sendRequest("get", "hooks?origin=locale")
}

const sendAdminAction = async (action, body) => {
    return await sendRequest("post", "hooks?origin=admin&action=" + action, body)
}


export const apiFunc = {
    getStats,
    getProjects,
    addToProjectFund,
    getDraws,
    getUser,
    createUser,
    updateUser,
    verifyToken,
    subscribe,
    confirmSubscription,
    requestBeta,
    sendVote,
    sendMailToCW,
    updatePrizeClaimed,
    getCurrencyConversion,
    createStripeIntent,
    getLocale,
    sendAdminAction
}