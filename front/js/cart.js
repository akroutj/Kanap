
// Récupération des données du localStorage et création d'un tableau

const cartArray = JSON.parse(localStorage.getItem("cart"))
cartArray.forEach((item) => {
    fetch("http://localhost:3000/api/products/" + item.id)
        .then((res) => res.json())
        .then((res) => displayItem({ ...res, quantity: item.quantity, color: item.color, title: item.title }))

})




// Ecoute de l'évenement sur l'envoi du formulaire

const form = document.querySelector(".cart__order__form")
form.addEventListener("submit", submitForm)

// Affichage des produits dans le panier

function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)

    const divImage = makeImageDiv(item)
    article.appendChild(divImage)

    const divCartItemContent = makeCartItemContent(item)
    article.appendChild(divCartItemContent)

    displayTotalQuantity()
    displayTotalPrice(item)
}

//CART_ITEM

// Création de l'article

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

// Création de l'image produit

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

//Rattachement et affichage des aticles

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// Création des cartes contanant la description et les settings

function makeCartItemContent(item) {
    const divCartItemContent = document.createElement("div")
    divCartItemContent.className = "cart__item__content"
    makeDescription(item, divCartItemContent)
    makeSettings(item, divCartItemContent)
    return divCartItemContent
}

// Création du contenu de la description (Titre, couleur et prix)

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
    price.textContent = item.price
    description.appendChild(price)
}

// Création des contenus des settings

function makeSettings(item, divCartItemContent) {
    const settings = document.createElement("div")
    settings.className = "cart__item__content__settings"
    divCartItemContent.appendChild(settings)
    makeSettingsQuantity(item, settings)
    makeSettingsDelete(item, settings)
}

// Création de l'input quantité et mise en place d'un changement possible des quantité

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

// Nouveau calcul des quantités et du prix total

function updatePriceAndQuantity(newValue, item) {
    const itemToUpdate = cartArray.find((it) => it.id === item._id && it.color === item.color)
    itemToUpdate.quantity = parseInt(newValue)
    displayTotalQuantity(item)
    newDisplayTotalPrice(itemToUpdate, item.quantity)
    saveNewValueQuantity(itemToUpdate)
}

// Sauvegarde du nouveau calcul dans le localStorage

function saveNewValueQuantity(item) {
    const otherItemOfCart = cartArray.filter((it) => it.id !== item.id || it.color !== item.color)
    otherItemOfCart.push(item)
    let dataToSave = JSON.stringify(otherItemOfCart)
    localStorage.setItem("cart", dataToSave)
}

// Création du bouton "supprimer" 

function makeSettingsDelete(item, settings) {
    const settingsDelete = document.createElement("div")
    settingsDelete.className = "cart__item__content__settings__delete"

    settingsDelete.addEventListener("click", () => deleteItemOnCLick(item))

    settings.appendChild(settingsDelete)
    const deleteItem = document.createElement("p")
    deleteItem.className = "deleteItem"
    deleteItem.textContent = "supprimer"
    settingsDelete.appendChild(deleteItem)
}

// Suppression de l'article et nouveau calcul (prix et quantité). Appel des fonctions

function deleteItemOnCLick(item) {
    const itemToDelete = cartArray.find(
        (itemDelete) => itemDelete.id === item.id && itemDelete.color === item.color
    )
    cartArray.splice(itemToDelete, 1)
    displayTotalPrice({ quantity: 0, price: item.price }, item.quantity
    )
    displayTotalQuantity()
    deleteItemToLocalStorage(item)
}

// Suppression de l'article sélectionné dans le localStorage

function deleteItemToLocalStorage(item) {
    const delIt = cartArray.filter((it) => it.id !== item.id && it.color !== item.color)
    let dataToSave = JSON.stringify(delIt)
    localStorage.setItem("cart", dataToSave)
    location.reload()
}

// FORM

// POST du formulaire et création d'un bon de commande - Redirection vers la page confirmation

function submitForm(e) {
    e.preventDefault()

    for (let x of [firstNameErrorMsg, lastNameErrorMsg])
        x.textContent = ""

    if (cartArray.length === 0) alert("Veuillez remplir le formulaire")
    if (isEmailInvalid()) return
    if (isFirstNameInvalid()) return
    if (isLastNameInvalid()) return
    if (isAddressInvalid()) return
    if (isCityInvalid()) return

    const body = makeRequestBody()

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderID", data.orderId);
            document.location.href = "confirmation.html"
        })
        .catch((error) => console.log(error))
}


// Vérification des saisies de l'adresse mail via regex

function isEmailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Entrez une adresse mail valide")
        return true
    }
    return false
}

// Vérification des saisies du prénom via regex

function isFirstNameInvalid() {
    const firstName = document.querySelector("#firstName").value
    const regex = /^[A-Za-z\é\è\ê\ë\ï\ä\-]+$/
    if (regex.test(firstName) === false) {
        const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
        firstNameErrorMsg.textContent = "Veuillez entrer un prénom valide"
        return true
    }
    return false
}

// Vérification des saisies du nom via regex

function isLastNameInvalid() {
    const lastName = document.querySelector("#lastName").value
    const regex = /^[A-Za-z\é\è\ê\ë\ï\ä\-]+$/
    if (regex.test(lastName) === false) {
        const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
        lastNameErrorMsg.textContent = "Veuillez entrer un nom valide"
        return true
    }
    return false
}

// Vérification des saisies de l'adresse via regex

function isAddressInvalid() {
    const address = document.querySelector("#address").value
    const regex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$/
    if (regex.test(address) === false) {
        const addressErrorMsg = document.querySelector("#addressErrorMsg")
        addressErrorMsg.textContent = "Veuillez entrer une adresse valide"
        return true
    }
    return false
}

// Vérification des saisies de la ville via regex

function isCityInvalid() {
    const city = document.querySelector("#city").value
    const regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    if (regex.test(city) === false) {
        const cityErrorMsg = document.querySelector("#cityErrorMsg")
        cityErrorMsg.textContent = "Veuillez entrer une ville valide"
        return true
    }
    return false
}

// Création des éléments requis pour le formulaire

function makeRequestBody() {

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: cartArray.map((item) => item.id)
    }
    return body
}

//CART_PRICE

//Calcul de la quantité totale des articles sélectionés

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cartArray.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

//Calcul du prix total des articles sélectionnés

function displayTotalPrice(item, prevQuantity = 0) {
    const totalPrice = document.querySelector("#totalPrice")
    const total = (parseInt(totalPrice.textContent) ? parseInt(totalPrice.textContent) : 0) - (prevQuantity * item.price) + (item.quantity * item.price)
    totalPrice.textContent = total
}

function newDisplayTotalPrice(item, prevQuantity = 0) {
    const diff = item.quantity - prevQuantity
    const totalPrice = document.querySelector("#totalPrice")
    const total = (parseInt(totalPrice.textContent) ? parseInt(totalPrice.textContent) : 0) + (diff * item.price)
    totalPrice.textContent = total
    location.reload()
}



