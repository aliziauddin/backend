import { ValidationError } from "apollo-server"
import { AuthContext } from "../../util/authorization"
import User from "../../database-models/user/user"

export const UserResolver = {
  Mutation: {
    addUser: async (
      root: any,
      {
        name,
        email,
        password
      }: {
        name: string
        email: string
        password: string
      }
    ) => {
      console.log("here")
      if (!(name && email && password))
        throw new ValidationError("All input fields are required!")

      return await User().add({ name, email, password })
    },

    login: async (
      root: any,
      {
        email,
        password
      }: {
        email: string
        password: string
      }
    ) => {
      if (!(email && password))
        throw new ValidationError("All input fields are required!")

      return await User().login({ email, password })
    }
  },
  Query: {
    Users: async (
      root: any,
      { offset, size }: { offset?: number; size?: number },
      { auth }: AuthContext
    ) => {
      auth.verify()
      return await User().all(offset, size)
    },
    User: async (
      root: any,
      { bvid }: { bvid: string },
      { auth }: AuthContext
    ) => {
      auth.verify()
      return await User().forId(bvid)
    }
  }
}
