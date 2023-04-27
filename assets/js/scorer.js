const scorers = [
    { team: "Peñarol", name: "Rhuan Gomez", goals: 9 },
    { team: "Panas", name: "Ronis Benitez", goals: 10 },
    { team: "Los Panas", name: "Andres Guerrero", goals: 6 },
    { team: "El Valle", name: "Joel Villena", goals: 5 },
    { team: "Comboloco", name: "Yesid Salcedo", goals: 4 },
];

function sortByGoals(a, b){
    if(a.goals > b.goals){
        return -1;
    }else if(a.goals < b.goals){
        return 1;
    }else{
        return 0;
    }
}

scorers.sort(sortByGoals);
scorers.forEach((scorer, index) => {
    const scorrersTable = document.getElementById("scorersTable");
    const row = document.createElement("tr");

    const celdaPos = document.createElement("td");
    const pos = index + 1;
    if(pos === 1){
        celdaPos.style.background = "url(https://e00-marca.uecdn.es/assets/v31/img/estaticas/trofeos/first-mobile.svg) no-repeat center center";
        celdaPos.style.backgroundSize = "auto 100%";
    }else{
        celdaPos.textContent = pos;
    }
    row.appendChild(celdaPos);

    const celdaPlayer = document.createElement("td");
    celdaPlayer.textContent = scorer.name;
    row.appendChild(celdaPlayer);

    const celdaTeam = document.createElement("td");
    celdaTeam.textContent = scorer.team;
    row.appendChild(celdaTeam);

    const goalsField = document.createElement("td");
    goalsField.textContent = scorer.goals;
    goalsField.classList.add("lastColumnRows");
    row.appendChild(goalsField);

    scorrersTable.appendChild(row);
});
