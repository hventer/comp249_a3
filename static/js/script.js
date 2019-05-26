(function(){


    $(document).ready(function() {

        // make a model instance and trigger data load for both products and cart
        window.app.model = new window.app.WT()
        window.app.model.getProductData()
        window.app.model.getCartData()

        // set up handler for productDataChanged event from model
        $(window).on("productDataChanged", function() {
            //get the product list from model
            const products = window.app.model.getProducts()

            //use handlebars to fill in the template in index.html
            let template = Handlebars.compile($("#productstemplate").html())
            //pass the list of products and display it
            let context = template({products: products})
            $('#products').html(context)

            //$(".ProdTableHead").click(console.log("ive been clicked"))

            //when a product is clicked on, display its details to the right.
            $(".product").click(function () {

                //get the id of the product that was clicked from index.html
                let id = parseInt(this.dataset.product)

                //get the details of this product from model
                let data = window.app.model.getDetailsID(id)

                //use handlebars to fill in the template for this product
                template = Handlebars.compile($("#itemtemplate").html())
                context = template({name: data.name,
                                        image_url: data.image_url,
                                        inventory: data.inventory,
                                        unit_cost: data.unit_cost,
                                        description: $(data.description).text(),
                                        id: id})
                $('.item').html(context)

                $('<p>').replaceWith("")
                $('</p>').replaceWith("")

                //when the close button is clicked, blank the html of item
                $(".close").click(function () {
                    $(".item").html("")
                })

                //when the submit button is clicked on the "Add to Cart" of the product
                $("#cartform").submit(function(event) {
                    //get the quantity and id from the form
                    let input = $(this).children("input[name='quantity']")
                    var quant = $(input).val()
                    input = $(this).children("input[name='productid']")
                    var id = $(input).val()


                    //give the id and quantity to setCart in model
                    window.app.model.setCart(id, quant, 0)

                    //dont refresh the page
                    event.preventDefault()
                })
            })

            // function sortTable(n) {
            //     console.log(n)
            //     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            //     table = document.getElementById("productstable");
            //     switching = true;
            //     // Set the sorting direction to ascending:
            //     dir = "asc";
            //     /* Make a loop that will continue until
            //     no switching has been done: */
            //     while (switching) {
            //         // Start by saying: no switching is done:
            //         switching = false;
            //         rows = table.rows;
            //         console.log(rows)
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
            //
            // $("#CostTableHead").click(sortTable(1))
        })

        // set up handler for cartDataChanged event from model
        $(window).on("cartDataChanged", function () {
            //get the cart list from model
            let cart = window.app.model.getCart()

            //add up the total sum of the cart
            let sum = 0
            for (let i = 0; i < cart.length; i++) {
                sum += cart[i].cost
            }

            //use handlebars to fill in the template for the cart up the top
            let template = Handlebars.compile($("#carttemplate").html())
            let context = template({length: cart.length, sum: sum})
            $('.header').html(context)

            //if the view cart button is clicked
            $(".cart").click(function () {
                $(".item").html("")

                //use handlebars to fill in the template of the cart
                template = Handlebars.compile($("#cartlisttemplate").html())
                context = template({cart: cart, sum: sum})
                $('.item').html(context)

                //if the cart is updated while the cart is being displayed
                $(".modcartform").submit(function(event) {
                    let input = $(this).children("input[name='quantity']")
                    var quant = $(input).val()
                    input = $(this).children("input[name='productid']")
                    var id = $(input).val()
                    
                    //add the updated quantity to the cart
                    window.app.model.setCart(id, quant, 1)

                    $(".item").html("")

                    event.preventDefault()
                })
            })
        })
    })
})()
