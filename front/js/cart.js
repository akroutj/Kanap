

const cartArray = JSON.parse(localStorage.getItem("cart"))
console.log(cartArray)
cartArray.forEach((item) => displayItem(item))


function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)

    const divImage = makeImageDiv(item)
    article.appendChild(divImage)

    const divCartItemContent = makeCartItemContent(item)
    article.appendChild(divCartItemContent)

}

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
    settingsQuantity.appendChild(input)

    const settingsDelete = document.createElement("div")
    settingsDelete.className = "cart__item__content__settings__delete"
    settings.appendChild(settingsDelete)

}

//function makeSettingsQuantity(item) {}

//function makeSettingsDelete(item) {}

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