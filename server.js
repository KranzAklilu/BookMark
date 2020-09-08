const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const router = require("./routes/router");
const session = require("express-session");
const flash = require("express-flash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(flash());
app.use(
  session({
    secret: "asd",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App Is listening At PORT ${PORT}`));
