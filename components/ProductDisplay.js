const productDisplay = {

    template:
    /*html*/
    `
    <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image" :class="{OutOfStockImg: !inStock}">
                </div>
            </div>
        </div>
        <div class="product-info">
            <a :href="link" target="_blank"><h1>{{title}}</h1></a>
            <p>{{description}}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            <p v-if="onSale">{{title+" is on sale"}}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <span v-for="size in sizes">{{size+" "}}</span>
            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
                {{variant.color}}
            </div>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <button class="button" :disabled="!inStock" @click="addToCart" :class="{disabledButton: !inStock}">Add To Cart</button>
            <button class="button" @click="toggleStock">Toggle Stock</button>
        </div>
    </div>
    `,
    props:{
        premium: Boolean
    },
    setup(props) {
        const shipping = computed(() => {
            if (props.premium) {
                return 'Free'
            }else{
                return 30
            }
        })
        
        const product = ref('Boots')
        const brand = ref('SE 331')
        const description = ref('Warm and cozy boots')
        const link = ref('https://www.camt.cmu.ac.th/')
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
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true},
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false}
        ])
        const selectedVariant = ref(0)
        const cart = ref(0)


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
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        const onSale = computed(() => {
            return variants.value[selectedVariant.value].onSale
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
            updateVariant,
            shipping
        }
    }
}