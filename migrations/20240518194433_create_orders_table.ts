import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('car_id').unsigned().notNullable().references('id').inTable('cars').onDelete('CASCADE');
        table.date('start_rent').notNullable();
        table.date('finish_rent').notNullable();  // Perbaiki nama kolom di sini
        table.decimal('price').notNullable();
        table.string('status').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('orders');
}
