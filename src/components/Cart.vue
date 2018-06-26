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
import CartMixins from '../mixins/CartMixins.js';

export default {
    data() {
        return {
            cart: [],
            quantity: 0
        }
    },
    mixins: [CartMixins]
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
