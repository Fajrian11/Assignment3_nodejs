/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
eexports.up = function(knex) {
    return knex.schema.createTable('photos', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('photos');
  };
  