/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("foods", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table
      .integer("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("SET NULL");
    table.float("price").notNullable();
    table.string("images").notNullable();
    table.integer("bowls").notNullable();
    table.integer("total_sold");
    table.boolean("is_deleted").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("foods");
};
