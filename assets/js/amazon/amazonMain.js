import { amazonProducts } from "./amazonProducts.js";
import { loadAmazonNavButtons } from "./amazonCommon.js";

const amazonProductCollection = document.querySelector(".amazonProductCollection");

loadAmazonNavButtons(amazonProducts, "amazonPages/");

for(let i = 0; i< amazonProducts.length ; i++){
    const numKeys = Object.keys(amazonProducts[i].content).length;
    const randomIndex = Math.floor(Math.random() * numKeys) + 1;
    const section = amazonProducts[i];
    const randomProduct = section.content[randomIndex];

    const productLinkContainer =  document.createElement("a");
    productLinkContainer.setAttribute("target", "_black");
    productLinkContainer.setAttribute("href", randomProduct.url);
    productLinkContainer.classList.add("amazonProduct");

    const productImg = document.createElement("img");
    productImg.setAttribute("src", randomProduct.image);
    productImg.setAttribute("alt", randomProduct.name);
    productImg.setAttribute("title", randomProduct.name);
    productImg.classList.add("amazonProductImg");
    productLinkContainer.appendChild(productImg);

    const amazonProductDescription = document.createElement("div");
    amazonProductDescription.classList.add("amazonProductDescription");

    const productTitle = document.createElement("h3");
    productTitle.classList.add("amazonProductTitle");
    productTitle.innerHTML = randomProduct.name;
    amazonProductDescription.appendChild(productTitle);

    const productSubtitle = document.createElement("h4");
    productSubtitle.classList.add("amazonProductSubtitle");
    productSubtitle.innerHTML = "Acerca de este producto";
    amazonProductDescription.appendChild(productSubtitle);

    const ul = document.createElement("ul");
    for(let i = 1 ; i <= Object.keys(randomProduct.about).length; i++){
        const li = document.createElement("li");
        li.innerHTML = randomProduct.about[i];
        ul.appendChild(li);
    }
    amazonProductDescription.appendChild(ul);

    const price = document.createElement("p");
    price.classList.add("amazonPrice");
    price.innerHTML = `<b>Precio: <i>${randomProduct.price}</i></b>`;
    amazonProductDescription.appendChild(price);

    const button = document.createElement("button");
    button.textContent = "Ver más";
    button.style.display =  "block";
    button.style.marginBottom =  "10px";
    amazonProductDescription.appendChild(button);

    const imgAmazonLogo = document.createElement("img");
    imgAmazonLogo.setAttribute("src", "assets/img/svg/Amazon_logo.svg");
    imgAmazonLogo.setAttribute("alt", "Amazon");
    imgAmazonLogo.setAttribute("title", "Amazon");
    imgAmazonLogo.style.width = "90px";
    amazonProductDescription.appendChild(imgAmazonLogo);

    productLinkContainer.appendChild(amazonProductDescription);
    amazonProductCollection.appendChild(productLinkContainer);
};