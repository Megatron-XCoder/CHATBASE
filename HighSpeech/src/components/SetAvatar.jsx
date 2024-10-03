import React, { useEffect, useState } from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import avatar1 from "../assets/avatar1.png"; // Add your local avatar images
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import avatar6 from "../assets/avatar6.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";


export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars] = useState([avatar1, avatar2,avatar3,avatar4,avatar5,avatar6]); // Static avatars
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false); // No longer fetching, so not loading
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // 1. useEffect to check user authentication
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('current-user');
      if (!user) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  // 2. Function to set profile picture
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem('current-user')
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
            'current-user',
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding: 1rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      font-size: 2rem;
    }
  }

  .avatars {
    display: flex;
    justify-content: center; /* Ensures avatars are centered */
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%; /* Allows avatars to take full width */
    padding: 0 1rem; /* Add padding on both sides for alignment */

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    gap: 2rem;

    .avatars {
      gap: 1rem;

      .avatar img {
        height: 4rem;
      }
    }

    .submit-btn {
      padding: 0.8rem 1.6rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    gap: 1.5rem;

    .title-container h1 {
      font-size: 1.5rem;
    }

    .avatars {
      gap: 0.8rem;
      padding: 0 0.5rem; /* Reduce padding for smaller screens */

      .avatar img {
        height: 3.5rem;
      }
    }

    .submit-btn {
      padding: 0.6rem 1.2rem;
      font-size: 0.8rem;
    }
  }
`;
