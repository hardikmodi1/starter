import * as yup from "yup";
import {
	emailNotLongEnough,
	invalidEmail,
	passwordNotLongEnough,
	usernameNotLongEnough
} from "../../../modules/constants/errorMessages";

export const validUserSchema = yup.object().shape({
	email: yup
		.string()
		.min(3, emailNotLongEnough)
		.max(255)
		.email(invalidEmail)
		.required(),
	password: yup
		.string()
		.min(3, passwordNotLongEnough)
		.max(255)
		.required(),
	username: yup
		.string()
		.min(1, usernameNotLongEnough)
		.required()
});
