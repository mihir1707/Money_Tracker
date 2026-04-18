import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance_app",
  password: "mihir@2006",
  port: 5432,
});

export {
  pool,
}