const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const initialize = function (passport, getUserByEmail, getUserById) {
  const authenticateUser = async function (email, password, done) {
    const user = await getUserByEmail(email).then((user) => user[0]);
    if (user == null) {
      return done(null, false, { message: "Email Not Found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Not Correct" });
      }
    } catch (err) {
      return done(err);
    }
  };
  const jwtConfig = async function (jwtPayload, done) {
    const user = await getUserByEmail(email).then((user) => user[0]);
    console.log(jwtPayload.id);
    return getUserById(jwtPayload.id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "your_jwt_secret",
      },
      jwtConfig
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) =>
    done(null, await getUserById(id).then((id) => id))
  );
};

module.exports = initialize;
