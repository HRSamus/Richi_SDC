require("dotenv").config();
const express = require('express');
const path = require("path");
const db = require("./db.js");
const { selectProduct } = require("./db.js")

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get('/products', (req, res) => {
//   selectProduct()
//     .then((data) => res.send(data.rows))
//     .catch((err) => console.log(err))
// })

app.get('/*', (req, res) => {
  if (req.url.includes('meta')) { //reviews/meta/?product_id=${id}
    let id = req.url.slice(26)
    res.send(id)
  } else if (req.url.includes('styles')) {  //products/${data.id}/styles
    let id = req.url.slice(10, req.url.indexOf('styles') - 1)
    res.send(id)
  } else if (req.url.slice(10)) { //products/${info.id}
    let id = req.url.slice(10)
    res.send(id)
  } else { //products
    selectProduct()
      .then((data) => res.send(data.rows))
      .catch((err) => console.log(err))
  }
})



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);