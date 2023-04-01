const urlApi = 'http://localhost:3900/api';

async function connectApiAndLoadData() {
    const response = await fetch(`${urlApi}/teams`);
    const {teams} = await response.json();
    console.log("La conexión con la API se ha realizado correctamente");
    console.log(teams);
}

connectApiAndLoadData();