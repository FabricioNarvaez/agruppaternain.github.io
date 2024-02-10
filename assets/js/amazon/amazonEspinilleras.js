import { amazonProducts } from "./amazonProducts.js";
import { loadAmazonNavButtons } from "./amazonCommon.js";

const amazonProductCollection = document.querySelector(".amazonProductCollection");

loadAmazonNavButtons(amazonProducts);

// for(let i = 0; i< Object.keys(amazonProducts[0].content).length ; i++){
//     const product = amazonProducts[0].content[i];

//     const navElement = document.createElement("a");
//     navElement.setAttribute("href", `amazon/${amazonProducts[0].file}.html`);
//     navElement.innerHTML = section.category;
//     amazonNavButtons.appendChild(navElement);

//     const productLinkContainer =  document.createElement("a");
//     productLinkContainer.setAttribute("target", "_black");
//     productLinkContainer.classList.add("amazonProduct");

//     const productImg = document.createElement("img");
//     productImg.setAttribute("src", product.image);
//     productImg.setAttribute("alt", product.name);
//     productImg.setAttribute("title", product.name);
//     productImg.classList.add("amazonProductImg");
//     productLinkContainer.appendChild(productImg);

//     const amazonProductDescription = document.createElement("div");
//     amazonProductDescription.classList.add("amazonProductDescription");

//     const productTitle = document.createElement("h3");
//     productTitle.classList.add("amazonProductTitle");
//     productTitle.innerHTML = product.name;
//     amazonProductDescription.appendChild(productTitle);

//     const productSubtitle = document.createElement("h4");
//     productSubtitle.classList.add("amazonProductSubtitle");
//     productSubtitle.innerHTML = "Acerca de este producto";
//     amazonProductDescription.appendChild(productSubtitle);

//     const ul = document.createElement("ul");
//     for(let i = 1 ; i <= Object.keys(product.about).length; i++){
//         const li = document.createElement("li");
//         li.innerHTML = product.about[i];
//         ul.appendChild(li);
//     }
//     amazonProductDescription.appendChild(ul);

//     const price = document.createElement("p");
//     price.classList.add("amazonPrice");
//     price.innerHTML = `<b>price: <i>${product.price}</i></b>`;
//     amazonProductDescription.appendChild(price);

//     const button = document.createElement("button");
//     button.textContent = "Ver más";
//     button.style.display =  "block";
//     button.style.marginBottom =  "10px";
//     amazonProductDescription.appendChild(button);

//     const imgAmazonLogo = document.createElement("img");
//     imgAmazonLogo.setAttribute("src", "../assets/img/svg/Amazon_logo.svg");
//     imgAmazonLogo.setAttribute("alt", "Amazon");
//     imgAmazonLogo.setAttribute("title", "Amazon");
//     imgAmazonLogo.style.width = "90px";
//     amazonProductDescription.appendChild(imgAmazonLogo);

//     productLinkContainer.appendChild(amazonProductDescription);
//     amazonProductCollection.appendChild(productLinkContainer);
// };