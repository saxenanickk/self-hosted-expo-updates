import { allCommand, getCommand, runCommand } from "./dbConnection";

export async function getApplications() {
  const sql = `SELECT * FROM applications;`;
  return allCommand(sql);
}

export async function getApplication(id: number) {
  const sql = `SELECT * FROM applications WHERE id = ?`;
  return getCommand(sql, [id]);
}

export async function getApplicationByName(name: string) {
  const sql = `SELECT * FROM applications WHERE name = ?`;
  return getCommand(sql, [name]);
}

export async function createApplication(
  name: string,
  runtime_version: string,
  update_id: string
) {
  return runCommand(
    `
  INSERT INTO applications (name, runtime_version, update_id) VALUES (?, ?, ?)`,
    [name, runtime_version, update_id]
  );
}
