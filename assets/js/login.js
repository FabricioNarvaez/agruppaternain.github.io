const urlLogin = `http://localhost:3900/login`;
const email = "***";
const password = "***";

fetch(urlLogin, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
})
.then(response => {
    if (!response.ok) {
        const errorElement = document.createElement('p');
        errorElement.textContent = 'Usuario o contraseña incorrectos.';
        const loginForm = document.getElementById('login-form');
        loginForm.appendChild(errorElement);
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('There was a problem with the fetch operation:', error));
