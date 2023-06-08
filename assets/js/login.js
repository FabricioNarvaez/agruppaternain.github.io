import { url } from "./url.js";
import { checkCookies } from './common.js';

const urlLogin = `${url}login`;
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
    let cookiesAcepted = checkCookies("cookieAccepted=");
    const error = document.getElementById("error-id");
    
    if (error) {
        error.remove();
    }
    if (!cookiesAcepted) {
        const errorElement = document.createElement("p");
        errorElement.id = "error-id";
        errorElement.textContent = "No se han aceptado las cookies. Las cookies son necesarias para el correcto funcionamiento de esta sección.";
        const error = document.getElementById("credentials-error");
        errorElement.style.color = "red";
        error.appendChild(errorElement);
    } else {
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
                    const errorElement = document.createElement("p");
                    errorElement.id = "error-id";
                    errorElement.textContent = "Email o contraseña incorrectos.";
                    const error = document.getElementById("credentials-error");
                    errorElement.style.color = "red";
                    error.appendChild(errorElement);
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
