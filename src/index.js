const express = require("express");
const config = require("./shared/config");
const handleError = require("./shared/errors/handle");
const categoryRoute = require("./modules/categories/_api");
const foodsRoute = require("./modules/foods/_api");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", categoryRoute);
app.use("/api", foodsRoute);
app.use(express.static(path.join(__dirname, '../static')))

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Swagger documentation for Express API",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(handleError); 

app.listen(config.port, () => {
  console.log("> Server is up and running on port : " + config.port);
});
