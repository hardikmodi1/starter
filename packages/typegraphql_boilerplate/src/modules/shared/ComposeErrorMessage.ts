import Error from "./ErrorType";

const ComposeErrorMessage = (path?: string, message?: string): Error => {
	return {
		path,
		message
	};
};

export default ComposeErrorMessage;