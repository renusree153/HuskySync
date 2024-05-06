import AWS from 'aws-sdk';
import fetch from 'node-fetch';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {
    console.log("received event ", event);
    const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYAPI_GRAPHQLAPIENDPOINTOUTPUT;
    const GRAPHQL_API_KEY = process.env.API_AMPLIFYAPI_GRAPHQLAPIKEYOUTPUT;
    const query = `
    mutation CreateUsers(
      $input: CreateUsersInput!
    ) {
      createUsers(input: $input) {
        id
        email
        username
      }
    }
  `;

    function generateUniqueId() {
      const timestamp = Date.now().toString(36); 
      const randomString = Math.random().toString(36).substring(2, 7); 
      return `${timestamp}-${randomString}`;
    }

    const variables = {
        input: {
            id: generateUniqueId(),
            email: event.request.userAttributes.email,
            username: event.userName
        },
    };

    const options = {
        method: "POST",
        headers: {
            "x-api-key": GRAPHQL_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    };

    try {
        const res = await fetch(GRAPHQL_ENDPOINT, options);
        const data = await res.json();

        if (data.errors) {
            console.error("GraphQL errors: ", data.errors);
            return {
                statusCode: 400,
                body: JSON.stringify({ errors: data.errors }),
            };
        } else {
            const params = {
                TableName: "Users-nto6fjkdwbgzfgepj7kapss24i-dev",
                Item: {
                    email: variables.input.email,
                    username: variables.input.username
                },
            };

            await dynamoDb.put(params).promise();

            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        }
    } catch (error) {
        console.error("Error fetching data or writing to DynamoDB: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message,
            }),
        };
    }
};
