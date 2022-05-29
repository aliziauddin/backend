import lodash from "lodash"
import config from "../util/config"
import { ServiceContext } from "../util/service_context"
import { TodoResolver } from "./resolvers/todo_resolver"
import { UserResolver } from "./resolvers/user_resolver"

const SystemResolvers = {
  Query: {
    ping: (root: any, args: any, context: ServiceContext) => {
      return {
        name: process.env.npm_package_name,
        location: config.apollo.hostname,
        version: process.env.npm_package_version,
        uptime: process.uptime()
      }
    }
  }
}

const resolvers = lodash.merge(SystemResolvers, UserResolver, TodoResolver)

export default resolvers
