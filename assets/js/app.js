let groupA = [
  { team: "Los Panas", PJ: 10, PG: 8, PE: 1, PP: 3, GF: 10, GC: 5, GD: 0, Pts: 0 },
  { team: "Peñarol", PJ: 10, PG: 7, PE: 1, PP: 3, GF: 8, GC: 5, GD: 0, Pts: 0 },
  { team: "Comboloco", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "Los Rumberos", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "Latin Brothers", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "Golden", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 }
];

let grupoB = [
  { team: "Impersiva", PJ: 10, PG: 8, PE: 1, PP: 3, GF: 10, GC: 5, GD: 0, Pts: 0 },
  { team: "Estella", PJ: 10, PG: 7, PE: 1, PP: 3, GF: 8, GC: 5, GD: 0, Pts: 0 },
  { team: "Cancheritos", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "El Valle", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "Spencer", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 },
  { team: "Amistad", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 }
];

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
    celdaGC.textContent = team.PG;
    row.appendChild(celdaGC);

    let celdaGD = document.createElement("td");
    celdaGD.textContent = team.GD;
    row.appendChild(celdaGD);

    let celdaPuntos = document.createElement("td");
    celdaPuntos.textContent = team.Pts;
    row.appendChild(celdaPuntos);

    return row;
}

function processGroupA(team, index) {
    let bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index));
};

function processGroupB(team, index) {
    let bodyTableB = document.getElementById("groupB");
    bodyTableB.appendChild(createRow(team, index));
};

function calculatePoints(team){
    let puntos = team.PG * 3;
    if(team.PE){
        puntos += team.PE;
    }
    team.Pts = puntos;

    let gd = team.GF - team.GC;
    team.GD = gd > 0 ? `+${gd}` : gd;
}

function sortByPointsAndGoals(a, b) {
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

groupA.forEach(calculatePoints);
groupA.sort(sortByPointsAndGoals);
groupA.forEach(processGroupA);

grupoB.forEach(calculatePoints);
grupoB.sort(sortByPointsAndGoals);
grupoB.forEach(processGroupB);