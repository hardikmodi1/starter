import { ApolloServer } from 'apollo-server-express'
import * as connectRedis from 'connect-redis'
import * as cors from 'cors'
import * as Express from 'express'
import * as session from 'express-session'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { User } from './entity/User'
import { createTypeOrmConn } from './modules/utils/createTypeOrmConn'
import { redis } from './redis'

const RedisStore = connectRedis(session as any)
const main = async () => {
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
  let retries = 25
  while (retries) {
    try {
      await createTypeOrmConn()
      break
    } catch (err) {
      console.log(err)
      retries -= 1
      console.log(`retries left: ${retries}`)
      await new Promise(res => setTimeout(res, 5000))
    }
  }
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
  console.log(await User.find({ where: { email: 'hmodi2457@gmail.com' } }))
  console.log(app)
  await app.listen(4000)
  console.log('listening on http://localhost:4000/graphql')
}

main()
