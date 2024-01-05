let allProducts = [
    {id: 1, title: 'Bag', price: 12, img: './images/sharval.jpg' ,count:'1'},
    {id: 2, title: 'Shoes', price: 21, img: './images/shoes.jpg',count:'1' },
    {id: 3, title: 'Glasses', price: 33, img: './images/bag.jpg', count:'1' },
    {id: 4, title: 'O clock', price: 41, img: './images/glasses.jpg', count:'1' },
    {id: 5, title: 'trousers', price: 98, img: './images/clock.jpg', count:'1' },
    {id: 6, title: 'Hat', price: 65, img: './images/hat.jpg', count:'1' },
]

let userBasket = []
let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductBtn = $.querySelector('#remove-all-product')
const cartTotalPriceElm  = $.querySelector('.cart-total-price')

allProducts.forEach(function (product) {
    let productContainer = $.createElement('div')
    productContainer.classList.add('shop-item')

    let productTitleSpan = $.createElement('span')
    productTitleSpan.classList.add('shop-item-title')
    productTitleSpan.innerHTML = product.title

    let productImageElem = $.createElement('img')
    productImageElem.classList.add('shop-item-image')
    productImageElem.setAttribute('src', product.img)

    let productDetailsContainer = $.createElement('div')
    productDetailsContainer.classList.add('shop-item-details')

    let productPriceSpan = $.createElement('span')
    productPriceSpan.innerHTML = product.price
    productPriceSpan.classList.add('shop-item-price')

    let productAddButton = $.createElement('button')
    productAddButton.innerHTML = 'ADD TO CART'
    productAddButton.className = 'btn btn-primary shop-item-button'
    productAddButton.addEventListener('click', function () {
        addProductToBasketArray(product.id)
    })

    productDetailsContainer.append(productPriceSpan, productAddButton)
    productContainer.append(productTitleSpan, productImageElem, productDetailsContainer)
    shopItemsContainer.append(productContainer)

})



function addProductToBasketArray (productId) {

    let mainProduct = allProducts.find(function (product) {
        return product.id === productId
    })

    userBasket.push(mainProduct)

    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)

    console.log(userBasket);
}



function basketProductsGenerator (userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach (function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.addEventListener('change', function(){
            updateContainer(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'Remove'
        basketProductRemoveBtn.addEventListener('click', function(){
            removeProductBasket(product.id)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        bastekProductsContainer.append(basketProductContainer)

    })
}

function removeProductBasket(productId){

    userBasket = userBasket.filter(function(product){
        return product.id !== productId
    })

    basketProductsGenerator(userBasket)
}

removeAllProductBtn.addEventListener('click', function(){
    userBasket = []
    basketProductsGenerator(userBasket)
})

function calcTotalPrice(userBasketArray){
    let totalPrice = 0
    userBasketArray.forEach(function(product){
        totalPrice += product.count * product.price
    })

    cartTotalPriceElm.innerHTML = totalPrice
}

function updateContainer(productId, newCount){
    console.log('product.id' + productId + 'new-count:' + newCount);

    userBasket.forEach(function(product){
        if(product.id === productId){
            product.count = newCount
        }
    })
    calcTotalPrice(userBasket)
}