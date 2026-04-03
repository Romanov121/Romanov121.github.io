var app = new Vue({
    el: '#article',
    data: {
        products: [
            {
                id: 1,
                title: "SWEET TAG 1000",
                short_text: "Sweet Pepper Red Blocky Type",
                main_name: "Sweet Pepper Determinate<br>Red Blocky Type",
                yield_text: "Very high yield and<br>excellent fruits quality!",
                image: "img/Paper1.png",
                resistance: "HR: Tm: 0-2; IR: TSWV",
                plant: ["Strong vigor that provides good leaf coverage.", "Very high productivity with good fruit setting.", "Early matured variety."],
                fruit: ["Long shelf life on plant and post harvest.", "Nice shiny attractive deep red color.", "Average fruit size: 180 – 220 grams."],
                cycle: ["Spring", "Autumn"],
                color: "Grean"
            },
            {
                id: 2,
                title: "CHILI TAG 1001",
                short_text: "Hot Pepper Determinate Red Slim Profile",
                main_name: "Hot Pepper Slim<br>Red Profile",
                yield_text: "Exceptional heat levels!",
                image: "img/Paper2.png",
                resistance: "HR: PMMoV",
                plant: ["Medium vigor.", "Good heat tolerance."],
                fruit: ["Very pungent.", "Thin walls."],
                cycle: ["Summer"],
                color: "Red/Grean"
            },
            {
                id: 3,
                title: "CHILI TAG 1002",
                short_text: "Hot Pepper Determinate Red Jalapeño Type",
                image: "img/Paper3.png",
                main_name: "Jalapeño Red",
                yield_text: "Perfect for processing!",
                resistance: "HR: PVY",
                plant: ["Compact bush."],
                fruit: ["Thick walls.", "Medium heat."],
                cycle: ["Spring"],
                color: "Red/Grean"
            },
            {
                id: 4,
                title: "CHILI TAG 1003",
                short_text: "Hot Pepper Determinate Red Thai Hot",
                image: "img/Paper4.png", 
                main_name: "Thai Hot Pepper",
                yield_text: "Extreme pungency!",
                resistance: "None",
                plant: ["Small leaves.", "Upright fruit set."],
                fruit: ["Small size.", "Very spicy."],
                cycle: ["Year round"],
                color: "Red"
            },
            {
                id: 5,
                title: "CHILI TAG 1004",
                short_text: "Hot Pepper Determinate EXTRA HOT Habanero",
                image: "img/Paper5.png",
                main_name: "Habanero Extra Hot",
                yield_text: "Top tier spicy variety!",
                resistance: "HR: TSWV",
                plant: ["Robust plant."],
                fruit: ["Lantern shape.", "Unique aroma."],
                cycle: ["Late Spring"],
                color: "Orange/Red"
            }
        ],
        currentProduct: null,
        btnVisible: 0,
        
        cart: [],
        contactFields: { 
            name: '',
            company: '',
            position: '',
            city: '',
            country: '',
            phone: '',
            email: '',
            role: 'seed producer',
            otherRole: '',
            interest: '',
            captcha: ''
        },
        orderSubmitted: false 
    },
    methods: {
        getProduct: function() {
            var hashId = window.location.hash.replace('#', '');
            if (hashId) {
                for (var i = 0; i < this.products.length; i++) {
                    if (this.products[i].id == hashId) {
                        this.currentProduct = this.products[i];
                        break;
                    }
                }
            }
        },

        addToCart: function(id) {
            var cart = [];
            if (localStorage.getItem('cart')) {
                cart = localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) === -1) {
                cart.push(id);
                localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1;
            }
        },

        checkInCart: function() {
            if (this.currentProduct && localStorage.getItem('cart')) {
                var cart = localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.currentProduct.id)) !== -1) {
                    this.btnVisible = 1;
                }
            }
        },

        //ФУНКЦІЯ ОТРИМАННЯ КОШИКА
        getCart: function() {
            this.cart = [];
            if (localStorage.getItem('cart')) {
                var localCartIds = localStorage.getItem('cart').split(',');
                for (var i = 0; i < localCartIds.length; i++) {
                    for (var j = 0; j < this.products.length; j++) {
                        if (this.products[j].id == localCartIds[i]) {
                            this.cart.push(this.products[j]); 
                            break;
                        }
                    }
                }
            }
        },

        //ФУНКЦІЯ ВИДАЛЕННЯ З КОШИКА
        removeFromCart: function(id) {
            this.cart = this.cart.filter(item => item.id != id);
            
            //Оновлюємо localStorage
            var cartIds = this.cart.map(item => item.id);
            if (cartIds.length > 0) {
                localStorage.setItem('cart', cartIds.join(','));
            } else {
                localStorage.removeItem('cart');
            }
        },

        //ФУНКЦІЯ ВІДПРАВКИ ЗАМОВЛЕННЯ
        makeOrder: function() {
            this.orderSubmitted = true; 
            this.cart = [];         
            localStorage.removeItem('cart'); 
        }
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart(); 
    }
});