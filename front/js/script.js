
// Mise en place de Fletch - Récupération des données de l'API par ID

const getProducts = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            addProducts(data)
        })
}

// Appel de la fonction getProducts (récupération des données)

getProducts();

// Création d'une boucle pour l'affichage des produits (appel des fonctions)

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

// Création du lien de la carte produit par ID

function makeLink(id) {
    const linkProduct = document.createElement("a")
    linkProduct.href = "./product.html?id=" + id
    return linkProduct
}

// Rattachement du lien produit à items

function appendChildren(linkProduct) {
    const items = document.querySelector("#items")
    items.appendChild(linkProduct)

}

// Rattachement des éléments enfants à l'article

function appendArticleProduct(articleProduct, image, title, paragraph) {
    articleProduct.appendChild(image)
    articleProduct.appendChild(title)
    articleProduct.appendChild(paragraph)
}

// Création de l'image

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// Création d'un titre pour le produit

function makeTitle(name) {
    const title = document.createElement("h3")
    title.textContent = name
    return title
}

// Création de la description du produit

function makeParagraph(description) {
    const paragraph = document.createElement("p")
    paragraph.textContent = description
    return paragraph
}











