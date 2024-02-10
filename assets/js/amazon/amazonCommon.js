const amazonNavButtons = document.querySelector(".amazonNavButtons");

function loadAmazonNavButtons(amazonProducts, folder){
    for(let category of amazonProducts){
        const navElement = document.createElement("a");
        navElement.setAttribute("href", `${folder}${category.file}.html`);
        navElement.setAttribute("title", `Link a página de ${category.category}`);
        navElement.innerHTML = category.category;
        amazonNavButtons.appendChild(navElement);
    }
}

export {loadAmazonNavButtons};