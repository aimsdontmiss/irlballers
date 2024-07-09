import { gql } from 'graphql-request';

export const GET_LEADERS_IN_PPG = gql`
  query GetLeadersInPPG {
    allStats(orderBy: { field: "ppg", order: DESC }) {
      playerId
      name
      ppg
      apg
      rpg
    }
  }
`;