/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createQuiz = /* GraphQL */ `
  mutation CreateQuiz(
    $input: CreateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    createQuiz(input: $input, condition: $condition) {
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
export const updateQuiz = /* GraphQL */ `
  mutation UpdateQuiz(
    $input: UpdateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    updateQuiz(input: $input, condition: $condition) {
      id
      curnumbers
      class
      date
      description
      quizname
      tags
      s3objs
      time
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteQuiz = /* GraphQL */ `
  mutation DeleteQuiz(
    $input: DeleteQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    deleteQuiz(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      owner
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createExtractedTexts = /* GraphQL */ `
  mutation CreateExtractedTexts(
    $input: CreateExtractedTextsInput!
    $condition: ModelExtractedTextsConditionInput
  ) {
    createExtractedTexts(input: $input, condition: $condition) {
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
export const updateExtractedTexts = /* GraphQL */ `
  mutation UpdateExtractedTexts(
    $input: UpdateExtractedTextsInput!
    $condition: ModelExtractedTextsConditionInput
  ) {
    updateExtractedTexts(input: $input, condition: $condition) {
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
export const deleteExtractedTexts = /* GraphQL */ `
  mutation DeleteExtractedTexts(
    $input: DeleteExtractedTextsInput!
    $condition: ModelExtractedTextsConditionInput
  ) {
    deleteExtractedTexts(input: $input, condition: $condition) {
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
