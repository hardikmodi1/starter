import * as bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { Context } from "../../types/Context";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {
	@Mutation(() => User, { nullable: true })
	async changePassword(
		@Arg("data")
		{ token, password }: ChangePasswordInput,
		@Ctx() ctx: Context
	): Promise<User | null> {
		const userId = await redis.get(forgotPasswordPrefix + token);
		if (!userId) {
			return null;
		}
		const user = await User.findOne(userId);
		if (!user) {
			return null;
		}
		await redis.del(forgotPasswordPrefix + token);
		user.password = await bcrypt.hash(password, 12);
		await user.save();
		ctx.req.session!.userId = user.id;
		return user;
	}
}
