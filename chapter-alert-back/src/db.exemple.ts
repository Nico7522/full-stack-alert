import { Pool } from "pg";

const pool = new Pool({
  user: "",
  host: "db",
  database: "chapterAlert",
  password: "",
  port: 5432,
});

export default pool;
