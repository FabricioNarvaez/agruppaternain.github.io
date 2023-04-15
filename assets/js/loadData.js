import { url } from './url.js';

(async ()=> {
    const response = await fetch(`${url}/api/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();

    const selectLocalA = document.getElementById('opcionesLocalA');
    const selectVisitanteA = document.getElementById('opcionesVisitanteA');
    teamsGroupA.forEach(team => {
        const option = document.createElement('option');
        option.value = team._id;
        option.textContent = team.team;
        selectLocalA.appendChild(option);
        selectVisitanteA.appendChild(option.cloneNode(true));
    });

    const selectLocalB = document.getElementById('opcionesLocalB');
    const selectVisitanteB = document.getElementById('opcionesVisitanteB');
    teamsGroupB.forEach(team => {
        const option = document.createElement('option');
        option.value = team._id;
        option.textContent = team.team;
        selectLocalB.appendChild(option);
        selectVisitanteB.appendChild(option.cloneNode(true));
    });
})();

function checkResponse(dataLocal, dataVisitante){
    if(dataLocal.status === "Updated" && dataVisitante.status === "Updated"){
        alert("Resultados actualizados");
        location.reload()
    }
}

const sendButton = document.getElementById('send');
sendButton.addEventListener('click', async () => {
    const error = document.getElementById("error-id");
    if (error) {
        error.remove();
    }
    const localA = document.getElementById('opcionesLocalA').value;
    const visitanteA = document.getElementById('opcionesVisitanteA').value;
    const localB = document.getElementById('opcionesLocalB').value;
    const visitanteB = document.getElementById('opcionesVisitanteB').value;
    const goalsLocalA = document.getElementById('goalsLocalA').value;
    const goalsVisitanteA = document.getElementById('goalsVisitanteA').value;
    const goalsLocalB = document.getElementById('goalsLocalB').value;
    const goalsVisitanteB = document.getElementById('goalsVisitanteB').value;

    if(localA === "" || visitanteA === "" || localB === "" || visitanteB === "" || goalsLocalA === "" || goalsVisitanteA === "" || goalsLocalB === "" || goalsVisitanteB === "" ||
    localA === visitanteA || localB === visitanteB){
        const errorElement = document.createElement("p");
        errorElement.id = "error-id";
        errorElement.textContent = "Faltan datos o no son correctos. Compruebe que ha introducido todos los datos y que son correctos.";
        errorElement.style.color = "red";
        const error = document.getElementById("data-error");
        error.appendChild(errorElement);
        return;
    }else{
        if(goalsLocalA === goalsVisitanteA){
            const putDraw = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    PE: 1,
                    GF: goalsLocalA,
                    GC: goalsVisitanteA,
                })
            }
            const responseLocal = await fetch(`${url}/api/team/a/${localA}`, putDraw);
            const dataLocal = await responseLocal.json();
            const responseVisitante = await fetch(`${url}/api/team/a/${visitanteA}`, putDraw);
            const dataVisitante = await responseVisitante.json();
            checkResponse(dataLocal, dataVisitante);
        }else if(goalsLocalA > goalsVisitanteA){
            const responseLocal = await fetch(`${url}/api/team/a/${localA}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    PG: 1,
                    GF: goalsLocalA,
                    GC: goalsVisitanteA,
                })
            });
            const dataLocal = await responseLocal.json();
            const responseVisitante = await fetch(`${url}/api/team/a/${visitanteA}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    PP: 1,
                    GF: goalsVisitanteA,
                    GC: goalsLocalA,
                })
            });
            const dataVisitante = await responseVisitante.json();
            checkResponse(dataLocal, dataVisitante);
        }
        
    }
});