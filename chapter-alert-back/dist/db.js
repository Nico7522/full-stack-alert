"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "nicolas",
    host: "db",
    database: "chapterAlert",
    password: "nicolas",
    port: 5432,
});
exports.default = pool;
