import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.decimal('price').notNullable();
        table.date('start_rent');
        table.date('finish_rent');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}

