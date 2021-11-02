require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const app = express();

// accès à du json
app.use(express.json());
// accès à req.body
app.use(
  express.urlencoded({
    extended: false,
  })
);
// accès à req.files
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//TODO penser à mettre cors(corsOptions) ligne 10 quand le front sera déployé
// const corsOptions = {
//   origin: "https://angry-mayer-669f9a.netlify.app/",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

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
