const products = [
    {
        name: "Signature Bubble Tea",
        image: "../images/signature-bubble-tea.png",
        category: "Milk Tea",
        price: 7.00,
        info: "Our signature GoBoba milk tea with sweet chewy tapioca."
    },
    {
        name: "Classic Milk Tea",
        image: "../images/classic-milk-tea.png",
        category: "Milk Tea",
        price: 5.50,
        info: "Made with black tea, brown sugar and non dairy cream."
    },
    {
        name: "Lava Pearl Milk Tea",
        image: "../images/lava-pearl-milk-tea.png",
        category: "Milk Tea",
        price: 8.99,
        info: "Black sugar coated tapioca with milk tea."
    },
    {
        name: "Lava Pearl Jasmine Milk Tea",
        image: "../images/lava-pearl-jasmine-milk-tea.png",
        category: "Milk Tea",
        price: 7.50,
        info: "Black sugar coated tapioca with Jasmine milk tea."
    },
    {
        name: "Mango Green Tea",
        image: "../images/mango-green-tea.png",
        category: "Fruit Tea",
        price: 7.50,
        info: "Tropical fresh mango, mango juice with green tea."
    },
    {
        name: "Passion Fruit Black Tea",
        image: "../images/passion-fruit-black-tea.png",
        category: "Fruit Tea",
        price: 7.50,
        info: "Made with passion fruit juice and black tea."
    },
    {
        name: "Lemon Green Tea",
        image: "../images/lemon-green-tea.png",
        category: "Fruit Tea",
        price: 8.00,
        info: "Lemon juice infused green tea."
    },
    {
        name: "Honey Aloe Vera",
        image: "../images/honey-aloe-vera.png",
        category: "Fruit Tea",
        price: 6.00,
        info: "Black tea with aloe vera and honey."
    },
    {
        name: "Lemon Yakult",
        image: "../images/lemon-yakult.png",
        category: "Yakult",
        price: 8.50,
        info: "Lemon juice with sweetened probiotic Yakult. Contains dairy. Caffeine-free."
    },
    {
        name: "Mango Yakult",
        image: "../images/mango-yakult.png",
        category: "Yakult",
        price: 7.50,
        info: "Tropical fruity blend with sweetened probiotic Yakult. Caffeine-free."
    },
    {
        name: "Grapefruit Yakult",
        image: "../images/grapefruit-yakult.png",
        category: "Yakult",
        price: 6.00,
        info: "Grapefruit juice with with probiotic Yakult.  Contains dairy. Caffeine-free."
    },
    {
        name: "Green Tea Yakult",
        image: "../images/green-tea-yakult.png",
        category: "Yakult",
        price: 6.00,
        info: "Green tea with sweetened probiotic Yakult. Contains dairy."
    },
    {
        name: "Matcha Smoothie",
        image: "../images/matcha-smoothie.png",
        category: "Smoothie",
        price: 7.50,
        info: "Japanese matcha green tea ice blended with a salty cream foam. Caffeine-free."
    },
    {
        name: "Mango Smoothie",
        image: "../images/mango-smoothie.png",
        category: "Smoothie",
        price: 8.99,
        info: "Tropical fruity ice blended. Contains probiotic Yakult. Contains dairy. Caffeine-free."
    }
]

const milkTeaContent = document.getElementById("milk-tea-content");
const fruitTeaContent = document.getElementById("fruit-tea-content");
const yakultContent = document.getElementById("yakult-content");
const smoothieContent = document.getElementById("smoothie-content");

