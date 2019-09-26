import { Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../../types/Context";

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<Boolean> {
		return new Promise((res, rej) => {
			ctx.req.session!.destroy(err => {
				if (err) {
					console.log(err);
					return rej(false);
				}
				ctx.res.clearCookie("qid");
				return res(true);
			});
		});
	}
}
