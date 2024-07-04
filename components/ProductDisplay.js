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
        <div class="product-info">
            <a :href="link" target="_blank"><h1>{{title}}</h1></a>
            <p>{{description}}</p>
            <p v-if="!inStock" class="OutOfStock">Out of Stock</p>
            <p v-else-if="inStock <= 10 && inStock>0" class="AlmostOutOfStock"><i>Almost out of Stock</i></p>
            <p v-else>In Stock</p>

            <p v-if="onSale">{{title+" is on sale"}}</p>
            <p v-else>{{title+" is not on sale"}}</p>

            <product-details :details="details"></product-details>

            <span v-for="size in sizes">{{size+", "}}</span>

            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
                {{variant.color}}
            </div>

            <p>Shipping: {{shipping}}</p>
            <button class="button" :disabled="!inStock" @click="addToCart" :class="{disabledButton: !inStock}">Add to cart</button>
            <button class="button" :disabled="!inStock" @click="removeFromCart" :class="{disabledButton: !inStock}">Remove from cart</button>
            <button class="button" @click="toggleStock">Toggle Stock</button>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    props:{
        premium: Boolean,
        details: Array
    },
    setup(props, {emit}) {
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
        const sizes = ref([
            'S', 'M', 'L'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true},
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false}
        ])
        const selectedVariant = ref(0)
        const reviews = ref([])


        var i = variants.value[selectedVariant.value].quantity;
        const stock = [20,5,0]
        

        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }
        function updateImage(variantImage) {
            image.value = variantImage
        }
        function toggleStock() {
            i = ++i%stock.length;
            variants.value[selectedVariant.value].quantity = stock[i];
        }
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        function addReview(review) {
            reviews.value.push(review);
            console.log('Reviews: '+reviews);
            reviews.value.forEach(element => {
                console.log(element);
            });
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
            onSale,
            sizes,
            variants,
            addToCart,
            removeFromCart,
            updateImage,
            toggleStock,
            updateVariant,
            addReview,
            reviews,
            shipping
        }
    }
}