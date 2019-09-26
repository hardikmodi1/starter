import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
	mutation LoginMutation($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			path
			message
		}
	}
`;
