import chalk from "chalk"

const databaseUsers = () => {
  const create = async (database: any) => {
    const user = {
      name: "devops",
      password: "todo2022",
      roles: [{ db: "todo", role: "dbOwner" }],
      fail_implications: "Data backups will not be successful."
    }

    const existingUser = await database.db.command({ usersInfo: user.name })
    if (existingUser.users.length === 0) {
      const userCreate = await database.db.command({
        createUser: user.name,
        pwd: user.password,
        roles: user.roles
      })
      console.log(
        userCreate.ok === 1
          ? chalk.greenBright(`info: `) + `Created ${user.name} user`
          : chalk.red.bold(`error: `) +
              `Failed to create ${user.name} user! ${user.fail_implications}`
      )
    } else {
      console.log(
        chalk.greenBright(`info: `) + `Found existing ${user.name} user`
      )
    }
  }
  return { create }
}

export default databaseUsers
