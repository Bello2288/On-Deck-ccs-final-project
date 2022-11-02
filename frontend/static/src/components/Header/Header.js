import "../../styles/Header.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Navigate, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import football from "../../images/football.png";

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
            <img className="sport-icon" src={football} alt="chair" />
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
                  <Nav.Link className="header-text" href="/posts">Posts</Nav.Link>
                  <Nav.Link className="header-text" href="/create">Create Post</Nav.Link>
                  <Nav.Link className="header-text" href="/posts/user">My Posts</Nav.Link>
                </>
              )}
              {superState.admin && (
                <>
                  <Nav.Link className="header-text" href="/posts/editor">Review Posts</Nav.Link>
                </>
              )}
              {superState.auth && (
                <Nav.Link className="header-login" href="/" onClick={(e) => logout(e)}>
                  Logout
                </Nav.Link>
              )}
              {/* <div>User name</div> */}
              {superState.avatar && (
              <img className="profile-picture" src={superState.avatar} alt="profile img" />
            )} 
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

// return (
//   <>
//     <Navbar expand="lg" className="header">
//       <Container className="navbar-container">
//         <Navbar.Brand className="app-logo" href="/">
//           All Sports Goes News App
//         </Navbar.Brand>
//         <div className="desk-nav">
//           <Nav className="me-auto desk-nav-links">
//             {!superState.auth && (
//               <>
//                 <Nav.Link href="/login">Login</Nav.Link>
//               </>
//             )}
//             {superState.auth && !superState.admin && (
//               <>
//                 <Nav.Link className="at" href="/create">Article <br></br>Creation</Nav.Link>
//                 <Nav.Link className="article-tabs" href="/articles/user">View My <br></br>Articles</Nav.Link>
//               </>
//             )}
//             {superState.admin && (
//               <>
//                 <Nav.Link className="artricle-review" href="/articles/editor">Review Articles</Nav.Link>
//               </>
//             )}
//             {superState.auth && (
//               <Nav.Link className="logout" href="/" onClick={(e) => logout(e)}>
//                 Logout
//               </Nav.Link>
//             )}
//           </Nav>
//           {superState.avatar && (
//             <img className="profile-picture" src={superState.avatar} alt="profile picture" />
//           )}
//         </div>
//       </Container>
//     </Navbar>

//     <Nav className="me-auto mobile-nav">
//       {!superState.auth && (
//         <>
//           <Nav.Link className="footer-link" href="/login">
//             Login
//           </Nav.Link>
//         </>
//       )}
//       {superState.auth && !superState.admin && (
//         <>
//           <Nav.Link className="footer-link" href="/create">
//             Create Article
//           </Nav.Link>
//           <Nav.Link className="footer-link" href="/articles/user">
//             My Articles
//           </Nav.Link>
//         </>
//       )}
//       {superState.admin && (
//         <>
//           <Nav.Link className="footer-link" href="/articles/editor">
//             Review Articles
//           </Nav.Link>
//         </>
//       )}
//       {superState.auth && (
//         <Nav.Link className="footer-link" href="/" onClick={(e) => logout(e)}>
//           Logout
//         </Nav.Link>
//       )}
//     </Nav>
//   </>
// );
// }
