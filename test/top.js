function importTest(name, path, server) {
  describe(name, function() {
    require(path)(server);
  });
}

const { Porte, app, express, config } = require("./common");

let server = express();

before(done => {
  app({ expressApp: server });
  server.listen(config.port, err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`
      ############################################
        Server listening on port: ${config.port}
      ############################################
  `);
    done();
  });
});

describe("top", async () => {
  importTest("POST /api/porte/add_porte", "./api/porte.post.test", server);
  importTest("GET /api/porte/get_porte", "./api/porte.get.test", server);
  importTest("POST /api/porte/update", "./api/porte.update.test", server);
});
