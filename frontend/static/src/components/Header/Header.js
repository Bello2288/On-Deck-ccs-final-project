import "../../styles/Header.css"
// import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
// import football from "../../images/football.png";
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header({ superState, logoutUser }) {
  const navigate = useNavigate();

  const logout = (e) => {
    logoutUser(e);
    navigate("/");
  };

  return (
    <>
      <Navbar className="navbar" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="app-name" href="/">
            On Deck
            {/* <img className="sport-icon" src={football} alt="chair" /> */}
          </Navbar.Brand>
          <div id="basic-navbar-nav">
            <Nav className="me-auto">
              {!superState.auth && (
                <>
                  <Nav.Link className="header-login" href="/login">Login</Nav.Link>
                </>
              )}
              {superState.auth && !superState.admin && (
                <>
                  <Nav.Link className="header-text" href="/posts"> Game Posts</Nav.Link>
                  <Nav.Link className="header-text" href="/create">Create Post</Nav.Link>
                  <Nav.Link className="header-text" href="/posts/user">My Posts</Nav.Link>
                </>
              )}
              {superState.admin && (
                <>
                  <Nav.Link className="header-text" href="/posts/editor">Review Posts</Nav.Link>
                  <Nav.Link className="header-text" href="/" onClick={(e) => logout(e)}>Logout</Nav.Link>
                </>
              )}
              {superState.auth && !superState.admin && (
              <>
                {/* <p className="username">{superState.username}</p> */}
                <NavDropdown className="dropdown" title={superState.username} id="nav-dropdown" variant="primary">
                  <NavDropdown.Item className="dropdown-opt" href="/user/profile">View Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="dropdown-opt" href="/" onClick={(e) => logout(e)}>Logout</NavDropdown.Item>
                </NavDropdown>
                <img className="profile-picture" src={superState.avatar} alt="profile pic" />
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