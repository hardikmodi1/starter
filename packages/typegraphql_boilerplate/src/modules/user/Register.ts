import * as bcrypt from "bcryptjs";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import Error from "../shared/ErrorType";
import { formatYupError } from "../utils/formatYupError";
import { RegisterInput } from "./register/RegisterInput";
import { validUserSchema } from "./register/validUserSchema";

@Resolver()
export class RegisterResolver {
	@Authorized()
	@Query(() => String)
	async hello() {
		return "hello world";
	}

	@Mutation(() => [Error], { nullable: true })
	async register(@Arg("data")
	{
		email,
		password,
		username
	}: RegisterInput): Promise<Error[] | null> {
		try {
			await validUserSchema.validate(
				{ email, password, username },
				{ abortEarly: false }
			);
		} catch (err) {
			return formatYupError(err);
		}
		const userAlreadyExist: User | undefined = await User.findOne({
			where: [{ username }, { email }]
		});
		if (userAlreadyExist) {
			if (userAlreadyExist.username === username) {
				return [
					ComposeErrorMessage("username", "Username already exist")
				];
			}
			if (userAlreadyExist.email === email) {
				return [ComposeErrorMessage("email", "Email already exist")];
			}
		}

		try {
			const hashedPassword = await bcrypt.hash(password, 12);
			await User.create({
				email,
				password: hashedPassword,
				username
			}).save();
			// await sendEmail(email, await createConfirmationUrl(user.id));
			return null;
		} catch (err) {
			return [ComposeErrorMessage("user", "Something went wrong")];
		}
	}
}
