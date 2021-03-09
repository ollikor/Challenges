/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      title
      startDate
      startDateString
      days
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        startDate
        startDateString
        days
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
