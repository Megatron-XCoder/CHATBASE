import React from "react";
import styled from "styled-components";

const defaultAvatarUrl = 'path_to_default_avatar'; // Replace with actual URL

const Contacts = ({ contacts, changeChat, currentUserAvatar, currentUserName }) => {
  return (
    <Container >
      <div className="current-user">
        {currentUserAvatar ? (
          <img src={currentUserAvatar} alt="Current User Avatar" className="current-avatar" />
        ) : (
          <img src={defaultAvatarUrl} alt="Default Avatar" className="current-avatar" />
        )}
        <h2>{currentUserName || 'Unknown User'}</h2>
      </div>
      <div className="contacts">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div
              key={index}
              className="contact"
              onClick={() => changeChat(contact)}
              aria-label={`Chat with ${contact.username}`}
            >
              <img
                src={contact.avatarImage || defaultAvatarUrl}
                alt={`Avatar of ${contact.username}`}
                className="contact-avatar"
              />
              <div className="contact-info">
                <h3>{contact.username}</h3>
                <span className={`status ${contact.isOnline ? 'online' : 'offline'}`}>
                  {contact.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  padding: 1rem;
  height: 100%;
  width: 100%;

  .current-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;

    .current-avatar {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 0.5rem;

      @media screen and (max-width: 720px) {
        width: 4rem;
        height: 4rem;
      }
    }

    h2 {
      color: white;
      @media screen and (max-width: 720px) {
        font-size: 1rem;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 1rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }

    .contact {
      cursor: pointer;
      padding: 1rem;
      background-color: #2c2c2c;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      .contact-avatar {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        object-fit: cover;

        @media screen and (max-width: 720px) {
          width: 3rem;
          height: 3rem;
        }
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        h3 {
          color: white;
          @media screen and (max-width: 720px) {
            font-size: 0.8rem;
          }
        }

        .status {
          font-size: 0.8rem;
          color: #a0a0a0; /* Default color */
          &.online {
            color: green; /* Online color */
          }
          &.offline {
            color: red; /* Offline color */
          }
        }
      }

      &:hover {
        background-color: #4e0eff;
      }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    .contacts {
      padding-right: 0.5rem;
      gap: 0.5rem;
    }

    .contact {
      padding: 0.5rem;
      gap: 0.5rem;

      .contact-avatar {
        width: 3.5rem;
        height: 3.5rem;
      }

      h3 {
        font-size: 0.9rem;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .contacts {
      padding-right: 0.2rem;
      gap: 0.4rem;
    }

    .contact {
      padding: 0.4rem;
      gap: 0.4rem;

      .contact-avatar {
        width: 3rem;
        height: 3rem;
      }

      h3 {
        font-size: 0.8rem;
      }
    }
  }
`;

export default Contacts;
