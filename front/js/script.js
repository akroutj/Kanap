
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
        const articleProduct = document.createElement("article")

        const image = makeImage(curr.imageUrl, curr.altTxt)
        const title = makeTitle(curr.name)
        const paragraph = makeParagraph(curr.description)

        items.appendChild(linkProduct)
        linkProduct.appendChild(articleProduct)
        appendArticleProduct(articleProduct, image, title, paragraph)
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

function appendArticleProduct(articleProduct, image, title, paragraph) {
    articleProduct.appendChild(image)
    articleProduct.appendChild(title)
    articleProduct.appendChild(paragraph)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeTitle(name) {
    const title = document.createElement("h3")
    title.textContent = name
    return title
}

function makeParagraph(description) {
    const paragraph = document.createElement("p")
    paragraph.textContent = description
    return paragraph
}











