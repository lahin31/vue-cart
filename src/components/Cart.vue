<template>
    <div>
        <h2>This is Cart</h2>
        <table class="table">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            <tr v-for="(c, i) in cart" :key="i">
                <td>{{ c.title }}</td>
                <td>${{ c.price }}</td>
                <td><button @click="removeFromCart(c)">-</button> {{ c.qty }} <button @click="addToCart(c)">+</button></td>
                <td><button @click="deleteItem(c, i)" class="removeBtn">Remove</button></td>
            </tr>
            <tr v-if="cart.length === 0">
                <h4>No Products Selected</h4>
            </tr>
        </table>
        <p>Total Items: {{ this.cart.length }}</p>
        <p>Total Quantity: {{ this.quantity }}</p>
        <p>Total Price: ${{ cartTotal.toFixed(2) }}</p>
    </div>
</template>

<script>
import { bus } from '../main';
export default {
    data() {
        return {
            cart: [],
            quantity: 0
        }
    },
    created() {
        this.getCart();
        this.quantity =  this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);
       bus.$emit('product-quant', this.quantity);  
    },
    computed: {
        cartTotal(){
            return this.cart.reduce((total, product) => {
                return (total + product.qty * product.price) ;
            }, 0);
        },
    },
    methods: {
        getCart() {

            if( localStorage && localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'));
            } else {
                this.cart = [];
            }
            console.log(this.cart);
        
        },

        removeFromCart(product) {

            const matchingProductIndex = this.cart.findIndex((item) => {
                return item.id == product.id;
            });

            if (this.cart[matchingProductIndex].qty <= 1) {
                this.cart.splice(matchingProductIndex, 1);
            } else {
                this.cart[matchingProductIndex].qty--;
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.quantity =  this.cart.reduce((total, product) => {
                return total - product.qty;
            }, 0);
            if( this.quantity < 0 ) {
                this.quantity *= -1;
            }
            bus.$emit('product-quant', this.quantity);

        },
        addToCart(product) {

            const matchingProductIndex = this.cart.findIndex((item) => {
                return item.id === product.id;
            });
            console.log(matchingProductIndex);

            if (matchingProductIndex > -1) {
                this.cart[matchingProductIndex].qty++;
            } else {
                product.qty = 1;
                this.cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));

            this.quantity =  this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);

          bus.$emit('product-quant', this.quantity);
        },

        deleteItem(product, index) {

            this.cart.splice(index, 1);
            const matchingProductIndex = this.cart.findIndex((item) => {
                return item.id == product.id;
            });
            console.log(matchingProductIndex);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.quantity =  this.cart.reduce((total, product) => {
                return total - product.qty;
            }, 0);
            if( this.quantity < 0 ) {
                this.quantity *= -1;
            }
            bus.$emit('product-quant', this.quantity);

        }
  },
}
</script>



<style>
table.table {
    width: 100%;
    background-color: #fff;
}

.table th, .table td {
    text-align: left;
    padding: 0.25em;
}

.table tr {
    border-bottom: 1px solid #DDD;
}

.removeBtn {
    background-color: red; 
    border: none;
    color: white;
    padding: 10px 26px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
}

@media screen and (max-width: 800px) {
  tr { 
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.5em 0;
    border: 1px solid rgba(3,3,3,0.2);
  }
  td, th {
    flex: 1 1 150px;
    border: 0.5px solid rgba(3,3,3,0.2);
  }
}
</style>
