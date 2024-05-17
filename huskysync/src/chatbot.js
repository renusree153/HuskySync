import React, { useEffect, useState } from "react";
import styles from "../src/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, Auth, withSSRContext } from "aws-amplify";
import { listMessages } from "../src/graphql/queries";
import { createMessage } from "../src/graphql/mutations.js";
import Message from "../src/message.js";
import { onCreateMessage } from "../src/graphql/subscriptions";
import { getCurrentUser } from 'aws-amplify/auth';
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { runWithAmplifyServerContext } from 'aws-amplify/adapter-core';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

function Home({ messages }) {
  const [stateMessages, setStateMessages] = useState([]);
  const [messageText, setMessageText] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndSubscribe = async () => {
      try {
        // Retrieve the current authenticated user
        const currentUser = await getCurrentUser();
        setUser(currentUser);

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
          error: (error) => console.warn(error),
        });

        return () => {
          // Clean up the subscription on component unmount
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching user or subscribing:', error);
      }
    };

    fetchUserAndSubscribe();
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const messagesReq = await client.graphql({
          query: listMessages,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        setStateMessages([...messagesReq.data.listMessages.items]);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessageText("");

    const input = {
      message: messageText,
      owner: user.username,
    };

    try {
      await client.graphql({
        authMode: "AMAZON_COGNITO_USER_POOLS",
        query: createMessage,
        variables: {
          input: input,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <h1 className={styles.title}> HuskySync Live Chat</h1>
          <div className={styles.chatbox}>
            {stateMessages
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((message) => (
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
                placeholder="💬 Send a message to your Quizmates!!"
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

export async function getServerSideProps({ req }) {
  // wrap the request in a withSSRContext to use Amplify functionality serverside.
  const SSR = runWithAmplifyServerContext({ req });

  try {
    // currentAuthenticatedUser() will throw an error if the user is not signed in.
    const user = await SSR.getCurrentUser();

    // If we make it passed the above line, that means the user is signed in.
    const response = await SSR.client.graphql({
      query: listMessages,
      // use authMode: AMAZON_COGNITO_USER_POOLS to make a request on the current user's behalf
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    // return all the messages from the dynamoDB
    return {
      props: {
        messages: response.data.listMessages.items,
      },
    };
  } catch (error) {
    // We will end up here if there is no user signed in.
    // We'll just return a list of empty messages.
    return {
      props: {
        messages: [],
      },
    };
  }
}
