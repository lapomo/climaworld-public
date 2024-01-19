import { Hub } from "aws-amplify";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFunc } from "../api/aws-api";
import Loading from "../components/Loading";
import { useApi } from "./ApiContext";

const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [locale, setLocale] = useState({
    country_code: "US",
    timezone: {
      gmt_offset: 0,
    },
    currency: {
      currency_code: "USD",
      currency_sign: "$",
    },
    paymentAmount: {
      default: 10,
      minValue: 5,
      boxes: [5, 10, 50],
    },
  });
  const [isEligible, setIsEligible] = useState(false);

  const [entryTempStorage, setEntryTempStorage] = useState();
  useEffect(() => {
    // console.log("temp changed: " + JSON.stringify(entryTempStorage));
    if (entryTempStorage && entryTempStorage !== undefined) {
      localStorage.setItem(
        "localTempStorage",
        JSON.stringify(entryTempStorage)
      );
    }
  }, [entryTempStorage]);

  useEffect(() => {
    if (api && api.user && api.user.userdata.country) {
      changeLocale({ countryShortCode: api.user.userdata.country });
    }
  }, [api?.user]);

  Hub.listen("auth", (data) => {
    const event = data.payload.event;
    console.log("event:", event);
    switch (event) {
      case "signOut":
        console.log("user logout");
        api.getUser(true);
        navigate("/");
        break;
      case "autoSignIn":
        console.log("user auto sign in after sign up");
        // forgetData();
        // navigate("/home");
        break;
      case "signIn":
        console.log("user login");
        api.getUser();
        navigate("/home");
        break;
      default:
        break;
    }
  });

  async function forgetData() {
    console.log("forgetData..");
    await api.getUser();
  }

  async function getLocale() {
    if (api.user) {
      changeLocale({ countryShortCode: api.user.userdata.country });
      return;
    }
    const localStorageRequestItem = localStorage.getItem("tempLocaleRequest");
    if (localStorageRequestItem && localStorageRequestItem !== undefined) {
      const localRequestItem = JSON.parse(localStorageRequestItem);
      console.log(localRequestItem);
      // if (localRequestItem.timestamp === "manual") {
      //   console.log("Locale manually set by user before");
      setLocale(localRequestItem.body);
      return;
      // }
      if (new Date().getTime() - localRequestItem.timestamp <= 60000) {
        console.log("Repeated request, skipping this one");
        setLocale(localRequestItem.body);
        return;
      }
    }

    // localStorage.setItem(
    //   "tempLocaleRequest",
    //   JSON.stringify({ timestamp: new Date().getTime() })
    // );

    const localeApiCall = await apiFunc
      .getLocale()
      .then((result) => result?.response);
    if (!localeApiCall) return;
    localeApiCall.currency["currency_sign"] = getCurrencySign(
      localeApiCall.currency.currency_code
    );
    localeApiCall["paymentAmount"] = getPriceFromCurrency(
      localeApiCall.currency.currency_code
    );

    localStorage.setItem(
      "tempLocaleRequest",
      JSON.stringify({ timestamp: new Date().getTime(), body: localeApiCall })
    );

    console.log(localeApiCall);

    setLocale(localeApiCall);
  }

  function changeLocale(item) {
    console.log("manually set country");
    const localeTemp = {};
    localeTemp.currency = {};
    localeTemp["country_code"] = item.countryShortCode;
    const currency_code = getCurrencyFromCountry(item.countryShortCode);
    localeTemp.currency["currency_code"] = currency_code;
    localeTemp["paymentAmount"] = getPriceFromCurrency(currency_code);
    localeTemp.currency["currency_sign"] = getCurrencySign(currency_code);

    localStorage.setItem(
      "tempLocaleRequest",
      JSON.stringify({ timestamp: "manual", body: localeTemp })
    );
    setLocale(localeTemp);
    return true;
  }

  useEffect(() => {
    setIsEligible(isCountryEligibleToEnter(locale?.country_code));
  }, [locale?.country_code]);

  function isCountryEligibleToEnter(country_code) {

    // pause signup and set all countries to not eligible
    return false
    //
    const EU = [
      "BE",
      "BG",
      "CZ",
      "DK",
      "DE",
      "EE",
      "IE",
      "EL",
      "ES",
      "GR",
      "FR",
      "HR",
      "IT",
      "CY",
      "LV",
      "LT",
      "LU",
      "HU",
      "MT",
      "NL",
      "AT",
      "PL",
      "PT",
      "RO",
      "SI",
      "SK",
      "FI",
      "SE",
    ];
    const otherEligibles = ["GB"];
    if (EU.concat(otherEligibles).includes(country_code)) {
      console.log("eligible");
      return true;
    } else {
      console.log("not eligible");
      return false;
    }
  }

  function getCurrencyFromCountry(countryShortCode) {
    const eur = [
      "BE",
      "BG",
      "CZ",
      "DK",
      "DE",
      "EE",
      "IE",
      "EL",
      "ES",
      "GR",
      "FR",
      "HR",
      "IT",
      "CY",
      "LV",
      "LT",
      "LU",
      "HU",
      "MT",
      "NL",
      "AT",
      "PL",
      "PT",
      "RO",
      "SI",
      "SK",
      "FI",
      "SE",
    ];
    if (countryShortCode === "GB") {
      return "GBP";
    } else if (eur.includes(countryShortCode)) {
      return "EUR";
    } else {
      return "USD";
    }
  }

  function getCurrencySign(currency_code) {
    switch (currency_code) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "USD":
        return "$";
      default:
        return "$";
    }
  }

  function getPriceFromCurrency(currency_code) {
    switch (currency_code) {
      case "EUR":
        return {
          default: 10,
          minValue: 5,
          boxes: [5, 10, 50],
        };
      case "GBP":
        return {
          default: 10,
          minValue: 5,
          boxes: [5, 10, 50],
        };
      case "USD":
        return {
          default: 10,
          minValue: 5,
          boxes: [5, 10, 50],
        };
      default:
        return {
          default: 10,
          minValue: 5,
          boxes: [5, 10, 50],
        };
    }
  }

  async function loadingTasks() {
    console.log("Loading..");
    let calls = []
    // const urlParams = new URLSearchParams(window.location.search);
    // console.log("urlparams: " + JSON.stringify(urlParams))
    // console.log("...verify token");
    // await verifyUserLogin(urlParams.get("token"));
    console.log("...getting user");
    calls.push(api.getUser().catch((err) => console.log(err)))
    // console.log("...getting stats");
    // await api.getStats();

    console.log("...get locale");
    calls.push(getLocale().catch((err) => console.log(err)))
    if (
      ["/home", "/prizes", "/fund", "/settings", "/admin"].includes(
        location.pathname
      )
    ) {
      console.log("...get draws");
      calls.push(api.getDraws().catch((err) => console.log(err)))
      console.log("...get projects");
      calls.push(api
        .getProjects()
        .catch((err) => console.log(err)))
    }
    const finished = await Promise.all(calls)
    // if (userCall && localeCall && drawCall && projectCall) {
      setIsLoading(false);
    // }
  }

  useEffect(() => {
    loadingTasks();
  }, [location.pathname]);

  const value = {
    entryTempStorage,
    setEntryTempStorage,
    locale,
    changeLocale,
    isEligible,
    getCurrencyFromCountry,
    getCurrencySign
  };

  return (
    <AppContext.Provider value={value}>
      {isLoading && <Loading message={isLoading} />}
      {error && <div>{error}</div>}
      {!isLoading && !error && children}
    </AppContext.Provider>
  );
}
