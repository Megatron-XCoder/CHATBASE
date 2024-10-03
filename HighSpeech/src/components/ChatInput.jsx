import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Toggle emoji picker visibility
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Handle emoji click
  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  // Send message
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  @media screen and (max-width: 720px) {
    grid-template-columns: 10% 90%; /* Adjust grid for smaller screens */
    padding: 0 1rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 15% 85%; /* Further adjust for smaller mobile screens */
    padding: 0 0.5rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;

        @media screen and (max-width: 720px) {
          font-size: 1.3rem;
        }

        @media screen and (max-width: 480px) {
          font-size: 1.1rem;
        }
      }

      .emoji-picker-container {
        position: absolute;
        top: -500px; /* Adjust positioning */
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;

        .emoji-picker-react {
          position: absolute;
          top: -350px;
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3;
          border-color: #9a86f3;

          .emoji-scroll-wrapper::-webkit-scrollbar {
            background-color: #080420;
            width: 5px;

            &-thumb {
              background-color: #9a86f3;
            }
          }

          .emoji-categories {
            button {
              filter: contrast(0);
            }
          }

          .emoji-search {
            background-color: transparent;
            border-color: #9a86f3;
          }

          .emoji-group:before {
            background-color: #080420;
          }
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    @media screen and (max-width: 720px) {
      gap: 1.5rem;
    }

    @media screen and (max-width: 480px) {
      gap: 1rem;
    }

    input {
      width: 90%;
      height: 3rem; /* Set a consistent height */
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }

      @media screen and (max-width: 720px) {
        font-size: 1rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 0.9rem;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1rem;
        }
      }

      @media screen and (max-width: 720px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1.5rem;
        }
      }

      @media screen and (max-width: 480px) {
        padding: 0.3rem 0.8rem;

        svg {
          font-size: 1.2rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

