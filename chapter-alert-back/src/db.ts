import { Pool } from "pg";

const pool = new Pool({
  user: "nicolas",
  host: "db",
  database: "chapterAlert",
  password: "nicolas",
  port: 5432,
});

export default pool;
