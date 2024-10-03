import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout"; // Import the Logout component

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const userData = await JSON.parse(localStorage.getItem('current-user'));
      if (userData) {
        setUserName(userData.username);
      }
    };

    fetchUserName();
  }, []);

  return (
      <Container>
        <LogoutContainer>
          <Logout /> {/* Include the Logout button */}
        </LogoutContainer>
        <Content>
          <img src={Robot} alt="Robot" />
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h3>Please select a chat to start messaging.</h3>
        </Content>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  position: relative; /* Position relative to allow absolute positioning of the Logout button */
  width: 100%;
  height: 100vh;
  padding: 1rem;

  @media screen and (max-width: 720px) {
    padding: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.25rem;
  }
`;

const LogoutContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media screen and (max-width: 720px) {
    top: 0.5rem;
    right: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    top: 0.25rem;
    right: 0.25rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;

  img {
    height: 20rem;
    transition: all 0.3s ease;
  }

  span {
    color: #4e0eff;
    font-size: 1.5rem;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 720px) {
    img {
      height: 15rem;
    }

    span {
      font-size: 1.25rem;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      height: 12rem;
    }

    span {
      font-size: 1rem;
    }
  }
`;
