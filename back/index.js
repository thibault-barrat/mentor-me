require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
//TODO penser à mettre cors(corsOptions) ligne 10
// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const router = require("./app/router");
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
