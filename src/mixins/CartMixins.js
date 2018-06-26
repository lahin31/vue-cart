import Data from '../assets/data.json';
import { bus } from '../main';

export default {
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
        },
        deleteItem(product, index) {

            this.cart.splice(index, 1);
            const matchingProductIndex = this.cart.findIndex((item) => {
                return item.id == product.id;
            });
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.quantity =  this.cart.reduce((total, product) => {
                return total - product.qty;
            }, 0);
            if( this.quantity < 0 ) {
                this.quantity *= -1;
            }
            bus.$emit('product-quant', this.quantity);

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

        }
    },
    computed: {
        totalItems(){
            return this.cart.reduce((total, product) => {
                return total + product.qty;
            }, 0);
        },
        cartTotal(){
            return this.cart.reduce((total, product) => {
                return (total + product.qty * product.price) ;
            }, 0);
        },
  },
}