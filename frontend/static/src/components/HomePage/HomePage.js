import "../../styles/HomePage.css";
import homepic from "../../images/homepic.jpeg";
import footballpic from "../../images/flag_football.jpeg";
import hockeypic from "../../images/hockey.webp";
import Nav from "react-bootstrap/Nav";
import Carousel from 'react-bootstrap/Carousel';
import { useOutletContext } from "react-router-dom";


function Home() { 

  const { superState } = useOutletContext();

    return (
    <main>
      <Carousel fade className="center">
        <Carousel.Item>
          <img
            className="d-block homepic pic1"
            src={homepic}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to On Deck</h3>
            <p>The sports app that allows you play games around your busy schedule</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block homepic pic2"
            src={footballpic}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Browse available games</h3>
            <p>Filter through the sports you like and see if someone is in need of a player</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block homepic pic3"
            src={hockeypic}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>On a team that will be down a player for a game?</h3>
            <p>On Deck allows you to make a post looking for someone to fill and empty spot</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {superState.auth === false && (
        <div className="home-lower-buttons"> 
          <Nav.Link className="home-create-account btn-hover" href="/register">Create Account</Nav.Link>
          <Nav.Link className="home-login btn-hover" href="/login">Login</Nav.Link>
        </div>
      )}
    </main>  
    );
  }
  
  export default Home;