import create from 'zustand';
import axios from 'axios';

import { URL, TOKEN } from '/MyConfig.js';

const GetRequest = (req) => {
  return axios.get(req, {
    baseURL: URL,
    headers: { 'Authorization': TOKEN }
  });
}

const WeightedAvg = (obj) => {
  let count = 0;
  let holder = 0;
  for (let key in obj) {
    holder += key * obj[key];
    count += obj[key] * 1;
  }
  //To see current Stars
  // console.log('I AM NUM', (Math.round((holder/count) * 4) / 4))
  return { avg: (Math.round((holder / count) * 4) / 4), overall: count };
}

const ProductStore2 = create((set, get) => ({
  Products: null,
  curProduct: null,
  curProductStyles: null,
  curStyle: null,
  curStars: null,
  getProducts: () => {
    GetRequest('/products') //WORKING
      .then(({ data }) => {
        set(() => ({ Products: data }));
        get().setCurProduct(data[0].name);
        console.log(data)
      })
  },
  setCurProduct: (title) => {
    get().Products.map((info) => {
      if (info.name === title) {
        get().setStars(info.id);
        GetRequest(`/products/${info.id}`) //get features for products WORKING
          .then(({ data }) => {
            set(() => ({ curProduct: data }))
            get().setCurStyles(data);
          })
      }
    })
  },
  setCurStyles: (data) => {
    GetRequest(`/products/${data.id}/styles`) // get styles for product
      .then(({ data }) => {
        set(() => ({ curProductStyles: data.results }));
        console.log("🚀 ~ file: Zus_Provider.jsx ~ line 54 ~ .then ~ data", data)
        data.results.map((obj) => {
          if (obj["default?"] === true) {
            set(() => ({ curStyle: obj }))
          }
        })
      })
  },
  setStyle: (title) => {
    get().curProductStyles.map((info) => {
      if (info.name === title) {
        set(() => ({ curStyle: info }));
      }
    })
  },
  setCurrProdFromObject: (product) => {
    set(() => ({ curProduct: product.data }));
    set(() => ({ curStyle: product.styles.data.results[0] }));
    set(() => ({ curProductStyles: product.styles.data.results }));
  },
  setStars: (id) => {
    //GetRequest(`/reviews/meta/?product_id=${id}`) //get reviews for product
    // .then(({ data }) => {
    let temp = { "1": "7", "2": "10", "3": "27", "4": "46", "5": "54" }
    let holder = WeightedAvg(temp);
    set(() => ({ curStars: holder }))
    // })
  }
}))

export default ProductStore2;
