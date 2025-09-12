import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "John Doe", birthday: "1985-01-01", salary: 80000 },
    { name: "Jane Doe", birthday: "1985-01-02", salary: 78000 },
    {
      name: "John Jacob Jingleheimer Schmidt",
      birthday: "1990-05-10",
      salary: 60001,
    },
    {
      name: "Jon Jacob Jingleheimer Schmidt",
      birthday: "1990-05-10",
      salary: 60002,
    },
    { name: "Mary Sullivan", birthday: "1965-02-11", salary: 45000 },
    { name: "Max Verstappen", birthday: "1997-09-30", salary: 100000 },
    { name: "Adam", birthday: "0001-01-01", salary: 1 },
    { name: "Didn't give a name", birthday: "1970-06-13", salary: 0 },
    { name: "Macbeth", birthday: "1623-05-01", salary: 120000 },
    { name: "Codename Pelican", birthday: "2025-09-09", salary: 125000 },
  ];
  for (const employee of employees) {
    await createEmployee(employee);
  }
}
