import React, { useEffect, useState } from "react";
import styles from "../src/Home.module.css";
import { withAuthenticator, AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext } from "aws-amplify";
import { listMessages } from "../src/graphql/queries";
import { createMessage } from "../src/graphql/mutations.js";
import Message from "../src/message.js";
import { onCreateMessage } from "../src/graphql/subscriptions";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { runWithAmplifyServerContext } from 'aws-amplify/adapter-core';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
// chatbot.js


const client = generateClient();

function Home({ messages }) {
  const [stateMessages, setStateMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserAndSubscribe() {
      try {
        const currentUser = await getCurrentUser();
        console.log("Current User:", currentUser);
        setUser(currentUser);

       // Subscribe to the creation of messages
// Subscribe to the creation of messages
const subscription = client.graphql(
    graphqlOperation(onCreateMessage)
  ).subscribe({
    next: ({ provider, value }) => {
      setStateMessages((prevMessages) => [
        ...prevMessages,
        value.data.onCreateMessage,
      ]);
    },
    error: (error) => {
      console.warn("Subscription error:", error);
      console.log("Subscription error stack:", error.stack);
    },
  });
  

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching user or subscribing:", error);
      }
    }

    fetchUser();

    // Subscribe to creation of message
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: ({ provider, value }) => {
        setStateMessages((stateMessages) => [
          ...stateMessages,
          value.data.onCreateMessage,
        ]);
      },
      error: (error) => console.warn(error),
    });
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const messagesReq = await API.graphql({
          query: listMessages,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        console.log("Fetched messages:", messagesReq.data.listMessages.items);
        setStateMessages([...messagesReq.data.listMessages.items]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    
    if (user) {
      getMessages();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    // Prevent the page from reloading
    event.preventDefault();

    // clear the textbox
    setMessageText("");

    const input = {
      // id is auto populated by AWS Amplify
      message: messageText, // the message content the user submitted (from state)
      owner: user.username, // this is the username of the current user
    };

    // Try make the mutation to graphql API
    try {
      await API.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: createMessage,
        variables: {
          input: input,
        },
      });
      console.log("Message created successfully.");
    } catch (err) {
      console.error("Error creating message:", err);
    }
  };

  if (user) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <h1 className={styles.title}> AWS Amplify Live Chat</h1>
          <div className={styles.chatbox}>
            {stateMessages
              // sort messages oldest to newest client-side
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((message) => (
                // map each message into the message component with message as props
                <Message
                  message={message}
                  user={user}
                  isMe={user.username === message.owner}
                  key={message.id}
                />
              ))}
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.formBase}>
              <input
                type="text"
                id="message"
                name="message"
                autoFocus
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="💬 Send a message to the world 🌎"
                className={styles.textBox}
              />
              <button style={{ marginLeft: "8px" }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default withAuthenticator(Home);
