export const loginMutation = `mutation Login($usernameOrEmail: String!, $password: String!){
  login(usernameOrEmail: $usernameOrEmail, password: $password){
    path
    message
  }
}`
