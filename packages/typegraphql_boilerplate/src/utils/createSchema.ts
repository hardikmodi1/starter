import { buildSchema } from 'type-graphql'

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../modules/*/*.?s'],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId
    },
  })
