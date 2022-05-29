import { Mocks } from "../../util/spec_helper"
import Mongo from "../../database/connection"
import User from "./User"
import { UserModel } from "./User.model"

describe(User.name, () => {
  beforeAll(async () => {
    await Mongo().connect()
    await Fixtures.clear()
    await Fixtures.build()
  })

  afterAll(async () => {
    await Mongo().disconnect()
  })

  describe("Create", () => {
    it("add User", async () => {
      const res = await User().add({
        name: "User1",
        email: "User1@gmail.com",
        password: "password"
      })
      expect(res).toBeDefined()
    })
    it("login", async () => {
      const res = await User().login({
        email: "User1@gmail.com",
        password: "password"
      })
      expect(res).toBeDefined()
    })
    it("forId", async () => {
      const User = await User().forEmail("User2@gmail.com")
      const res = await User().forId(User.bvid)
      expect(res.name).toBe("User2")
      expect(res.email).toBe("User2@gmail.com")
    })
    it("all Users", async () => {
      const res = await User().all()
      const User = res.find((User) => User.name === "User1")
      expect(User.email).toBe("User1@gmail.com")
    })
  })
})

const Fixtures: any = {
  clear: async () => {
    await Mocks.clearCollections([UserModel], Mongo().database)
  },
  build: async () => {
    Fixtures.User2 = await User().add({
      name: "User2",
      email: "User2@gmail.com",
      password: "password"
    })
  }
}
