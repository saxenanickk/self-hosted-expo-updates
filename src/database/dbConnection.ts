import * as sqlite3 from "sqlite3";

sqlite3.verbose();

const filepath = "./app-updates.db";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
    createApplicationsTable(db);
    createUpdatesTable(db);
  });
  console.log("✅ Connection with SQLite has been established");
  return db;
}

function runCommand(sql: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    dbConnection.run(sql, params, function (err) {
      if (err) {
        console.log("Error running sql " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

function getCommand(sql: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    dbConnection.get(sql, params, (err, result) => {
      if (err) {
        console.log("Error running sql: " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function allCommand(sql: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    dbConnection.all(sql, params, (err, rows) => {
      if (err) {
        console.log("Error running sql: " + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function createApplicationsTable(db: sqlite3.Database) {
  const sql = `
    CREATE TABLE if not exists applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        runtime_version VARCHAR(255) NOT NULL,
        update_id VARCHAR(255) NOT NULL
    );
  `;

  return runCommand(sql);
}

function createUpdatesTable(db: sqlite3.Database) {
  const sql = `
    CREATE TABLE if not exists updates (
        id INT NOT NULL,
        application_id INT NOT NULL,
        version VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (application_id) REFERENCES applications(id)
    );
  `;
  return runCommand(sql);
}

const dbConnection = createDbConnection();

export { dbConnection, runCommand, getCommand, allCommand };
