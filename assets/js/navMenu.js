const menuIcon = document.querySelector(".menuIcon");
const navMenu = document.querySelector(".nav-menu");

menuIcon.addEventListener("click", ()=>{
    menuIcon.classList.toggle("activated");
    navMenu.classList.toggle("activated");
})