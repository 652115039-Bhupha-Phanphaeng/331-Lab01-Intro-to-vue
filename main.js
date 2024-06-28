const { createApp, ref } = Vue

createApp({
    setup() {
        const product = ref('Boots')
        const description = ref('Warm and cozy boots')
        const image = ref('./assets/images/socks_green.jpg')
        const link = ref('https://www.camt.cmu.ac.th/')
        const inStock = ref(false)
        return {
            product,
            description,
            image,
            link,
            inStock
        }
    }
}).mount('#app')