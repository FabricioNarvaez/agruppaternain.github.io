import { url } from "./url.js";
import { checkCookies } from "./common.js";

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
            return response.json();
        }
    })
    .then((data) => console.log(data))
    .catch((error) =>
        console.error("There was an error with the request:", error)
    );
