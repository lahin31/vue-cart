<template>
    <div>
        <input type="text" placeholder="Search" v-model="searchQuery">
        <section class="products">
            <div class="product-card" v-for="(item, i) in filterItems(items)" :key="i">
                <div class="product-image">
                    <img :src="getPic(item.imgUrl)" :alt="item.title">
                </div>
                <div class="product-info">
                    <h3>{{item.title}}</h3>
                    <h6>${{item.price}}</h6>
                    <button class="addToCartButton" @click="addToCart(item)" v-if="!item.bool">Add to cart</button>
                    <button disabled="disabled" class="addedButton" v-if="item.bool">Added</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { bus } from '../main';
import CartMixins from '../mixins/CartMixins.js';

export default {
  name: "home",
  data() {
      return {
          items: [],
          quant: 0,
          cart: [],
          quantity: 0,
          searchQuery: ''
      }
  },
  methods: {
      filterItems(items) {
          return this.items.filter(val => {
              let regex = new RegExp('(' + this.searchQuery + ')', 'i');
              return val.title.match(regex);
          })
      },
      getPic(val) {
          return require('../assets/images/'+val);
      },
  },
  mixins: [CartMixins]
}
</script>

<style>
.products {
  display: flex;
  flex-wrap: wrap;
}

.product-card {
  display: flex;
  flex-direction: column;
  padding: 2%;
  width: 29.322%;
  background-color: #fff;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
}

.product-image img {
  width: 100%;
}

.product-info {
    margin-top: auto;
    padding-top: 20px;
    text-align: center;
}

a {
    text-decoration: none;
}

.addToCartButton {
    background-color: #4CAF50; 
    border: none;
    color: white;
    padding: 12px 29px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
}

.addedButton {
    border: none;
    color: white;
    padding: 12px 29px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
}

input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
}

@media(max-width: 920px) {

    .product-card {
        flex: 1 21%;
    }

}

@media(max-width: 750px) {

    .product-card {
        flex: 1 30%;
    }

}

@media(max-width: 500px) {

    .product-card {
        flex: 1 50%;
    }

}
</style>
