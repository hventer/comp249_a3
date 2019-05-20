(function(){

    var dataChangedEvent = new Event('dataChanged')

    function WT() {
        this.urlpro = '/products'
        this.urlcart = '/cart'
        this.products = []
        this.cart = []
    }

    /* get data from the API endpoint and store it locally */
    WT.prototype.getData = function() {

        var self = this

        $.get({
           url: self.urlpro,
           success: function(data) {
                /* store data as a property of this object */
                self.products = data
           }
        })

        $.get({
           url: self.urlcart,
           success: function(data) {
                /* store data as a property of this object */
                self.cart = data
                /* trigger the data changed event */
                window.dispatchEvent(dataChangedEvent)
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

    WT.prototype.getDetails = function(id) {
        let results = this.getProducts()

        for(var i=0; i<results.length; i++) {
            if(results[i].id === id) {
                return results[i]
            }
        }
    }

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