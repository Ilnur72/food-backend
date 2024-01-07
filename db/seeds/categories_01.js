/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    {
      id: 1,
      name: "Hot dishes",
      is_deleted: false,
    },
    {
      id: 2,
      name: "Cold dishes",
      is_deleted: false,
    },
    {
      id: 3,
      name: "Soup",
      is_deleted: false,
    },
    {
      id: 4,
      name: "Grill",
      is_deleted: false,
    },
    {
      id: 5,
      name: "Appetizer",
      is_deleted: false,
    },
    {
      id: 6,
      name: "Dessert",
      is_deleted: false,
    },
  ]);
};
