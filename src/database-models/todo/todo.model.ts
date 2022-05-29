import { model } from "mongoose"
import { TodoDocument } from "./todo.types"
import { TodoSchema } from "./todo.schema"

export const TodoModel = model<TodoDocument>("Todo", TodoSchema)
