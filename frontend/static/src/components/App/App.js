import '../../styles/App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Layout from "../Layout/Layout";
import HomePage from "../HomePage/HomePage";
import LoginForm from "../Login/LoginForm";
import RegistrationForm from "../Registration/RegistrationForm";
import TeamRegistrationForm from "../TeamRegistrationForm/TeamRegistrationForm";
import Posts from '../Posts/Posts';



const INITIAL_STATE = {
  auth: false,
  admin: false,
  userID: null,
};

function App() {
  const [superState, setSuperState] = useState(INITIAL_STATE);

  const newState = JSON.parse(window.localStorage.getItem("superState"));

  useEffect(() => {
    window.localStorage.setItem("superState", JSON.stringify(superState));
  }, [superState]);

  const handleError = (err) => {
    console.warn(err);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        console.log("this", response.ok);
        setSuperState(INITIAL_STATE);
      } else {
        setSuperState(newState);
      }
    };
    checkAuth();
  }, []);

  const logoutUser = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      Cookies.remove("Authorization");
      window.localStorage.removeItem("superState");
      setSuperState(INITIAL_STATE);
    }
  };

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                superState={superState}
                setSuperState={setSuperState}
                logoutUser={logoutUser}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route
              path="login"
              element={<LoginForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route
              path="register"
              element={<RegistrationForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route
              path="teamregister"
              element={<TeamRegistrationForm superState={superState} setSuperState={setSuperState} />}
            />
            <Route
              path="posts"
              element={<Posts superState={superState} setSuperState={setSuperState} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
