import { model } from "mongoose"
import { UserDocument } from "./User.types"
import { UserSchema } from "./User.schema"

export const UserModel = model<UserDocument>("User", UserSchema)
