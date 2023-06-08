import { url } from './url.js';
const urlToken = `${url}token`;

const cookies = document.cookie.split(";");
let token;

for (let cookie of cookies) {
  const cookieTrimed = cookie.trim();
  if (cookieTrimed.startsWith("token=")) {
    token = cookieTrimed.substring("token=".length, cookieTrimed.length);
  }
}

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