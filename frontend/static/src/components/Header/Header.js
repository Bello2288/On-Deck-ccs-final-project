import "../../styles/Header.css"
// import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from 'react-bootstrap/Offcanvas';
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
        <Container className="navbar-container nav-flex">
          <Navbar.Brand className="app-name navbar_lg" href="/">
            On Deck
          </Navbar.Brand>
          <div id="basic-navbar-nav">
            <Nav className="me-auto navbar_lg">
              {!superState.auth && (
                <>
                  <Nav.Link className="header-login" href="/login">Login</Nav.Link>
                </>
              )}
              {superState.auth && !superState.admin && (
                <>
                  <Nav.Link autoFocus className="header-text" href="/posts">Game Posts</Nav.Link>
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
                <NavDropdown className="dropdown" title={superState.username} id="nav-dropdown" variant="primary">
                  <NavDropdown.Item className="dropdown-opt" href={`/user/profile/${superState.userID}`}>View Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="dropdown-opt" href="/" onClick={(e) => logout(e)}>Logout</NavDropdown.Item>
                </NavDropdown>
                <img className="profile-picture" src={superState.avatar} alt="profile pic" />
              </>
              )}
            </Nav>
          </div>

          {/* <>
            {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
              <Navbar key={expand} bg="light" expand={expand} className="navbar navbar_sm">
                <Container fluid className="navbar-container nav-flex">
                  <Navbar.Brand className="app-name" href="/">On Deck</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        On Deck
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div id="basic-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        {!superState.auth && (
                          <>
                            <Nav.Link className="header-login" href="/login">Login</Nav.Link>
                          </>
                        )}
                        {superState.auth && !superState.admin && (
                          <>
                            <Nav.Link autoFocus className="header-text" href="/posts">Game Posts</Nav.Link>
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
                          <NavDropdown className="dropdown" title={superState.username} id="nav-dropdown" variant="primary">
                            <NavDropdown.Item className="dropdown-opt" href={`/user/profile/${superState.userID}`}>View Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="dropdown-opt" href="/" onClick={(e) => logout(e)}>Logout</NavDropdown.Item>
                          </NavDropdown>
                          <img className="profile-picture" src={superState.avatar} alt="profile pic" />
                        </>
                        )}
                        </Nav>
                      </div>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))}
          </> */}


        </Container>
      </Navbar>
    </>
  );
}

export default Header;