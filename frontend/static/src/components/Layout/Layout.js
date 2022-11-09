import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/HomePage.css";

function Layout({ superState, setSuperState, logoutUser }) {
  return (
    <>
      <Header className="header" superState={superState} setSuperState={setSuperState} logoutUser={logoutUser} />
      <Outlet context={{superState}}/>
      <Footer className="footer"/>
    </>
  );
}

export default Layout;