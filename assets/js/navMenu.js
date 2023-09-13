const menuIcon = document.querySelector(".menuIcon");
const navMenu = document.querySelector(".navMenu");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("activated");
    navMenu.classList.toggle("activated");
});

document.querySelectorAll(".navLink").forEach((n) =>
    n.addEventListener("click", () => {
        menuIcon.classList.remove("activated");
        navMenu.classList.remove("activated");
    })
);
