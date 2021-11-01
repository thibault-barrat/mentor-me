require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO penser à mettre cors(corsOptions) ligne 10 quand le front sera déployé
// const corsOptions = {
//   origin: 'http://adresseFront.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());

app.use(cookieParser());
// config session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/v1", require("./app/router"));

app.use("/v1", require("./doc/swagger/swagger"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
