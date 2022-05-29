import _ from "lodash"
import { AuthenticationError, ForbiddenError } from "apollo-server"
import configurations from "../util/config"
import Jwt from "jsonwebtoken"

const sysAdminToken: string = configurations.sysAdminToken
const secret: string = configurations.jwtSecretKey

export interface AuthContext {
  auth: AuthorizationType
}
export type AuthorizationType = {
  mustBeSysAdmin: () => void
  verify: () => void
}

/** Handles authorization through tokens
 */

const Authorization = (token: string = "") => {
  const mustBeSysAdmin = () => {
    if (!isSysAdmin()) throw new ForbiddenError("User not authorized.")
  }

  const verify = () => {
    try {
      return Jwt.verify(token, secret)
    } catch (error) {
      throw new AuthenticationError("User not authorized")
    }
  }

  const isSysAdmin = (): boolean => {
    return token == sysAdminToken
  }

  return {
    mustBeSysAdmin,
    verify
  }
}
export default Authorization
