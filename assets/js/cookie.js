const cookieMessage = document.getElementById("cookieMessage");
const acceptCookiesBtn = document.getElementById("acceptCookies");
const rejectCookiesBtn = document.getElementById("rejectCookies");

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
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-D7JDWVS6PW";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-D7JDWVS6PW");
    };
    cookieMessage.style.display = "none";
});

rejectCookiesBtn.addEventListener("click", () => {
    setCookie("cookieAccepted", false, 30);
    cookieMessage.style.display = "none";
});

window.addEventListener("load", () => {
    checkCookie();
});
