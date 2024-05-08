/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
      __typename
    }
  }
`;
export const getQuiz = /* GraphQL */ `
  query GetQuiz($id: ID!) {
    getQuiz(id: $id) {
      id
      curnumbers
      class
      date
      description
      quizname
      tags
      time
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listQuizzes = /* GraphQL */ `
  query ListQuizzes(
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        class
        date
        description
        quizname
        tags
        time
      }
      nextToken
      __typename
    }
  }
`;


// This is a simple query to pull all quizes and stores them in an items. We will probably need to modify this later
export const getTotalQuizzes = /* GraphQL */ `
  query GetTotalQuizzes {
    listQuizzes {
      items {
        id
      }
      nextToken
    }
  }
`;

// This returns all classes from the class table that begin with bio- maybe helpful if we code this out to each of the hard classes for search 
export const filterClassNameBIO = /* GraphQL */ `
query filterClassNameBIO {
  listClasses(filter: {name: {beginsWith: "BIO"}}) {
    items {
      name
      id
    }
  }
}
`;
export const getUsers = /* GraphQL */ `
  query GetUsers {
    getUsers(id: $id) {
      id
      username
      firstname
      lastname
      groups
      bio
      email
      pastquizzes
      rsvpquizzes
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        firstname
        lastname
        groups
        bio
        email
        pastquizzes
        rsvpquizzes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const rsvpQuizzesForUser = `
query rsvpQuizzesForUser ($id: ID!) {
  getUsers(id: $id) {
      id
    	rsvpquizzes
  }
}
`
;
export const pastQuizzesForUser = `
query pastQuizzesForUser {
  getUsers(id: $id) {
      id
    	pastquizzes
  }
}
`
;
export const listQuizzesFilteredByClass = /* GraphQL */ `
  query ListQuizzesFilteredByClass($classType: String, $limit: Int, $nextToken: String) {
    listQuizzes(
      filter: {
        class: { beginsWith: $classType }
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        class
        date
        description
        quizname
        tags
        time
      }
      nextToken
      __typename
    }
  }
`;
export const AllUsersAndIds = `
  query AllUsersAndIds($classType: String, $limit: Int, $nextToken: String) {
    listQuizzes(
      filter: {
        class: { beginsWith: $classType }
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        class
        date
        description
        quizname
        tags
        time
      }
      nextToken
      __typename
    }
  }
  `;

export const get_user_quizzes = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      rsvpquizzes
    }
  }
`
