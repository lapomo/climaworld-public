import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

import "./assets/css/App.css";
import Settings from "./pages/App/Settings/Settings";
import { ApiProvider } from "./contexts/ApiContext";
import LandingPage from "./pages/LandingPage/LandingPage";
import Investor from "./pages/Investor";

import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Sweepstakes from "./components/Sweepstakes";
import Home from "./pages/App/Home/Home";
import Profile from "./pages/App/Profile/Profile";
import { AppProvider } from "./contexts/AppContext";
import Enter from "./pages/Enter/Enter";
import { useEffect } from "react";
import Admin from "./pages/App/Admin/Draw";
import PastDraws from "./pages/LandingPage/components/PastDraws";
import Fund from "./pages/App/Fund/Fund";
import Checkout from "./pages/App/Fund/Checkout";
import AfterPayment from "./pages/App/Fund/AfterPayment";
import Climate from "./pages/App/Climate/Climate";
import Prizes from "./pages/App/Prizes/Prizes";
import Draw from "./pages/App/Admin/Draw";
import Dashboard from "./pages/App/Admin/Dashboard";

/* 

  Everything comes together here: context providers and routing.

  - TODO: think about implementing global toasts for error, success and info messages (through Provider)
 */
function Application() {
  useEffect(() => {
    console.log("renderApplication");
  });
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
          <AppProvider>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/us" element={<LandingPage />} />
              <Route exact path="/business" element={<LandingPage />} />
              <Route exact path="/project-partner" element={<LandingPage />} />
              <Route exact path="/billionaire" element={<LandingPage />} />

              <Route exact path="/terms" element={<Terms standalone />} />
              <Route exact path="/privacy" element={<Privacy standalone />} />
              <Route
                exact
                path="/sweepstakes"
                element={<Sweepstakes standalone />}
              />

              <Route
                path="/christmas"
                element={<PastDraws draw="christmas" />}
              />
              <Route path="/new-year" element={<PastDraws draw="new-year" />} />
              <Route path="/draw" element={<PastDraws />} />

              <Route path="/enter" element={<Enter />} />

              <Route path="/test" element={<Checkout />} />

              {/* <Route path="/instagram" element={<Instagram />} /> */}
              {/* <Route exact path="/investor2" element={<Investor2 />} /> */}
              {/* <Route exact path="/marvel" element={<Marvel />} /> */}

              <Route exact path="/investor" element={<Investor />} />
              {/* <Route
              exact
              path="/avocademy"
              element={<SignUpFlow isBeta={true} />}
            /> */}

              {/* <Route exact path="/vote" element={<Vote />} /> */}
              {/* <Route exact path="/waitinglist" element={<WaitinglistSuccess />} /> */}

              {/* <Route path="/projects" element={<Projects />} /> */}
              {/* <Route path="/signupflow" element={<SignUpFlow />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* <Route path="/prize-won" element={<PrizeWon />} /> */}

              <Route element={<PrivateRoute />}>
                {/* 
              In the PrivateRoute comes everything that needs authentication to be accessed 
            */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/draw" element={<Draw />} />
                <Route path="/home" element={<Climate />} />
                <Route path="/prizes" element={<Prizes />} />
                {/* <Route path="/climate" element={<Climate />} /> */}
                <Route path="/fund" element={<Fund />} />
                <Route path="/after-payment" element={<AfterPayment />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </AppProvider>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
}

export default Application;
