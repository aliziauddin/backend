import { Document } from "mongoose"
import { UserParams } from "./user"

export interface UserDocument extends UserParams, Document {}
