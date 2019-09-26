import * as React from "react";
import { useMutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
	RegisterMutationMutationResult,
	RegisterMutationMutationVariables
} from "../../../generated/graphqlTypes";
import { REGISTER_MUTATION } from "../../graphql/user/mutation/registerMutation";
import { normalizeErrors } from "../../shared/normalizeError";
import RegisterView from "./RegisterView";

const Register: React.FC<RouteComponentProps<{}>> = props => {
	const [register, { loading }] = useMutation<
		RegisterMutationMutationResult,
		RegisterMutationMutationVariables
	>(REGISTER_MUTATION);
	async function submit(values: RegisterMutationMutationVariables) {
		const { data } = await register({ variables: values });
		console.log((data! as any).register);
		if ((data! as any).register) {
			return normalizeErrors((data! as any).register as any[]);
		}
		return null;
	}
	function onFinish() {
		// props.history.push("/m/confirm-email", {
		// 	message: "check your email to confirm your account"
		// });
	}
	return (
		<RegisterView submit={submit} onFinish={onFinish} loading={loading} />
	);
};

export default Register;
