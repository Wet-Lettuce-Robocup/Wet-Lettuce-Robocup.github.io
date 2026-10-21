import "../styles/Footer.scss"
import logo from "../assets/dry-lettuce-logo.svg"

function Footer() {
  return (
    <footer>
      <img className="logo" src={logo} />
      <p>Copyright 2026 Dry Lettuce</p>
      <p>Contact: william@dolier.net</p>
    </footer>
  )
}

export default Footer;
