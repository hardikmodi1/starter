export const registerMutation = `mutation Register($data: RegisterInput!){
  register(data: $data){
    path
    message
  }
}`
