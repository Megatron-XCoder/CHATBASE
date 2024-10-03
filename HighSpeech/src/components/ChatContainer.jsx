import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Logo from "../assets/robot.gif";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const chatMessagesRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const data = JSON.parse(localStorage.getItem('current-user'));
      if (data && currentChat) {
        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentChat]);

  useEffect(() => {
    const currentSocket = socket.current;
    if (currentSocket) {
      currentSocket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });

      currentSocket.on("user-status", (userId, isOnline) => {
        console.log(`User ${userId} is ${isOnline ? "online" : "offline"}`);
      });
    }

    return () => {
      if (currentSocket) {
        currentSocket.off("msg-recieve");
        currentSocket.off("user-status");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem('current-user'));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, { fromSelf: true, message: msg }];
      scrollToBottom();
      return newMessages;
    });
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={Logo} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currentChat.username}</h2>
          </div>
        </div>
        <Logout />
      </div>

      <div className="chat-body">
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((message) => (
            <div key={uuidv4()} className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 76% 12%;
  gap: 0;
  overflow: hidden;
  height: 100vh;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    @media screen and (max-width: 720px) {
      padding: 0 1rem;
    }

    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .avatar {
        img {
          height: 7rem;

          @media screen and (max-width: 720px) {
            height: 2.5rem;
          }

          @media screen and (max-width: 480px) {
            height: 2rem;
          }
        }
      }

      .username {
        h2 {
          color: white;

          @media screen and (max-width: 720px) {
            font-size: 1rem;
          }

          @media screen and (max-width: 480px) {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .chat-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    max-height: calc(100% - 4rem);

    @media screen and (max-width: 720px) {
      padding: 1rem 1rem;
      gap: 0.5rem;
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }

        @media screen and (max-width: 720px) {
          max-width: 60%;
          padding: 0.8rem;
          font-size: 1rem;
        }

        @media screen and (max-width: 480px) {
          max-width: 80%;
          padding: 0.6rem;
          font-size: 0.9rem;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
      }
    }

    .recieved {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
