import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      username
    }
  }
`
