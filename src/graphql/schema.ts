import { gql } from "apollo-server"
import Todo from "./schema/todo_schema"
import User from "./schema/user_schema"
const Main = gql`
  type Ping {
    name: String
    location: String
    version: String
    uptime: Float
  }

  type Query {
    ping: Ping
  }

  type Mutation {
    dummy: String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default [Main, User, Todo]
