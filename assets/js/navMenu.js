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

window.onscroll = function () {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById("topButton").style.display = "block";
    } else {
        document.getElementById("topButton").style.display = "none";
    }
};

document.getElementById("topButton").onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};
