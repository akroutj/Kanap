

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
        const articleProduct = makeArticle()
        const image = makeImage()
        const title = makeTitle()
        const paragraph = makeParagraph()


        appendChildren(linkProduct)
        linkProduct.appendChild(articleProduct)
        articleProduct.appendChild(image)
        articleProduct.appendChild(title)
        articleProduct.appendChild(paragraph)
    }
}

function makeLink(id) {
    const linkProduct = document.createElement("a")
    linkProduct.href = "./product.html?id=" + id
    return linkProduct
}

function appendChildren(linkProduct) {
    const items = document.querySelector("#items")
    items.appendChild(linkProduct)

}

function makeArticle() {
    const article = document.createElement("article")
    return article
}

function makeImage() {
    const image = document.createElement("img")
    return image
}

function makeTitle(h3) {
    const title = document.createElement("h3")
    title.textContent = "TITRE"
    return title
}

function makeParagraph(p) {
    const paragraph = document.createElement("p")
    paragraph.textContent = "paragraph"
    return paragraph
}










