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
    let row = document.createElement("tr");

    let celdaPos = document.createElement("td");
    let pos = index + 1;
    if(pos === 1){
        celdaPos.style.background = "url(https://e00-marca.uecdn.es/assets/v31/img/estaticas/trofeos/first-mobile.svg) no-repeat center center";
        celdaPos.style.backgroundSize = "auto 100%";
    }else{
        celdaPos.textContent = pos;
    }
    row.appendChild(celdaPos);

    let celdaPlayer = document.createElement("td");
    celdaPlayer.textContent = scorer.name;
    row.appendChild(celdaPlayer);

    let celdaTeam = document.createElement("td");
    celdaTeam.textContent = scorer.team;
    row.appendChild(celdaTeam);

    let celdaGoals = document.createElement("td");
    celdaGoals.textContent = scorer.goals;
    celdaGoals.style.fontWeight = "bold";
    celdaGoals.style.color = "white";
    celdaGoals.style.backgroundColor = "#818181";
    row.appendChild(celdaGoals);

    scorrersTable.appendChild(row);
});
