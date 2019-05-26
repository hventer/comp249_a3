COMP249 Web Technology 2019: Javascript Web Application
===
I started by creating a `model.js` which handles retrieving the data from the APIs and storing them in local variables within the `model.js`.
The model handled eveything that I need to get from the product list, and anything needed to get or add from/to the cart.

In the week9 workshop, we implemented a similar idea to this assignment, however it was using `swapi.com` instead. As such, I was able to use that as a starting point for this assignment.

`script.js` starts with the main function ends with `()`, which means that it runs right away.
Within that, I have the `$(document).ready(function()` which runs when the document is finished loading and contains all my code.

In `model.js` I have a `productDataChanged` event which is triggered when the list of products is updated. In `script.js`, the majority of the product's stuff is done within the `$(window).on("productDataChanged", function()` which is run when the event `productDataChanged` is triggered.
Within that function, I use Handlebars to fill out templates which I created in `index.html`. There are multiple templates for each component of my HTML page. The comments within `script.js` specifically describe what each component of my code does.

In `model.js` I also have a `cartDataChanged` event which is triggered each time the cart is updated. This is done initially when the data is first retrieved from the API, and then every time after the cart is updated, with the `setCart` function.
When the `cartDataChanged` even is triggered, the `$(window).on("cartDataChanged", function ()` is called in `script.js` which contains all the code required to display the cart perform actions on it. The comments within `script.js` specifically describe what each component of my code does.

Besides that, I have `index.html` which contains all the necessary templates for Handlebars to use. Up the top of `index.html` are:
  * `<header class="header"></header>`
  * `<div class="content">`
      * `<div id="products"></div>`
      * `<div class="item"></div>`
  * `</div>`
  
which is where everthing that can be seen on the HTML page is placed. The templates are used to fill out these `<div>`'s and the CSS edits the id's and classes.


I'll admit I am having some trouble with modifying the cart when the cart list is displayed. I have been able to add items to the cart, however the updated cart is not displayed unless "View Cart" is clicked again. I know that the new cart should be dispalyed inside the function `$("#modcartform").submit(function(event)`. However, when doing this, it causes quite a few other issues.

The only files which I changed/added are:
  * `script.js`: modified
  * `model.js`: added
  * `index.html`: modified
  * `style.css`: modified
  * `README.md`: modified
  
  