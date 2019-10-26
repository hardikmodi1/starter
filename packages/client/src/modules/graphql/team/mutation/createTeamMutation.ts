import gql from 'graphql-tag'

export const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($name: String!) {
    createTeam(name: $name) {
      path
      message
    }
  }
`
