require("dotenv").config();
const express = require('express');
const path = require("path");
const db = require("./db.js");
const { selectProduct, selectOneProduct, features, styles, photos, skus } = require("./db.js")

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// var allData;
// const test = () => {

// }

app.get('/*', (req, res) => {
  if (req.url.includes('meta')) { //reviews/meta/?product_id=${id}
    let id = req.url.slice(26)
    res.send(id)
  } else if (req.url.includes('styles')) {  //products/${data.id}/styles
    let id = req.url.slice(10, req.url.indexOf('styles') - 1)
    // let array;
    styles(id)
      .then((allStyles) => res.send(allStyles.rows))
      .catch((err) => console.log(err))


      // .then((arr) => {
      //   arr.map((data, i) =>
      //     photos(data.style_id)
      //       .then((allPhotos) => console.log(allPhotos.rows))
      //       .catch((err) => console.log(err))
      //   )
      // })
  } else if (req.url.slice(10)) { //products/${info.id}
    let id = req.url.slice(10)
    let temp;
    selectOneProduct(id)
      .then((data) => { temp = data.rows })
      .catch((err) => console.log(err))
    features(id)
      .then((data) => { temp[0]['features'] = data.rows })
      .catch((err) => console.log(err))
      .then(() => res.send(temp))
  } else { //products
    selectProduct()
      .then((data) => res.send(data.rows))
      .catch((err) => console.log(err))
  }
})



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);