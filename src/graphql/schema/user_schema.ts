import { gql } from "apollo-server"

export default gql`
  type User {
    userId: ID
    name: String
    email: String
  }

  type LoggedInUser {
    name: String
    token: String
    email: String
  }

  extend type Mutation {
    addUser(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): LoggedInUser
  }
  extend type Query {
    Users(offset: Int, size: Int): [User]
    User(bvid: ID!): User
  }
`
