import { url } from './url.js';
const urlToken = `${url}/token`;

const cookies = document.cookie.split(";");
let token = null;

for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith("token=")) {
    token = cookie.substring("token=".length, cookie.length);
    fetch(urlToken, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then((response) => {
        if (!response.ok) {
            window.location.href = "login.html";
        }else{
            return response.json();
        }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error('There was an error with the request:', error));
  }else{
    window.location.href = "login.html";
  }
}