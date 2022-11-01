import "../../styles/Footer.css"
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="name-tag">On Deck Sports App</div>
      <div className="copyright">
        <AiOutlineCopyrightCircle /> Carolina Code School 2022 - Cohort 13 Production by Gregg Bellofatto
      </div>
    </footer>
  );
}

export default Footer;