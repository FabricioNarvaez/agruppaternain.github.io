import { amazonProducts } from "./amazonProducts.js";

const amazonProductCollection = document.querySelector(".amazonProductCollection");
let productLinkContainer;
for(let i = 0; i<1 ; i++){
    const amazonCollection = Object.values(amazonProducts);
    const numKeys = Object.keys(amazonProducts).length;
    const randomIndex = Math.floor(Math.random() * numKeys) + 1;
    const section = amazonCollection[i];
    const randomProduct = section[randomIndex];

    productLinkContainer =  document.createElement("a");
    productLinkContainer.setAttribute("target", "_black");
    productLinkContainer.classList.add("amazonProduct");

    const productImg = document.createElement("img");
    productImg.setAttribute("src", randomProduct.imagen);
    productImg.setAttribute("alt", randomProduct.nombre);
    productImg.setAttribute("title", randomProduct.nombre);
    productLinkContainer.appendChild(productImg);

    const amazonProductDescription = document.createElement("div");
    amazonProductDescription.classList.add("amazonProductDescription");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("amazonProductTitle");
    productTitle.innerHTML = randomProduct.nombre;
    amazonProductDescription.appendChild(productTitle);

    const productSubtitle = document.createElement("h4");
    productSubtitle.classList.add("amazonProductSubtitle");
    productSubtitle.innerHTML = "Acerca de este producto";
    amazonProductDescription.appendChild(productSubtitle);

    const ul = document.createElement("ul");
    for(let i = 1 ; i <= Object.keys(randomProduct.acercaDe).length; i++){
        const li = document.createElement("li");
        li.innerHTML = randomProduct.acercaDe[i];
        ul.appendChild(li);
    }
    amazonProductDescription.appendChild(ul);

    const price = document.createElement("p");
    price.classList.add("amazonPrice");
    price.innerHTML = `<b>Precio: <i>${randomProduct.precio}</i></b>`;
    amazonProductDescription.appendChild(price);

    const button = document.createElement("button");
    button.textContent = "Ver más";
    amazonProductDescription.appendChild(button);

    productLinkContainer.appendChild(amazonProductDescription);
}

amazonProductCollection.appendChild(productLinkContainer);
// let row = document.createElement("h2");
// row.innerHTML = "test"
// amazonProductCollection.appendChild(row)