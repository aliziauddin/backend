import chalk from "chalk"
import mongoose from "mongoose"
import configurations from "../util/config"
import databaseUsers from "./database_users"

const url = configurations.mongo.url
const options: any = configurations.mongo.options

const Mongo = () => {
  let database: mongoose.Connection = null

  const connect = async () => {
    try {
      mongoose.set("debug", false)

      await mongoose.connect(url, options)
      database = mongoose.connection
      console.log(chalk.greenBright(`Connected to ${url}`))

      await databaseUsers().create(database)
    } catch (error) {
      console.error("Error connecting to database", error)
    }
  }
  const disconnect = async () => {
    await mongoose.connection.close()
  }

  return { connect, disconnect, database }
}

export default Mongo
