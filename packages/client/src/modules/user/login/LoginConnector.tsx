import * as React from "react";
import { useApolloClient, useMutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
	LoginMutationMutationResult,
	LoginMutationMutationVariables
} from "../../../generated/graphqlTypes";
import { LOGIN_MUTATION } from "../../graphql/user/mutation/loginMutation";
import { normalizeErrors } from "../../shared/normalizeError";
import LoginView from "./LoginView";

const Login: React.FC<RouteComponentProps<{}>> = props => {
	const [login, { loading }] = useMutation<
		LoginMutationMutationResult,
		LoginMutationMutationVariables
	>(LOGIN_MUTATION);
	const client = useApolloClient();
	async function submit(values: LoginMutationMutationVariables) {
		const { data } = await login({ variables: values });
		console.log((data! as any).login);
		if ((data! as any).login) {
			return normalizeErrors((data! as any).login as any[]);
		}
		await client!.resetStore();
		return null;
	}
	function onFinish() {
		// props.history.push("/m/confirm-email", {
		// 	message: "check your email to confirm your account"
		// });
	}
	return <LoginView submit={submit} onFinish={onFinish} loading={loading} />;
};

export default Login;
