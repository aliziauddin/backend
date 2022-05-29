import { UserModel } from "./User.model"
import { UserDocument } from "./User.types"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ValidationError } from "apollo-server"
import configurations from "../../util/config"

const secret = configurations.jwtSecretKey
export interface UserParams {
  bvid: string
  name: string
  email: string
  password?: string
}

const User = () => {
  const add = async ({
    name,
    email,
    password
  }: {
    name: string
    email: string
    password: string
  }): Promise<string> => {
    try {
      console.log({ name, email, password })
      const existingUser = await UserModel.findOne({ email })
      console.log(existingUser)
      if (existingUser) throw new ValidationError("User is already Registered")
      const encryptedPassword = await bcrypt.hash(password, 10)
      const User = await UserModel.create({
        name,
        email: email.toLocaleLowerCase(),
        password: encryptedPassword
      })

      const token = jwt.sign({ User_id: User._id, email: User.email }, secret)
      return token
    } catch (err) {
      throw new ValidationError(err)
    }
  }

  const login = async ({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ name: string; token: string; email: string }> => {
    try {
      const user = await UserModel.findOne({ email })
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            User_id: user._id,
            email: user.email
          },
          secret
        )

        return { name: user.name, token, email: user.email }
      }
      throw new ValidationError("Invalid credentials")
    } catch (err) {
      throw new ValidationError(err)
    }
  }

  const forId = async (bvid: string): Promise<UserDocument> => {
    const User = await UserModel.findById(bvid)
    User.bvid = User._id
    return User
  }

  const forEmail = async (email: string): Promise<UserDocument> => {
    const User = await UserModel.findOne({ email })
    User.bvid = User._id
    return User
  }

  const all = async (offset?: number, size?: number): Promise<UserDocument[]> =>
    await UserModel.find().skip(offset).limit(size)

  return { add, login, all, forId, forEmail }
}

export default User
