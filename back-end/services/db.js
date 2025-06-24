import pgPromise from 'pg-promise';
const pgp = pgPromise();

const connectionString = process.env.DATABASE_URL;

const db = pgp({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // essencial para Heroku e conexões externas
  }
});

export default db;
