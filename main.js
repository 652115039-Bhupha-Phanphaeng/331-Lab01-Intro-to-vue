const { createApp, ref, computed } = Vue

const app = createApp({
    setup() {
        const cart = ref([])
        const premium = ref(false)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])

        function updateCart(id) {
            for (var i = 0; i < cart.value.length; i++) {
                if (cart.value[i].id === id) {
                    cart.value[i].amount++
                    return;
                }
            }
            cart.value.push({id: id, amount: 1})
            return;
        }

        return {
            cart,
            premium,
            details,
            updateCart
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.mount('#app')