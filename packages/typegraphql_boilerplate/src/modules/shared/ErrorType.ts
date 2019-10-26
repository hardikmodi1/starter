import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Error {
  @Field({ nullable: true })
  path?: string

  @Field({ nullable: true })
  message?: string
}
