import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    // eslint-disable-next-line
    const id = JSON.parse(
        localStorage.getItem('current-user')
    )._id;
    // Simply clear localStorage and navigate to login
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
      <span>Logout</span>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem; /* Adjust padding for better spacing */
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #ebe7ff;
  gap: 0.5rem; /* Space between icon and text */
  transition: padding 0.3s, font-size 0.3s ease;

  svg {
    font-size: 1.3rem;
    transition: font-size 0.3s ease;
  }

  span {
    margin-left: 0.5rem; /* Space between icon and text */
    font-size: 1rem;
  }

  @media screen and (max-width: 1024px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;

    svg {
      font-size: 1.1rem;
    }

    span {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;

    svg {
      font-size: 1rem;
    }

    span {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;

    svg {
      font-size: 0.9rem;
    }

    span {
      font-size: 0.75rem;
    }
  }
`;
