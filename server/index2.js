require("dotenv").config();
const express = require('express');
const path = require("path");
const db = require("./db.js");
const { selectProduct, selectOneProduct, features, styles } = require("./db.js")

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('/*', (req, res) => {
  if (!req.url.includes('favicon')) {
    if (!req.url.includes('meta')) {
      let productID = req.url.slice(10)
      // console.log('CHECKING URL ', req.url)
      if (req.url.includes('styles')) {  //products/${data.id}/styles
        let id = req.url.slice(10, req.url.indexOf('styles') - 1)
        styles(id)
          .then((allStyles) => res.send(allStyles.rows))
          .catch((err) => console.log(err))
      } else if (productID) { //products/${info.id}
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
    }
  }
})



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

//products/**/styles