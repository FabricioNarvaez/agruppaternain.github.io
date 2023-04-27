import { appendField } from "./common.js";
import { sortByGoals } from "./common.js";

const scorers = [
    { team: "Peñarol", name: "Rhuan Gomez", goals: 9 },
    { team: "Panas", name: "Ronis Benitez", goals: 10 },
    { team: "Los Panas", name: "Andres Guerrero", goals: 6 },
    { team: "El Valle", name: "Joel Villena", goals: 5 },
    { team: "Comboloco", name: "Yesid Salcedo", goals: 4 },
];

scorers.sort(sortByGoals);
scorers.forEach((scorer, index) => {
    const scorrersTable = document.getElementById("scorersTable");
    const row = document.createElement("tr");

    const positionField = document.createElement("td");
    const pos = index + 1;
    if(pos === 1){
        positionField.style.background = "url(https://e00-marca.uecdn.es/assets/v31/img/estaticas/trofeos/first-mobile.svg) no-repeat center center";
        positionField.style.backgroundSize = "auto 100%";
    }else{
        positionField.textContent = pos;
    }
    row.appendChild(positionField);

    row.appendChild(appendField(scorer.name));
    row.appendChild(appendField(scorer.team));
    row.appendChild(appendField(scorer.goals));
    row.children[3].classList.add("lastColumnRows");

    scorrersTable.appendChild(row);
});
