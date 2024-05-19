import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("orders").del(); 

    return knex("orders").insert([
        { user_id: 1, car_id: 1, start_rent: "2024-06-01", finish_rent: "2024-06-05", price: 500000, status: "Pending" },
        { user_id: 2, car_id: 2, start_rent: "2024-06-02", finish_rent: "2024-06-06", price: 450000, status: "Confirmed" },
        { user_id: 3, car_id: 3, start_rent: "2024-06-03", finish_rent: "2024-06-07", price: 700000, status: "Cancelled" }
    ]);
}
