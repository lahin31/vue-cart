<template>
     <section class="products">
          <div class="product-card" v-for="(item, i) in items" :key="i">
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
</template>

<script>
import { bus } from '../main';
import Data from '../assets/data.json';

export default {
  name: "home",
  data() {
      return {
          items: [],
          quant: 0,
          cart: [],
          quantity: 0
      }
  },
  created() {
      this.items = Data;
      if( localStorage && localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
            } else {
                this.cart = [];
            }
        this.quantity =  this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);
       bus.$emit('product-quant', this.quantity);
  },
  methods: {
      getPic(val) {
          return require('../assets/images/'+val);
      },
      getCart() {
          
      },
      addToCart(product) {
          
          const matchProductIndex = this.cart.findIndex((item) => {
              return item.id === product.id;
          });

          if( matchProductIndex > -1) {
              this.cart[matchProductIndex].qty++;
          } else {
              product.qty = 1;
              this.cart.push(product);
          }

          localStorage.setItem( 'cart', JSON.stringify(this.cart));

          this.quantity =  this.cart.reduce((total, product) => {
            return total + product.qty;
          }, 0);

          bus.$emit('product-quant', this.quantity);
          product.bool = true;
          setTimeout(() => product.bool = false, 1000);
      }
  },
  computed: {
        totalItems(){
            return this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);
        }
  }
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
