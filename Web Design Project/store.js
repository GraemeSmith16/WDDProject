if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var removeButtons = document.getElementsByClassName('btn-danger');

    for(var i=0; i < removeButtons.length; i++)
        {
            var button = removeButtons[i]
            button.addEventListener('click', removeItem)
        }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for(var i=0; i < quantityInput.length; i++)
    {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCart = document.getElementsByClassName('shop-item-button')
    for(var i=0; i < addToCart.length; i++)
    {
        var button = addToCart[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    updateTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerHTML
    var price = parseFloat(shopItem.getElementsByClassName('price')[0].innerHTML.replace('€', ''))
    var imageSrc = shopItem.getElementsByClassName('shop-item-images')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateTotal()
}

function addItemToCart(title, price, imageSrc)
{
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('title')
    for(var i=0; i < cartItemNames.length; i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert('This was already added to the cart.')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src=${imageSrc} width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeItem(event) {
    var clicked = event.target
        clicked.parentElement.parentElement.remove()
        updateTotal()
}

function updateTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total=0
    for(var i=0; i < cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerHTML.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        total = Math.round(total * 100) / 100
        var totalElement = document.getElementsByClassName('cart-total-price')[0]
        totalElement.innerHTML = '€' + total
    }
}