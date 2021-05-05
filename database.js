// Connection to the database
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();

/*client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});*/

function getAllInfo() {
  return new Promise((resolve, reject) => {
    client
      .query('SELECT table_schema,table_name FROM information_schema.tables;')
      .then((res) =>{
        resolve (res);
      })
      .catch((err) => {
        reject(err);
      });
      client.end();
  });
}

function query(text) {
  return new Promise((resolve, reject) => {
    client
      .query(text)
      .then((res) =>{
        resolve (res);
      })
      .catch((err) => {
        reject(err);
      });
      client.end();
  });
}

export default {
  getAllInfo,
  query,
};
