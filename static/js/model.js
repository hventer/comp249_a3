(function(){

    var productDataChangedEvent = new Event('productDataChanged')
    var cartDataChangedEvent = new Event('cartDataChanged')


    function WT() {
        this.urlpro = '/products'
        this.urlcart = '/cart'
        this.products = []
        this.cart = []
    }

    /* get product data from the API endpoint and store it locally */
    WT.prototype.getProductData = function() {

        var self = this

        $.get({
           url: self.urlpro,
           success: function(data) {
                /* store data as a property of this object */
                self.products = data
               /* trigger the data changed event */
                window.dispatchEvent(productDataChangedEvent)
           }
        })
    }

    /* get product data from the API endpoint and store it locally */
    WT.prototype.getCartData = function() {

        var self = this

        $.get({
           url: self.urlcart,
           success: function(data) {
                /* store data as a property of this object */
                self.cart = data
               /* trigger the data changed event */
                window.dispatchEvent(cartDataChangedEvent)
           }
        })
    }

    /* add to/updating the cart */
    WT.prototype.setCart = function(id, quant, updateVal) {

        var self = this

        /* make a post request to '/cart' */
        $.post({
            url: self.urlcart,

            /* give the data required by the POST in main.py */
            data: {
                'productid': id,
                'quantity': quant,
                'update': updateVal
            },

           success: function(data) {
                /* get the updated cart data from the POSTs redirect to GET '/cart' */
               self.cart = data

                /* trigger the data changed event */
                window.dispatchEvent(cartDataChangedEvent)
           }
        })
    }

    /* return the list of products */
    WT.prototype.getProducts = function() {
        if (this.products === []) {
            return []
        } else {
            return this.products.products
        }
    }

    /* get a specific product when given an id */
    WT.prototype.getDetailsID = function(id) {
        let results = this.getProducts()

        for(let i=0; i<results.length; i++) {
            if(results[i].id === id) {
                return results[i]
            }
        }
    }

    /* return the list of the cart */
    WT.prototype.getCart = function() {
        if (this.cart === []) {
            return []
        } else {
            return this.cart.cart
        }
    }


    /* export to the global window object */
    window.app = window.app || {}
    window.app.WT = WT

})()