const { createApp, ref, computed } = Vue

createApp({
    setup() {
        const product = ref('Boots')
        const brand = ref('SE 331')
        const description = ref('Warm and cozy boots')

        const link = ref('https://www.camt.cmu.ac.th/')

        const onSale = ref(true)
        const inventory = ref(100)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const sizes = ref([
            'S', 'M', 'L'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
        ])
        const selectedVariant = ref(0)
        const cart = ref(0)


        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })


        function addToCart() {
            cart.value += 1
        }
        function updateImage(variantImage) {
            image.value = variantImage
        }
        function toggleStock() {
            inStock.value = !inStock.value
        }
        function updateVariant(index) {
            selectedVariant.value = index;
        }


        const title = computed(() => {
            return brand.value + ' ' + product.value
        })
        return {
            title,
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
            updateImage,
            toggleStock,
            updateVariant
        }
    }
}).mount('#app')