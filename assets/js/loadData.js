import { url } from './url.js';

(async ()=> {
    const response = await fetch(`${url}/api/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();

    const selectLocalA = document.getElementById('opcionesLocalA');
    const selectVisitanteA = document.getElementById('opcionesVisitanteA');
    console.log(teamsGroupA);
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