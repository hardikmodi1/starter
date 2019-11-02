import * as bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { Context } from '../../types/Context'
import { passwordIncorrect, userDoesNotExist } from '../constants/errorMessages'
import ComposeErrorMessage from '../shared/ComposeErrorMessage'
import Error from '../shared/ErrorType'

@Resolver()
export class LoginResolver {
  @Mutation(() => [Error], { nullable: true })
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<Error[] | null> {
    const user = await User.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    })
    if (!user) {
      return [ComposeErrorMessage('usernameOrEmail', userDoesNotExist)]
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return [ComposeErrorMessage('password', passwordIncorrect)]
    }
    if (!user.confirmed) {
      return [ComposeErrorMessage('password', 'Please confirm your account')]
    }
    ctx.req.session!.userId = user.id
    return null
  }
}
