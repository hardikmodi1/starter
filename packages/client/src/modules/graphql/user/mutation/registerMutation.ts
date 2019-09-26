import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
    register(data: {email:$email,password:$password,username: $username}) {
      path
      message
    }
  }
`;