for (let i = 0; i < products.length; i++) {

    const product = products[i];
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <div class="card">
    <img class="product-image" src="${product.image}">
    <div class="product-name">${product.name}</div>
    <div class="product-price">$${product.price.toFixed(2)}</div>
    <div class="product-category">${product.category}</div>
    <div class="product-info">${product.info}</div>
    <button class="add-to-cart-btn">Add To Cart</button>
    </div>
    `;

    //Sort card by the product category if the current page is menu.html
    if (document.URL.includes("pages/menu.html")) {
        if (product.category === "Milk Tea") {
            milkTeaContent.appendChild(newDiv);
        } else if (product.category === "Fruit Tea") {
            fruitTeaContent.appendChild(newDiv);
        } else if (product.category === "Yakult") {
            yakultContent.appendChild(newDiv);
        } else {
            smoothieContent.appendChild(newDiv);
        }
    }
}

//shopping cart array
let shoppingCartArray = [];

//clicking a button to add to cart
let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

addToCartBtns.forEach((addToCartBtn, index) => {
    addToCartBtn.addEventListener("click", () => {
        const selectedProduct = products[index];
        shoppingCartArray.push(selectedProduct);
        console.log("Added to cart:", selectedProduct);
        // saveArray2(shoppingCartArray);
    });
});

document.addEventListener("DOMContentLoaded", function () {

    let shoppingCartBtn = document.getElementById("shopping-cart-btn");

    if (shoppingCartBtn) {  //checks to see if shoppingCartBtn is not null or undefined
        shoppingCartBtn.addEventListener("click", function () {
            saveArray(shoppingCartArray);
        });
    }
});


let storedItems = [];

// Retrieve the cart items from localStorage when the page loads
storedItems = JSON.parse(localStorage.getItem("myCartItems")) || [];

function saveArray(array) {
    let storedItems;

    if (localStorage.getItem("myCartItems")) {
        const oldValue = JSON.parse(localStorage.getItem("myCartItems"));

        storedItems = oldValue.concat(array);

        // Combine two arrays of objects (old cart and new cart)
        localStorage.setItem("myCartItems", JSON.stringify(storedItems));

    } else {
        // There is no value stored in local storage
        localStorage.setItem("myCartItems", JSON.stringify(array));
        storedItems = array; // Set it to the new array if there was no existing data
    }

    return storedItems;
}


// Retrieve the cart items from localStorage when the page loads
let updatedCart = JSON.parse(localStorage.getItem("myCartItems"));

if (document.URL.includes("pages/shopping-cart.html")) {
    console.log(storedItems);
    // Creating each card in cart on right content
    const rightContent = document.getElementById("right-content");
    const total = document.getElementById("total");

    for (let i = 0; i < storedItems.length; i++) {
        const myCartItem = storedItems[i];
        var newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <div class="card">
        <div>
            <img class="myCartItem-image" src="${myCartItem.image}">
            </div>
            <div class="info">
                <div class="myCartItem-name">${myCartItem.name}</div>
                <div class="myCartItem-price">$${myCartItem.price.toFixed(2)}</div>
                <div class="myCartItem-category">${myCartItem.category}</div>
            <div>
            <div>
            <button class="remove-btn">REMOVE</button>
            </div>
        </div>
        `;

        rightContent.appendChild(newDiv);
    }
    let result = totalCost(storedItems);
    let roundedResult = result.toFixed(2);
    total.textContent = `Total: $${roundedResult}`;

    // Remove item from cart if remove button is clicked.
    // remove item from storedItems
    // update it in localStorage
    let removeBtns = document.querySelectorAll(".remove-btn");

    removeBtns.forEach((removeBtn, index) => {
        removeBtn.addEventListener("click", () => {
            console.log("clicked");
            const removedProduct = storedItems[index];
            delete storedItems[index];
            console.log("Removed from cart:", removedProduct);
            console.log(removeBtn.parentNode.parentNode.parentNode.parentNode);
            let cardElement = removeBtn.parentNode.parentNode.parentNode.parentNode;
            cardElement.remove();
            saveArray(storedItems);



            result = totalCost(storedItems);
            roundedResult = result.toFixed(2);
            total.textContent = `Total: $${roundedResult}`;
        });
    });

    //Clear local storage if continue link is clicked, which also leads to the thank you page
    const thankYouLink = document.getElementById("thank-you-link");

    thankYouLink.addEventListener("click", () => {
        localStorage.clear();
    })
    function totalCost(array) {
        let result = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === undefined) {
                result = result + 0;
            } else {
                result += array[i].price;
                result.toFixed(2);
            }
        }
        return result;
    }
}






//ISSUE: cart item not saving after you update localstorage (by choosing new items)

