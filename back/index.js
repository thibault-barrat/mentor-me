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
const corsOptions = {
  origin: [
    "https://angry-mayer-669f9a.netlify.app/",
    "http://localhost:8080",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  exposedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Content-Range",
    "X-Content-Range",
  ],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// config session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      secure: false,
      sameSite: "none",
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/v1", require("./app/router"));

app.use("/v1", require("./doc/swagger/swagger"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
