import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import {createClient} from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = createClient({legacyMode:true});
  redisClient.connect().catch(console.error)

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient as any, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "zxcvbnm",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em.fork(), req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
  // await RequestContext.createAsync(orm.em, async () => {
  // const post = orm.em.create(Post, { title: 'my first post' } as RequiredEntityData<Post>)
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post,{})
  // console.log(posts)
  // })
};

main().catch((error) => {
  console.error(error);
});
