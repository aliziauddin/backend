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
    url: "mongodb://localhost:27019/todo?retryWrites=false",
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
