const { createApp, ref } = Vue

createApp({
    setup() {
        const product = ref('Boots')
        const description = ref('Warm and cozy boots')
        const image = ref('./assets/images/socks_green.jpg')
        const link = ref('https://www.camt.cmu.ac.th/')
        const inStock = ref(true)
        const onSale = ref(true)
        const inventory = ref(5)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const sizes = ref([
            'S', 'M', 'L'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg'},
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg'}
        ])
        const cart = ref(0)

        function addToCart() {
            cart.value += 1
        }
        function updateImage(variantImage) {
            image.value = variantImage
        }
        return {
            product,
            description,
            image,
            link,
            inStock,
            inventory,
            onSale,
            details,
            sizes,
            variants,
            cart,
            addToCart,
            updateImage
        }
    }
}).mount('#app')