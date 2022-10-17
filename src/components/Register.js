import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo.js";
import * as duckAuth from "../duckAuth.js";
import "./styles/Register.css";

class ___Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "jj",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      let { username, password, email } = this.state;
      duckAuth.register(username, password, email).then((res) => {
        if (res.statusCode !== 400) {
          this.setState(
            {
              message: "",
            },
            () => {
              this.props.history.push("/login");
            }
          );
        } else {
          this.setState({
            message: "¡Algo salió mal!",
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="register">
        <Logo title={"CryptoDucks"} />
        <p className="register__welcome">
          Por favor, inicia sesión o regístrate para acceder a CryptoDucks.
        </p>
        <p className="register__error">{this.state.message}</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label htmlFor="username">Iniciar sesión:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label htmlFor="confirmPassword">Confirma la contraseña:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__link">
              Regístrate aquí
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>¿Ya eres miembro?</p>
          <Link to="login" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    );
  }
}

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = data;
    if (password === confirmPassword) {
      duckAuth.register(username, password, email).then((res) => {
        if (res.statusCode !== 400) {
          setMessage("");
          history.push("/login");
        } else {
          setMessage("¡Algo salió mal!");
        }
      });
    }
  };

  return (
    <div className="register">
      <Logo title={"CryptoDucks"} />
      <p className="register__welcome">Por favor, regístrate.</p>
      <p className="register__error">{message}</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">Iniciar sesión:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirma la contraseña:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Regístrate aquí
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>¿Ya eres miembro?</p>
        <Link to="login" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
