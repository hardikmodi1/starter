import * as React from "react";
import { useMutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
	CreateTeamMutationMutationResult,
	CreateTeamMutationMutationVariables
} from "../../generated/graphqlTypes";
import { CREATE_TEAM_MUTATION } from "../graphql/team/mutation/createTeamMutation";
import { normalizeErrors } from "../shared/normalizeError";
import CreateTeamView from "./CreateTeamView";

const CreateTeam: React.FC<RouteComponentProps<{}>> = props => {
	const [createTeam, { loading }] = useMutation<
		CreateTeamMutationMutationResult,
		CreateTeamMutationMutationVariables
	>(CREATE_TEAM_MUTATION);
	async function submit(values: CreateTeamMutationMutationVariables) {
		const { data } = await createTeam({ variables: values });
		console.log((data! as any).createTeam);
		if ((data! as any).createTeam) {
			if ((data! as any).createTeam.path === "user") {
				props.history.push("/login", {
					message: "Your session had expired Please logi again"
				});
			} else {
				return normalizeErrors([(data! as any).createTeam] as any[]);
			}
		}
		return null;
	}
	function onFinish() {
		// props.history.push("/m/confirm-email", {
		// 	message: "check your email to confirm your account"
		// });
	}
	return (
		<CreateTeamView submit={submit} onFinish={onFinish} loading={loading} />
	);
};

export default CreateTeam;
