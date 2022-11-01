import "../../styles/HomePage.css";
import homepic from "../../images/homepic.jpeg";
import Nav from "react-bootstrap/Nav";


function Home() {
    return (
    <main>
      <div className="home-container">
        <img className="homepic" src={homepic} alt="home-pic" />
        <h3 className="home-page-text">Welcome to On Deck<br></br><br></br>The sports app that lets you still play around your busy schedule</h3>
      </div>
      <div className="home-lower-buttons">
        <Nav.Link className="home-create-account btn-hover" href="/register">Create Account</Nav.Link>
        <Nav.Link className="home-create-team-account btn-hover" href="/teamregister">Create Team Account</Nav.Link>
        <Nav.Link className="home-login btn-hover" href="/login">Login</Nav.Link>
      </div>
    </main>  
    );
  }
  
  export default Home;