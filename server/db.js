const { Client } = require("pg")
require("dotenv").config();

const db = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
})

db.connect()
  .then((res) => console.log('Database connected'))
  .catch((err) => console.log('Error connecting ', err))




const selectProduct = () => {
  return db.query(`SELECT * FROM products FETCH FIRST 5 ROWS ONLY`)
}
// selectProduct()

//FETCH FIRST 10 ROWS ONLY
//.then(() => db.end());

module.exports = db;
module.exports = { selectProduct }