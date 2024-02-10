const amazonNavButtons = document.querySelector(".amazonNavButtons");

function loadAmazonNavButtons(amazonProducts){
    for(let category of amazonProducts){
        const navElement = document.createElement("a");
        navElement.setAttribute("href", `amazonPages/${category.file}.html`);
        navElement.innerHTML = category.category;
        amazonNavButtons.appendChild(navElement);
    }
}

export {loadAmazonNavButtons};