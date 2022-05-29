import { gql } from "apollo-server"

export default gql`
  type Todo {
    todoId: ID
    task: String
    isCompleted: Boolean
  }

  type PaginatedTodos {
    todos: [Todo]
    totalCount: Int
  }
  type Stats {
    complete: Int
    incomplete: Int
  }
  extend type Mutation {
    addTodo(email: String!, task: String!): Todo
    removeTodo(todoId: ID!): Boolean
    updateTodo(todoId: ID!, task: String, isCompleted: Boolean): Boolean
  }
  extend type Query {
    todos(email: String, offset: Int, size: Int): PaginatedTodos
    todo(todoId: ID!): Todo
    todoStats(email: String): Stats
  }
`
