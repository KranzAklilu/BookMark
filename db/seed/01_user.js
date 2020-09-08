exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        { id: 1, email: "black@gmail.com", password: "black1234" },
        { id: 2, email: "white@gmail.com", password: "white0098" },
        { id: 3, email: "blue@gmail.com", password: "blue0120" },
      ]);
    });
};
