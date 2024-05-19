import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("cars").del(); 

    return knex("cars").insert([
        { id: 1, name: "Toyota Camry", user_id: 1, category: "Sedan", price: 500000, start_rent: "2024-06-01", finish_rent: "2024-06-05" },
        { id: 2, name: "Honda Civic", user_id: 2, category: "Sedan", price: 450000, start_rent: "2024-06-02", finish_rent: "2024-06-06" },
        { id: 3, name: "Ford Mustang", user_id: 3, category: "Sports Car", price: 700000, start_rent: "2024-06-03", finish_rent: "2024-06-07" }
    ]);
}
