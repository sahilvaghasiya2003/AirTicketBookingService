const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routers/index");
const db = require("./models/index");
// const PORT = 3002;
const { PORT } = require("./config/server-config");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, (req, res) => {
    console.log(`server running on port ${PORT}`);
  });

  // if (process.env.DB_SYNC) {
  //   db.sequelize.sync({ alter: true });
  // }
};
setupAndStartServer();
