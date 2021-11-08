const { Router } = require("express");
const router = Router();
const custom = require("./customCSS.js");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const options = {
  customCss: custom,
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  },
};

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument, options));

module.exports = router;
