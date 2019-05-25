(function(){

    var productDataChangedEvent = new Event('productDataChanged')
    var cartDataChangedEvent = new Event('cartDataChanged')


    function WT() {
        this.urlpro = '/products'
        this.urlcart = '/cart'
        this.products = []
        this.cart = []
    }

    /* get data from the API endpoint and store it locally */
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

    WT.prototype.getCartData = function() {

        var self = this

        $.get({
           url: self.urlcart,
           success: function(data) {
                /* store data as a property of this object */
                self.cart = data
               //console.log("getData")
               /* trigger the data changed event */
                window.dispatchEvent(cartDataChangedEvent)
           }
        })
    }

    WT.prototype.setCart = function(id, quant) {

        var self = this

        //check if this item is in the cart
        let updateVal = 0
         for(let i=0; i<self.cart.length; i++) {
             if (self.cart[i].id === id) {
                 updateVal = 1
             }
         }

         console.log(quant)

        $.post({
            url: self.urlcart,

            data: {
                'productid': id,
                'quantity': quant,
                'update': updateVal
            },

           success: function(data) {
               //console.log("post succeeded")
               self.cart = data
                /* trigger the data changed event */
                window.dispatchEvent(cartDataChangedEvent)
           }
        })
    }

    /* return the list of films */
    WT.prototype.getProducts = function() {
        if (this.products === []) {
            return []
        } else {
            return this.products.products
        }
    }

    WT.prototype.getDetailsID = function(id) {
        let results = this.getProducts()

        for(let i=0; i<results.length; i++) {
            if(results[i].id === id) {
                return results[i]
            }
        }
    }

    WT.prototype.getCart = function() {
        if (this.cart === []) {
            return []
        } else {
            //console.log("getCart")
            return this.cart.cart
        }
    }


    /* export to the global window object */
    window.app = window.app || {}
    window.app.WT = WT

})()