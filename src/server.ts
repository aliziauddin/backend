import Mongo from "./database/connection"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import http from "http"
import chalk from "chalk"
import configurations from "./util/config"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import typeDefs from "./graphql/schema"
import resolvers from "./graphql/resolvers"
import Authorization from "./util/authorization"
import bodyParser from "body-parser"

/** Load the environment specific configuration */
const config = configurations.apollo

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  const app = express()
  const httpServer = http.createServer(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: config.introspection,
    debug: config.debug,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      const token = (req?.headers.authorization || "").replace("Bearer ", "")
      const auth = Authorization(token)
      return { auth }
    }
  })
  await server.start()

  server.applyMiddleware({
    app,
    path: "/",
    bodyParserConfig: { limit: "50mb" },
    cors: { origin: "*" }
  })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port:  process.env.PORT || config.port   }, resolve)
  )
  console.log(
    `\n\n${chalk.red.bold(logo)}
    \n🆕 backend ${chalk.yellow.bold(configurations.name)} server ready at:\n `,
    chalk.blue.bold.underline(
      `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
        server.graphqlPath
      }`
    ),
    "\n"
  )
  await Mongo().connect()
}

void startApolloServer(typeDefs, resolvers)

const logo: string = "BACKEND"
