import React from "react"
import ReactDOM from "react-dom/client"
import Application from "./Application"
import "bootstrap/dist/css/bootstrap.min.css"
import FAB from "./components/FAB"
import CustomCookies from "./components/CustomCookie/CustomCookies"

/* 

 This is the root file of the react app

*/

ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
  // Disable StrictMode to save ressources, bcs it renders everything twice on load. Does not affect production build
  <React.StrictMode>
    <CustomCookies />
    <Application />
    <FAB />
  </React.StrictMode>
)