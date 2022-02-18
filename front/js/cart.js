
// Récupération des données du localStorage et création d'un tableau

const cartArray = JSON.parse(localStorage.getItem("cart"))
console.log(cartArray)
cartArray.forEach((item) => displayItem(item))

// Affichage des produits dans le panier

function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)

    const divImage = makeImageDiv(item)
    article.appendChild(divImage)

    const divCartItemContent = makeCartItemContent(item)
    article.appendChild(divCartItemContent)

    displayTotalQuantity()
    displayTotalPrice()
}

//CART_ITEM

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeCartItemContent(item) {
    const divCartItemContent = document.createElement("div")
    divCartItemContent.className = "cart__item__content"
    console.log(divCartItemContent)
    makeDescription(item, divCartItemContent)
    makeSettings(item, divCartItemContent)


    return divCartItemContent
}

function makeDescription(item, divCartItemContent) {
    const description = document.createElement("div")
    description.className = "cart__item__content__description"
    divCartItemContent.appendChild(description)

    const title = document.createElement("h2")
    title.textContent = item.title
    description.appendChild(title)

    const color = document.createElement("p")
    color.textContent = item.color
    description.appendChild(color)

    const price = document.createElement("p")
    price.textContent = item.price + " €"
    description.appendChild(price)
}

function makeSettings(item, divCartItemContent) {
    const settings = document.createElement("div")
    settings.className = "cart__item__content__settings"
    divCartItemContent.appendChild(settings)
    makeSettingsQuantity(item, settings)
    makeSettingsDelete(item, settings)
}

function makeSettingsQuantity(item, settings) {
    const settingsQuantity = document.createElement("div")
    settingsQuantity.className = "cart__item__content__settings__quantity"
    settings.appendChild(settingsQuantity)
    const quantity = document.createElement("p")
    quantity.textContent = "Qté : "
    settingsQuantity.appendChild(quantity)

    const input = document.createElement("input")
    input.type = "number"
    input.className = "itemQuantity"
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("change", () => updatePriceAndQuantity(input.value, item))
    settingsQuantity.appendChild(input)
}

function updatePriceAndQuantity(newValue, item) {
    const itemToUpdate = cartArray.find((it) => it.id === item.id && it.color === item.color)
    itemToUpdate.quantity = Number(newValue)
    displayTotalQuantity()
    displayTotalPrice()
    saveNewValueQuantity(item)
}

function saveNewValueQuantity(item) {
    const otherItemOfCart = cartArray.filter((it) => it.id !== item.id || it.color !== item.color)
    otherItemOfCart.push(item)
    let dataToSave = JSON.stringify(otherItemOfCart)
    localStorage.setItem("cart", dataToSave)
}

function makeSettingsDelete(item, settings) {
    const settingsDelete = document.createElement("div")
    settingsDelete.className = "cart__item__content__settings__delete"

    settingsDelete.addEventListener("click", () => deleteItem(item))

    settings.appendChild(settingsDelete)
    const deleteItem = document.createElement("p")
    deleteItem.className = "deleteItem"
    deleteItem.textContent = "supprimer"
    settingsDelete.appendChild(deleteItem)
}

function deleteItem(item) {
    console.log("delete")
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

//CART_PRICE

//Calcul de la quantité totale des articles sélectionés

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cartArray.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

//Calcul du prix total des articles sélectionnés

function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cartArray.reduce((total, item) => total + item.quantity * item.price, 0)
    totalPrice.textContent = total
}