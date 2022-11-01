import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ superState, logoutUser }) {
  return (
    <>
      <Header superState={superState} logoutUser={logoutUser} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;