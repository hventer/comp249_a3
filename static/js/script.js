(function(){


    $(document).ready(function() {

        // make a model instance and trigger data load
        window.app.model = new window.app.WT()
        window.app.model.getData()

        // set up handler for dataChanged event from model
        $(window).on("dataChanged", function() {
            const products = window.app.model.getProducts()
            const cart = window.app.model.getCart()

            let sum = 0
            for (let i = 0; i < cart.length; i++) {
                sum += cart[i].cost
            }
            $(".header").html("<h1>The WT</h1" +
                "<ul><li><h2 class='cart'>Your Cart: "+cart.length+" items, $"+sum+"</h2></li>" +
                "<li><button class='cart'>Show Cart</button></li></ul>")


            //$("#products").append("<tr><th onclick="+sortTable(0)+">Product</th><th onclick="+sortTable(1)+">Cost</th></tr>")
            $("#products").append("<tr><th>Product</th><th>Cost</th></tr>")
            for (let i = 0; i < products.length; i++) {
                $("#products").append("<tr><td><a class='product' data-product=" + products[i].id + ">" + products[i].name + "</a>" +
                    "<td>$" + products[i].unit_cost + "</td></tr>")
            }


            $(".product").click(function () {
                let id = parseInt(this.dataset.product)
                let data = window.app.model.getDetails(id)

                // //check if this item is in the cart
                let updateVal = 0
                for(let i=0; i<cart.length; i++) {
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
                let sum = 0
                $(".item").html("")
                for (let i = 0; i < cart.length; i++) {
                    sum+=cart[i].cost
                    $(".item").append("<div class='info'>" + cart[i].name + "</div>" +
                        "<div class='info'>" + cart[i].quantity + "</div>" +
                        "<div class='info'>$" + cart[i].cost + "</div>" +
                        "<div class='info'>Total: $"+sum+"</div>")
                }
            })


            // function sortTable(n) {
            //     console.log("I've been started " + n)
            //     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            //     table = document.getElementById("products");
            //     switching = true;
            //     // Set the sorting direction to ascending:
            //     dir = "asc";
            //     /* Make a loop that will continue until
            //     no switching has been done: */
            //     while (switching) {
            //         // Start by saying: no switching is done:
            //         switching = false;
            //         rows = table.rows;
            //         /* Loop through all table rows (except the
            //         first, which contains table headers): */
            //         for (i = 1; i < (rows.length - 1); i++) {
            //             // Start by saying there should be no switching:
            //             shouldSwitch = false;
            //             /* Get the two elements you want to compare,
            //             one from current row and one from the next: */
            //             x = rows[i].getElementsByTagName("TD")[n];
            //             y = rows[i + 1].getElementsByTagName("TD")[n];
            //             /* Check if the two rows should switch place,
            //             based on the direction, asc or desc: */
            //             if (dir == "asc") {
            //                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //                     // If so, mark as a switch and break the loop:
            //                     shouldSwitch = true;
            //                     break;
            //                 }
            //             } else if (dir == "desc") {
            //                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //                     // If so, mark as a switch and break the loop:
            //                     shouldSwitch = true;
            //                     break;
            //                 }
            //             }
            //         }
            //         if (shouldSwitch) {
            //             /* If a switch has been marked, make the switch
            //             and mark that a switch has been done: */
            //             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            //             switching = true;
            //             // Each time a switch is done, increase this count by 1:
            //             switchcount++;
            //         } else {
            //             /* If no switching has been done AND the direction is "asc",
            //             set the direction to "desc" and run the while loop again. */
            //             if (switchcount == 0 && dir == "asc") {
            //                 dir = "desc";
            //                 switching = true;
            //             }
            //         }
            //     }
            // }
        })
    })
})()
