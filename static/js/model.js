(function(){

    var dataChangedEvent = new Event('dataChanged')

    function SW() {
        this.url = '/products'
        this.products = []
    }

    /* get data from the API endpoint and store it locally */
    SW.prototype.getData = function() {

        var self = this

        $.get({
           url: self.url,
           success: function(data) {
                /* store data as a property of this object */
                self.products = data
                /* trigger the data changed event */
                window.dispatchEvent(dataChangedEvent)
           }
        })
    }

    /* return the list of films */
    SW.prototype.getProducts = function() {
        if (this.products === []) {
            return []
        } else {
            return this.products.products
        }
    }

    SW.prototype.getDetails = function(id) {
        let results = this.getProducts()

        for(var i=0; i<results.length; i++) {
            if(results[i].id == id) {
                return results[i]
            }
        }
    }

    /* export to the global window object */
    window.app = window.app || {}
    window.app.SW = SW

})()