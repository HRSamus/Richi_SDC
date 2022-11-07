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
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting ', err))

const selectProduct = () => {
  return db.query(`SELECT * FROM products FETCH FIRST 5 ROWS ONLY`)
}

const selectOneProduct = (id) => {
  return db.query(`SELECT * FROM products WHERE products.id = ${id}`)

  // .then((data) => temp = data.rows)
  // .catch((err) => console.log(err))
  // .then(() => db.query(`SELECT * FROM features WHERE features.product_id = ${id}`))
  // .then((data) => temp[0]['features'] = data.rows)
  // .catch((err) => console.log(err))
}
const features = (id) => {
  return db.query(`SELECT feature, value FROM features WHERE features.product_id = ${id}`)
}


module.exports = db;
module.exports = { selectProduct, selectOneProduct, features }

// Notes
//FETCH FIRST 10 ROWS ONLY
//.then(() => db.end());