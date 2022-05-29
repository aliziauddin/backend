import { ValidationError } from "apollo-server"
import { AuthContext } from "../../util/authorization"
import User from "../../database-models/User/User"
import Todo from "../../database-models/todo/todo"

export const TodoResolver = {
  Mutation: {
    addTodo: async (
      root: any,
      {
        email,
        task
      }: {
        email: string
        task: string
      },
      { auth }: AuthContext
    ) => {
      auth.verify()
      const user = await User().forEmail(email)
      if (!user) throw new ValidationError("User not found")
      const todo = await Todo().add({ userId: user._id, task })
      todo.todoId = todo._id
      return todo
    },

    removeTodo: async (
      root: any,
      {
        todoId
      }: {
        todoId: string
      },
      { auth }: AuthContext
    ) => {
      auth.verify()
      return await Todo().remove({ todoId })
    },

    updateTodo: async (
      root: any,
      {
        todoId,
        task,
        isCompleted
      }: {
        todoId: string
        task?: string
        isCompleted?: boolean
      },
      { auth }: AuthContext
    ) => {
      auth.verify()
      const todo = await Todo().forId(todoId)
      if (!todo) throw new ValidationError("Todo not found")
      return await Todo().modify({ todoId, task, isCompleted })
    }
  },
  Query: {
    todos: async (
      root: any,
      {
        email,
        offset,
        size
      }: { email: string; offset?: number; size?: number },
      { auth }: AuthContext
    ) => {
      auth.verify()
      const user = await User().forEmail(email)
      if (!user) throw new ValidationError("User not found")
      return await Todo().all(user._id, offset, size)
    },
    todo: async (
      root: any,
      { todoId }: { todoId: string },
      { auth }: AuthContext
    ) => {
      auth.verify()
      return await Todo().forId(todoId)
    },
    todoStats: async (
      root: any,
      { email }: { email: string },
      { auth }: AuthContext
    ) => {
      auth.verify()
      const user = await User().forEmail(email)
      if (!user) throw new ValidationError("User not found")
      return await Todo().getStats(user._id)
    }
  }
}
