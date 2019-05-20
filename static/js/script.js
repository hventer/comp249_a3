(function(){


    $(document).ready(function() {

        // make a model instance and trigger data load
        window.app.model = new window.app.WT()
        window.app.model.getData()

        // set up handler for dataChanged event from model
        $(window).on("dataChanged", function() {
            var products = window.app.model.getProducts()
            var cart = window.app.model.getCart()

            var sum = 0
            for (var i = 0; i < cart.length; i++) {
                sum += cart[i].cost
            }
            $(".header").html("<h1>The WT</h1" +
                "<ul><li><h2>Your Cart: "+cart.length+" items, $"+sum+"</h2></li>" +
                "<li><button class='cart'>Show Cart</button></li></ul>")


            $("#products").append("<tr><th>Product</th><th>Cost</th></tr>")
            for (var i = 0; i < products.length; i++) {
                $("#products").append("<tr><td><a class='product' data-product=" + products[i].id + ">" + products[i].name + "</a>" +
                    "<td>$" + products[i].unit_cost + "</td></tr>")
            }


            $(".product").click(function () {
                var id = parseInt(this.dataset.product)
                var data = window.app.model.getDetails(id)

                // //check if this item is in the cart
                var updateVal = 0
                for(var i=0; i<cart.length; i++) {
                    if (cart[i].id === id) {
                        updateVal = 1
                    }
                }

                //the html for this specific product
                $(".item").html("<button class='close'>Close</button><h2>" + data.name + "</h2>" +
                    "<div><img src=" + data.image_url + "></div>" +
                    "<div class='info'>" + data.inventory + " in stock</div>" +
                    "<div class='info'>$" + data.unit_cost + "</div>" +
                    "<div class='info'>" + data.description + "</div>" +

                    //the add to cart function
                    "<form action='/cart' method='post'>" +
                    "Quantity: <input type='number' name='quantity' value='1'>" +
                    "<input type='submit' value='Add to Cart'>" +
                    "<input type='hidden' name='update' value=" + updateVal + ">" +
                    "<input type='hidden' name='productid' value=" + id + "></form>")


                $(".close").click(function () {
                    console.log("Ive been clicked")
                    $(".item").html("")
                })
            })



            $(".cart").click(function () {
                var sum = 0
                $(".item").html("")
                for (var i = 0; i < cart.length; i++) {
                    sum+=cart[i].cost
                    $(".item").append("<div class='info'>" + cart[i].name + "</div>" +
                        "<div class='info'>" + cart[i].quantity + "</div>" +
                        "<div class='info'>$" + cart[i].cost + "</div>" +
                        "<div class='info'>Total: $"+sum+"</div>")
                }
            })
        })
    })
})()
