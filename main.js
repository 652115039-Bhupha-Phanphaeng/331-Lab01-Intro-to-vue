const { createApp, ref } = Vue

createApp({
    setup() {
        const product = ref('Boots')
        const description = ref('Warm and cozy boots')
        return {
            product,
            description
        }
    }
}).mount('#app')