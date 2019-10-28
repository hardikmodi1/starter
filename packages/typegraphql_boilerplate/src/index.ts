import { ApolloServer } from 'apollo-server-express'
import * as connectRedis from 'connect-redis'
import * as cors from 'cors'
import * as Express from 'express'
import * as session from 'express-session'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createTypeOrmConn } from './modules/utils/createTypeOrmConn'
import { redis } from './redis'

const RedisStore = connectRedis(session as any)
const main = async () => {
  await createTypeOrmConn()
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.?s'],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId
    },
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  })
  const app = Express()

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  )

  apolloServer.applyMiddleware({ app, cors: false })
  console.log('reached here...')
  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql')
  })
}

main()
