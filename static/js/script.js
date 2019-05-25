(function(){


    $(document).ready(function() {

        // make a model instance and trigger data load
        window.app.model = new window.app.WT()
        window.app.model.getProductData()
        window.app.model.getCartData()

        // set up handler for dataChanged event from model
        $(window).on("productDataChanged", function() {
            console.log("1")
            const products = window.app.model.getProducts()
            console.log("2")

            let template = Handlebars.compile($("#productstemplate").html())
            let context = template({products: products})
            $('#products').html(context)


            $(".product").click(function () {
                let id = parseInt(this.dataset.product)
                let data = window.app.model.getDetailsID(id)

                //the html for this specific product
                template = Handlebars.compile($("#itemtemplate").html())
                context = template({name: data.name,
                                        image_url: data.image_url,
                                        inventory: data.inventory,
                                        unit_cost: data.unit_cost,
                                        description: data.description,
                                        id: id})
                $('.item').html(context)

                $(".close").click(function () {
                    $(".item").html("")
                })

                $("#cartform").submit(function(event) {
                    let input = $(this).children("input[name='quantity']")
                    var quant = $(input).val()
                    input = $(this).children("input[name='productid']")
                    var id = $(input).val()

                    window.app.model.setCart(id, quant)
                    event.preventDefault()
                })
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

        $(window).on("cartDataChanged", function () {
            const cart = window.app.model.getCart()

            let sum = 0
            for (let i = 0; i < cart.length; i++) {
                sum += cart[i].cost
            }
            let template = Handlebars.compile($("#carttemplate").html())
            let context = template({length: cart.length, sum: sum})
            $('.header').html(context)

            $(".cart").click(function () {
                $(".item").html("")
                template = Handlebars.compile($("#cartlisttemplate").html())
                context = template({cart: cart, sum: sum})
                $('.item').html(context)

                $("#modcartform").submit(function(event) {
                    let input = $(this).children("input[name='quantity']")
                    var quant = $(input).val()
                    input = $(this).children("input[name='productid']")
                    var id = $(input).val()

                    window.app.model.setCart(id, quant)
                    event.preventDefault()
                })
            })
        })
    })
})()
