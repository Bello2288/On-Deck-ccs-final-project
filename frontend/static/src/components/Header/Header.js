import "../../styles/Header.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import football from "../../images/football.png";

function Header({ superState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
    navigate("/");
  };

  return (
    <>
      <Navbar className="navbar" bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="app-name" href="/">
            On Deck
            <img className="sport-icon" src={football} alt="chair" />
          </Navbar.Brand>
          <div id="basic-navbar-nav">
            <Nav className="me-auto">
              {!superState.auth && (
                <>
                  <Nav.Link className="header-login" href="/login">Login</Nav.Link>
                </>
              )}
              {superState.auth && (
                <>
                  <Nav.Link className="header-logout" href="/" onClick={(e) => logout(e)}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;