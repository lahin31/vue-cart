<template>
    <nav class="product-navbar">
        <h1>
            <router-link to="/">Vue Shopping Cart</router-link>
        </h1>
        <div class="cart-items">
            <p>
                <router-link to="/cart"><i class="fas fa-shopping-cart"></i> Cart({{this.quantity}})</router-link>
            </p>
        </div> 
    </nav>
</template>

<script>
import { bus } from '../main';
export default {
    name: "navbar",
    data() {
        return {
            quantity: 0,
            cart: [],
            productQuant: ''
        }
    },
    computed: {
        totalItems(){
            return this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);
        }
    },
    created() {

        if( localStorage && localStorage.getItem('cart')) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            this.cart = [];
        }
        bus.$on("product-quant", (data) => {
            this.quantity = data;
        });


    },
    methods: {
        getCart() {
            
        }
    }
}
</script>

<style>
h1 {
    font-size: 28px;
    font-weight: 300;
    flex: 2;
}

.product-navbar {
    display: flex;
    padding: 30px 0;
}

.cart-items p {
    cursor: pointer;
}
</style>
