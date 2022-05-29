import { Document } from "mongoose"
import { TodoParams } from "./todo"

export interface TodoDocument extends TodoParams, Document {}
