import { TodoModel } from "./todo.model"
import { TodoDocument } from "./todo.types"
import { ValidationError } from "apollo-server"

export interface TodoParams {
  todoId: string
  userId: string
  task: string
  isCompleted: string
}

interface TodoUpdateParams {
  task?: string
  isCompleted?: boolean
}

interface PaginatedTodos {
  todos: TodoDocument[]
  totalCount: number
}

const Todo = () => {
  const add = async ({
    userId,
    task
  }: {
    userId: string
    task: string
  }): Promise<TodoDocument> => {
    try {
      return await TodoModel.create({
        user: userId,
        task
      })
    } catch (err) {
      throw new ValidationError(err)
    }
  }

  const remove = async ({ todoId }: { todoId: string }): Promise<boolean> => {
    try {
      return !!(await TodoModel.findOneAndDelete({ _id: todoId }))
    } catch (err) {
      throw new ValidationError(err)
    }
  }

  const forId = async (todoId: string): Promise<TodoDocument> =>
    await TodoModel.findById(todoId)

  const all = async (
    userId: string,
    offset?: number,
    size?: number
  ): Promise<PaginatedTodos> => {
    const [todos, totalCount] = await Promise.all([
      TodoModel.find({ user: userId })
        .skip(offset)
        .limit(size)
        .sort({ createdAt: "asc" }),
      TodoModel.count({ user: userId })
    ])
    return { todos, totalCount }
  }
  const modify = async ({
    todoId,
    task,
    isCompleted
  }: {
    todoId: string
    isCompleted?: boolean
    task?: string
  }) => {
    const query: any = { _id: todoId }
    const doc: TodoUpdateParams = {}
    if (task) doc.task = task
    if (isCompleted) doc.isCompleted = isCompleted
    await TodoModel.findOneAndUpdate(query, doc)
    return true
  }
  const getStats = async (userId: string): Promise<any> => {
    const stats = await TodoModel.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: "$isCompleted",
          count: { $sum: 1 }
        }
      }
    ])

    const statsRes: { complete: number; incomplete: number } = {
      complete: 0,
      incomplete: 0
    }
    if (stats[0]?._id) {
      statsRes.complete = stats[0]?.count || 0
      statsRes.incomplete = stats[1]?.count || 0
    } else {
      statsRes.complete = stats[1]?.count || 0
      statsRes.incomplete = stats[0]?.count || 0
    }

    return statsRes
  }
  return { add, all, forId, remove, modify, getStats }
}

export default Todo
