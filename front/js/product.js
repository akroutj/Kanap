
// Localisation et récuperation de l'URL de la page produit

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

let globalPrice = 0
let imageCart, altTxtCart

// Mise en place de Fletch - Récupération des données de l'API + ID

fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((res) => addProductsChoices(res))

// Création du produit et appel des fonctions

function addProductsChoices(couchObjects) {
    const { imageUrl, altTxt, description, name, price, colors } = couchObjects
    globalPrice = price
    imageCart = imageUrl
    altTxtCart = altTxt
    title = name
    makeTitle(name)
    makeImage(imageUrl, altTxt)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

//  Création de l'image produit

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const itemImage = document.querySelector(".item__img")
    if (itemImage != null) itemImage.appendChild(image)
}

// Création du titre produit

function makeTitle(name) {
    const title = document.querySelector("#title")
    title.textContent = name
}

// Création du prix produit

function makePrice(price) {
    const priceProduct = document.querySelector("#priceProduct")
    priceProduct.textContent = price
}

// Création de la déscription produit

function makeDescription(description) {
    const descriptionProduct = document.querySelector("#description")
    descriptionProduct.textContent = description
}

// Création de la couleur produit + options des couleurs

function makeColors(colors) {
    const selectColors = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        selectColors.appendChild(option)
    });
}

// Ajout d'un évenement "click" sur le boutton "ajouter au panier"

const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    ifSelectIsEmpty(color, quantity)
    saveCartLocalStorage(color, quantity)
})

// Sauvegarde des options couleur et quantité dans le localStorage

function saveCartLocalStorage(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: globalPrice,
        title: title,
        imageUrl: imageCart,
        altTxt: altTxtCart
    }
    if (localStorage.getItem("cart")) {
        let temporaryItems = JSON.parse(localStorage.getItem("cart"))
        let modifCur = {}
        if (modifCur = temporaryItems.find(it => it.id === data.id && it.color === data.color))
            modifCur.quantity += parseInt(data.quantity)
        else temporaryItems.push(data)
        localStorage.setItem("cart", JSON.stringify(temporaryItems))
    }
    else localStorage.setItem("cart", JSON.stringify([data]))
}

// Message d'erreur si la couleur et/ou la quantité ne sont pas séléctionés

function ifSelectIsEmpty(color, quantity) {
    if (color === '' || quantity === '' || color == null || quantity == 0) {
        alert("Choississez une couleur et une quantité")
    } else {
        window.location.href = "cart.html"
    }
}