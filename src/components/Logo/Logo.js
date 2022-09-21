import logo from "../../images/logo.svg";
import "./Logo.css";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="Логотип" />
    </Link>
  );
}
