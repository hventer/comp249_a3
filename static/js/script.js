(function(){


    $(document).ready(function() {

        /* make a model instance and trigger data load */
        window.app.model = new window.app.SW()
        window.app.model.getData()

        /* set up handler for dataChanged event from model */
        $(window).on("dataChanged", function() {
            var products = window.app.model.getProducts()

            $("#products").append("<tr><th>Product</th><th>Cost</th>")
             for(var i=0; i<products.length; i++) {
                //$("#products").append("<li>" + products[i].name + "<button class='product' data-product=" + products[i].id + ">Show</button></li>")
                $("#products").append("<tr><td><a class='product' data-product=" + products[i].id +">" + products[i].name + "</a>" +
                    "<td>$"+products[i].unit_cost+"</td></tr>")
             }


             $(".product").click(function() {
                //console.log("Ive been clicked")
                var id = parseInt(this.dataset.product)
                var data = window.app.model.getDetails(id)
                //console.log(data)
                $(".item").html("<h2>"+data.name+"</h2>" +
                    "<div class='image'><img src="+data.image_url+"></div>" +
                    "<div class='inventory'>"+data.inventory+" in stock</div>" +
                    "<div class='cost'>$"+data.unit_cost+"</div>" +
                    data.description);

          /*
         <form method='POST' action="/cart">
             <input type="number" name="quantity" value="1">
             <input type="hidden" name="product" value={{product['id']}}>
             <input type="submit" value="Add to Cart">
         </form>
         */


            })
        })
    })
})()



