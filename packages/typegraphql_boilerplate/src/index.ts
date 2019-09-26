import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { redis } from "./redis";
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const main = async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [__dirname + "/modules/**/*.ts"],
		authChecker: ({ context: { req } }) => {
			return !!req.session.userId;
		}
	});
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({ req, res })
	});
	const app = Express();

	app.use(
		cors({
			origin: true,
			credentials: true
		})
	);

	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: "qid",
			secret: "aslkdfjoiq12312",
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
			}
		})
	);

	apolloServer.applyMiddleware({ app, cors: false });
	app.listen(4001, () => {
		console.log("Server started on http://localhost:4000/graphql");
	});
};

main();
