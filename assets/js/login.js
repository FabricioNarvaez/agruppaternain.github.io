import { url } from "./url.js";
import { checkCookies } from "./common.js";

const urlLogin = `${url}login`;
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {
    let cookiesAcepted = checkCookies("cookieAccepted=");
    const error = document.getElementById("credentialsError");
    const errorMessage = document.getElementById("errorMessage");

    if (!cookiesAcepted || cookiesAcepted === "false") {
        error.classList.remove("hidden");
        errorMessage.innerHTML =
            "No se han aceptado las cookies. Las cookies son necesarias para el correcto funcionamiento de esta sección.";
    } else {
        error.classList.add("hidden");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(urlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => {
            if (!response.ok) {
                error.classList.remove("hidden");
                errorMessage.innerHTML = "Email o contraseña incorrectos.";
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data) {
                document.cookie = `token=${data.token}; path=/;`;
                window.location.href = "admin";
            }
        })
        .catch((error) =>
            console.error(
                "There was a problem with the fetch operation:",
                error
            )
        );
    }
});
