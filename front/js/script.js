

// Mise en place de Fletch
const getProducts = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            addProducts(data)
        })
}

getProducts();

function addProducts(data) {
    for (let curr of data) {
        const linkProduct = makeLink(curr._id)
        appendChildren(linkProduct)
        makeArticle()

    }
}

function makeLink(id) {
    const linkProduct = document.createElement("a")
    linkProduct.href = "./product.html?id=" + id
    linkProduct.textContent = "Canapé"
    return linkProduct
}

function appendChildren(linkProduct, article) {
    const items = document.querySelector("#items")
    items.appendChild(linkProduct)

}

function makeArticle() {
    const article = document.createElement("article")
    article.textContent = "Coin coin"
    items.appendChild(article)
    return article
}









