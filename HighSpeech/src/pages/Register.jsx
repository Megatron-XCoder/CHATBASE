// pages/Register.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('current-user')) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, email, password } = values;
    if (username === "" || email === "" || password === "") {
      toast.error("All fields are required.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem(
              'current-user',
              JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error registering:", error);
        toast.error("An error occurred while registering.", toastOptions);
      }
    }
  };

  return (
      <>
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>Zappychat</h1>
            </div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create Account</button>
            <span>
            Already have an account? <Link to="/login">Login.</Link>
          </span>
          </form>
        </FormContainer>
        <ToastContainer />
      </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  padding: 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
      transition: height 0.3s ease;
    }

    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2rem;
      transition: font-size 0.3s ease;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
    width: 100%;
    max-width: 500px;
    transition: padding 0.3s ease;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 1px solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      transition: border 0.3s ease;

      &:focus {
        border: 1px solid #997aff;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s ease;

      &:hover {
        background-color: #4e0effbb;
      }
    }

    span {
      color: white;
      text-align: center;
    }
  }
`;
