function createRow(team, index){
    let row = document.createElement("tr");

    let celdaPos = document.createElement("td");
    celdaPos.textContent = index + 1;
    row.appendChild(celdaPos);

    let celdaTeam = document.createElement("td");
    celdaTeam.textContent = team.team;
    row.appendChild(celdaTeam);

    let celdaPJ = document.createElement("td");
    celdaPJ.textContent = team.PJ;
    row.appendChild(celdaPJ);
    
    let celdaPG = document.createElement("td");
    celdaPG.textContent = team.PG;
    row.appendChild(celdaPG);

    let celdaPE = document.createElement("td");
    celdaPE.textContent = team.PE;
    row.appendChild(celdaPE);
    
    let celdaPP = document.createElement("td");
    celdaPP.textContent = team.PP;
    row.appendChild(celdaPP);

    let celdaGF = document.createElement("td");
    celdaGF.textContent = team.GF;
    row.appendChild(celdaGF);
    
    let celdaGC = document.createElement("td");
    celdaGC.textContent = team.GC;
    row.appendChild(celdaGC);

    let celdaGD = document.createElement("td");
    celdaGD.textContent = team.GD;
    celdaGD.style.fontWeight = "bold";
    if(team.GD > 0){
      celdaGD.style.color = "green";
    }else if(team.GD < 0){
      celdaGD.style.color = "red";
    }
    row.appendChild(celdaGD);

    let celdaPuntos = document.createElement("td");
    celdaPuntos.textContent = team.Pts;
    celdaPuntos.style.fontWeight = "bold";
    row.appendChild(celdaPuntos);

    return row;
}

export function processGroupA(team, index) {
    let bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index));
};

export function processGroupB(team, index) {
    let bodyTableB = document.getElementById("groupB");
    bodyTableB.appendChild(createRow(team, index));
};

export function calculatePointsGoalsMatches(team){
    let puntos = team.PG * 3;
    team.Pts = team.PE ? (puntos + team.PE) : puntos;

    let gd = team.GF - team.GC;
    team.GD = gd > 0 ? `+${gd}` : gd;

    team.PJ = team.PG + team.PE + team.PP;
}

export function sortByPointsAndGoals(a, b) {
    if (a.Pts > b.Pts) {
      return -1;
    } else if (a.Pts < b.Pts) {
      return 1;
    } else {
      if (a.GD > b.GD) {
        return -1;
      } else if (a.GD < b.GD) {
        return 1;
      } else {
        return 0;
      }
    }
}