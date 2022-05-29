const configuration = {
  sysAdminToken: "fK5b29Q3PBV63nQX",
  jwtSecretKey: "Fy^JbDVYf@pgjkGf4j^v@_",

  apollo: {
    ssl: false,
    port: 4500,
    hostname: "localhost",
    introspection: true,
    tracing: true,
    debug: true,
    playground: true
  },
  mongo: {
    url: "mongodb+srv://alizia:qwerty1234@cluster0.oa53x.mongodb.net/?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    debug: false
  }
}

export default {
  ...configuration,
  name: "localhost",
  path: `./environments/localhost`,
  hackathonMode: false
}
