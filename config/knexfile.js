module.exports = {
  development: {
    client: "postgres",
    connection: "postgresql://postgres:NodeJS@localhost:5432/test2",
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seed",
    },
  },
  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seed",
    },
  },
};
