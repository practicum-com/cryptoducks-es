import React from "react";
import { Link, useHistory } from "react-router-dom";
import { removeToken } from "../utils/token";
import Logo from "./Logo.js";
import "./styles/NavBar.css";

function NavBar() {
  const history = useHistory();
  function signOut() {
    removeToken();
    history.push("/login");
  }
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>
      <ul className="navbar__nav">
        <li>
          <Link to="ducks" className="navbar__link">
            Ducks
          </Link>
        </li>
        <li>
          <Link to="my-profile" className="navbar__link">
            My perfil
          </Link>
        </li>
        <li>
          <button onClick={signOut} className="navbar__link navbar__button">
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
