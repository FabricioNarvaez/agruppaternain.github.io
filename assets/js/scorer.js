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

    const positionField = document.createElement("td");
    const pos = index + 1;
    if(pos === 1){
        positionField.style.background = "url(https://e00-marca.uecdn.es/assets/v31/img/estaticas/trofeos/first-mobile.svg) no-repeat center center";
        positionField.style.backgroundSize = "auto 100%";
    }else{
        positionField.textContent = pos;
    }
    row.appendChild(positionField);

    const playerField = document.createElement("td");
    playerField.textContent = scorer.name;
    row.appendChild(playerField);

    const teamField = document.createElement("td");
    teamField.textContent = scorer.team;
    row.appendChild(teamField);

    const goalsField = document.createElement("td");
    goalsField.textContent = scorer.goals;
    goalsField.classList.add("lastColumnRows");
    row.appendChild(goalsField);

    scorrersTable.appendChild(row);
});
