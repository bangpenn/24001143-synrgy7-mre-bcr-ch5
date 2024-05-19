import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del(); 

    return knex("users").insert([
        { id: 1, name: "Rizal", email: "rizal@example.com", password: "rizal1234" },
        { id: 2, name: "Efendi", email: "efendi@example.com", password: "efendi1234" },
        { id: 3, name: "Aliando", email: "aliando@example.com", password: "aliando1234" }
    ]);
}
