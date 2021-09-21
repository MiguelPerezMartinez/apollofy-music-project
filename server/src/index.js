// imports
const app = require("./server");
const { config } = require("./config");
// const db = require("./models");
const {connect} = require("./db");

// connection and connection test
connect().then(() => console.log("connection success"));

// port conenction test
app.listen(config.app.PORT, () =>
  console.log("server running on port " + config.app.PORT),
);
