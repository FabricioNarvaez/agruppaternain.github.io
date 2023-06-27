const cookieMessage = document.getElementById("cookieMessage");
const acceptCookiesBtn = document.getElementById("acceptCookies");

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

function checkCookie() {
    const cookieAccepted = getCookie("cookieAccepted");
    if (!cookieAccepted) {
        cookieMessage.classList.remove("hidden");
    }
}

acceptCookiesBtn.addEventListener("click", () => {
    setCookie("cookieAccepted", true, 30);
    cookieMessage.style.display = "none";
});

window.addEventListener("load", () => {
    checkCookie();
});
