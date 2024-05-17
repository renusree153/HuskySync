/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClass = `
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
export const listClasses = `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getQuiz = `
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
export const listQuizzes = `
  query ListQuizzes(
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        curnumbers
        class
        date
        description
        quizname
        s3objs
        tags
        time
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// This is a simple query to pull all quizes and stores them in an items. We will probably need to modify this later
export const getTotalQuizzes =  `
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
export const filterClassNameBIO = `
query filterClassNameBIO {
  listClasses(filter: {name: {beginsWith: "BIO"}}) {
    items {
      name
      id
    }
  }
}
`;

export const getUsers = `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      bio
      email
      firstname
      lastname
      groups
      pastquizzes
      rsvpquizzes
      username
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers =  `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bio
        email
        firstname
        lastname
        groups
        pastquizzes
        rsvpquizzes
        username
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

export const listQuizzesFilteredByClass =  `
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
        s3objs
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
  }`;

export const getMessage = `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMessages = `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        message
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExtractedTexts =  `
  query GetExtractedTexts($id: ID!) {
    getExtractedTexts(id: $id) {
      documentId
      documentname
      extractedText
      quizname
      s3_bucket
      s3_key
      username
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listExtractedTexts = `
  query ListExtractedTexts(
    $filter: ModelExtractedTextsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExtractedTexts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        documentname
        extractedText
        quizname
        s3_bucket
        s3_key
        username
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
