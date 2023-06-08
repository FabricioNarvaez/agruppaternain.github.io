import { url } from "./url.js";
import { checkCookies } from "./common.js";

const urlLogin = `${url}login`;
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
    let cookiesAcepted = checkCookies("cookieAccepted=");
    const error = document.getElementById("credentials-error");
    const errorMessage = document.getElementById("error-message");

    if (!cookiesAcepted) {
        error.classList.remove("hidden");
        errorMessage.innerHTML = "No se han aceptado las cookies. Las cookies son necesarias para el correcto funcionamiento de esta sección.";
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
                    window.location.href = "admin.html";
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
