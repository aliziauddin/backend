import { Schema } from "mongoose"
import { UserModel } from "../user/user.model"

export const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

TodoSchema.post("create", (doc, next) => {
  if (doc) doc.todoId = doc._id
  next()
})
TodoSchema.post("find", (docs, next) => {
  if (docs.length)
    docs.forEach((doc: any) => {
      doc.todoId = doc._id
    })
  next()
})

TodoSchema.post("findById", (doc, next) => {
  if (doc) doc.todoId = doc._id
  next()
})
