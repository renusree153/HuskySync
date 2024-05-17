/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClass = `
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
export const updateClass = `
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
export const deleteClass = `
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
export const createQuiz =  `
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
      rsvpquizzes
      __typename
    }
  }
`;
export const updateQuiz = `
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
export const deleteQuiz =  `
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
export const createUsers = `
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
export const updateUsers = `
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
export const deleteUsers = `
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
export const createMessage =  `
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
export const updateMessage = `
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
export const deleteMessage =  `
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
export const createExtractedTexts = `
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
export const updateExtractedTexts = `
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
export const deleteExtractedTexts = `
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
