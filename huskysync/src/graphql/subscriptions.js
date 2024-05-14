/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onCreateQuiz(filter: $filter) {
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
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onUpdateQuiz(filter: $filter) {
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
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($filter: ModelSubscriptionQuizFilterInput) {
    onDeleteQuiz(filter: $filter) {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateExtractedTexts = /* GraphQL */ `
  subscription OnCreateExtractedTexts(
    $filter: ModelSubscriptionExtractedTextsFilterInput
  ) {
    onCreateExtractedTexts(filter: $filter) {
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
export const onUpdateExtractedTexts = /* GraphQL */ `
  subscription OnUpdateExtractedTexts(
    $filter: ModelSubscriptionExtractedTextsFilterInput
  ) {
    onUpdateExtractedTexts(filter: $filter) {
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
export const onDeleteExtractedTexts = /* GraphQL */ `
  subscription OnDeleteExtractedTexts(
    $filter: ModelSubscriptionExtractedTextsFilterInput
  ) {
    onDeleteExtractedTexts(filter: $filter) {
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
