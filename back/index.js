require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

const router = require("./app/router");
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
