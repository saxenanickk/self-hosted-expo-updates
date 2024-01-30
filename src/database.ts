import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

export async function getApplications() {
  const [rows] = await pool.query("SELECT * FROM applications");
  return rows;
}

export async function getApplication(id: string) {
  const [rows] = await pool.query("SELECT * FROM applications WHERE id = ?", [
    id,
  ]);
  return rows;
}

export async function getApplicationByName(name: string) {
  const [rows] = await pool.query("SELECT * FROM applications WHERE name = ?", [
    name,
  ]);
  return rows;
}

export async function createApplication(
  name: string,
  runtime_version: string,
  update_id: string
) {
  const [result] = await pool.query(
    "INSERT INTO applications (name, runtime_version, update_id) VALUES (?, ?)",
    [name, runtime_version, update_id]
  );
  return result;
}
