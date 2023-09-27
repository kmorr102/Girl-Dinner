const { Client } = require('pg');
require("dotenv").config();
const connectionString = process.env.DATABASE_URL || 'http://localhost:5432/girl-dinner';

const db = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = db;
