import { Button, Form as AntForm, Icon } from "antd";
import { Field, Form, FormikProps, withFormik } from "formik";
import * as React from "react";
import { Link } from "react-router-dom";
import { RegisterMutationMutationVariables } from "../../../generated/graphqlTypes";
import { InputField } from "../../shared/InputField";
import { NormalizedErrorMap } from "../../shared/normalizedErrorMap";
import { validUserSchema } from "./validUserSchema";

const FormItem = AntForm.Item;

interface FormValues {
	email: string;
	username: string;
	password: string;
}

interface Props {
	loading: boolean;
	onFinish: () => void;
	submit: (
		values: RegisterMutationMutationVariables
	) => Promise<NormalizedErrorMap | null>;
}

const C: React.FC<FormikProps<FormValues> & Props> = props => {
	return (
		<div style={{ width: 400, margin: "auto" }}>
			<h1>Register</h1>
			<Form>
				<div>
					<Field
						name="email"
						prefix={
							(
								<Icon
									type="mail"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							) as any
						}
						placeholder="Email"
						component={InputField}
					/>
					<Field
						name="username"
						prefix={
							(
								<Icon
									type="user"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							) as any
						}
						placeholder="Username"
						component={InputField}
					/>
					<Field
						name="password"
						type="password"
						prefix={
							(
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							) as any
						}
						placeholder="Password"
						component={InputField}
					/>
					<FormItem>
						<Button
							type="primary"
							htmlType="submit"
							disabled={props.loading}
						>
							Register
						</Button>
					</FormItem>
					<FormItem>
						<Link to="/forgot-password">Forgot password</Link>
					</FormItem>
					<FormItem>
						Or <Link to="/login">login now!</Link>
					</FormItem>
				</div>
			</Form>
		</div>
	);
};

const RegisterView = withFormik<Props, FormValues>({
	validationSchema: validUserSchema,
	mapPropsToValues: () => ({ email: "", username: "", password: "" }),
	handleSubmit: async (values, { props, setErrors }) => {
		const errors = await props.submit(values);
		// await props.submit(values);
		if (errors) {
			setErrors(errors);
		} else {
			props.onFinish();
		}
	}
})(C);

export default RegisterView;
