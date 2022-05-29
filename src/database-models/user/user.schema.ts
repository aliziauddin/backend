import { Schema } from "mongoose"

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
UserSchema.post("find", (docs, next) => {
  docs.forEach((doc: any) => {
    doc.bvid = doc._id
  })
  next()
})

UserSchema.post("findById", (doc, next) => {
  doc.bvid = doc._id
  next()
})
