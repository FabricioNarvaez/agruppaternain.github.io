import { url } from "./url.js";
import { checkCookies } from "./common.js";


const adminContainer = document.getElementById("adminContainer");
const adminLoader = document.getElementById("adminLoader");
const urlToken = `${url}token`;
let token = checkCookies("token=");

fetch(urlToken, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
})
    .then((response) => {
        if (!response.ok) {
            window.location.href = "login.html";
        } else {
            adminContainer.classList.remove("hidden");
            adminLoader.remove();
            return response.json();
        }
    })
    .catch((error) =>
        console.error("There was an error with the request:", error)
    );
