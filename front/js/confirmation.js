
// Recupération de l'orderID dans le local Storage

const orderId = localStorage.getItem("orderID")

// Affichage de l'orderID dans la page

displayOrderId()

// Création de l'orderID et suppréssion dans le localStorage

function displayOrderId() {
    const divOrderId = document.querySelector("#orderId")
    divOrderId.textContent = orderId
    localStorage.clear()
}