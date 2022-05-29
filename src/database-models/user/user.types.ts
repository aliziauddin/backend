import { Document } from "mongoose"
import { UserParams } from "./User"

export interface UserDocument extends UserParams, Document {}
