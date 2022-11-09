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
}
const features = (id) => {
  return db.query(`SELECT feature, value FROM features WHERE features.product_id = ${id}`)
}
const styles = (id) => {
  return db.query(`SELECT s.style_id, product_id, style_name AS name, sale_price, original_price, default_style AS "default?",
  pl.photos, sl.skus FROM styles s,
    LATERAL (
        SELECT ARRAY (
          SELECT json_build_object('url', url, 'thumbnail_url', thumbnail_url) FROM photos p
          WHERE p.style_id = s.style_id
        ) AS photos
    ) pl,
    LATERAL (
        SELECT ARRAY (
          SELECT json_build_object('size', size, 'quantity', quantity) FROM skus sk
          WHERE sk.style_id = s.style_id
      ) AS skus
    ) sl WHERE s.product_id = ${id}
    `)
}

//WHERE styles.product_id = ${id}
//INNER JOIN photos ON styles.style_id = photos.style_id
//WHERE styles.product_id = ${id}
//INNER JOIN skus ON styles.style_id = skus.style_id

//WHERE s.product_id = ${id}
module.exports = db;
module.exports = { selectProduct, selectOneProduct, features, styles }

// Notes
//FETCH FIRST 10 ROWS ONLY
//.then(() => db.end());