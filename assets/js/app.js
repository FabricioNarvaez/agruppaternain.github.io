let groupA = [
  { team: "Los Panas",      PJ: 0, PG: 2, PE: 0, PP: 0, GF: 16, GC: 4,  GD: 0, Pts: 0 },
  { team: "Peñarol",        PJ: 0, PG: 1, PE: 0, PP: 1, GF: 6,  GC: 7,  GD: 0, Pts: 0 },
  { team: "Comboloco",      PJ: 0, PG: 1, PE: 0, PP: 0, GF: 5,  GC: 0,  GD: 0, Pts: 0 },
  { team: "Los Rumberos",   PJ: 0, PG: 0, PE: 0, PP: 2, GF: 0,  GC: 15, GD: 0, Pts: 0 },
  { team: "Latin Brothers", PJ: 0, PG: 1, PE: 0, PP: 0, GF: 6,  GC: 0,  GD: 0, Pts: 0 },
  { team: "Golden",         PJ: 0, PG: 0, PE: 0, PP: 2, GF: 1,  GC: 8,  GD: 0, Pts: 0 }
];

let grupoB = [
  { team: "Impersiva",      PJ: 0, PG: 1, PE: 0, PP: 1, GF: 4,  GC: 5,  GD: 0, Pts: 0 },
  { team: "Estella",        PJ: 0, PG: 0, PE: 1, PP: 1, GF: 2,  GC: 3,  GD: 0, Pts: 0 },
  { team: "Cancheritos",    PJ: 0, PG: 0, PE: 1, PP: 1, GF: 1,  GC: 6,  GD: 0, Pts: 0 },
  { team: "El Valle",       PJ: 0, PG: 1, PE: 0, PP: 1, GF: 7,  GC: 3,  GD: 0, Pts: 0 },
  { team: "Spencer",        PJ: 0, PG: 2, PE: 0, PP: 0, GF: 8,  GC: 3,  GD: 0, Pts: 0 },
  { team: "Amistad",        PJ: 0, PG: 1, PE: 0, PP: 1, GF: 4,  GC: 6,  GD: 0, Pts: 0 }
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

function processGroupA(team, index) {
    let bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index));
};

function processGroupB(team, index) {
    let bodyTableB = document.getElementById("groupB");
    bodyTableB.appendChild(createRow(team, index));
};

function calculatePointsGoalsMatches(team){
    let puntos = team.PG * 3;
    team.Pts = team.PE ? (puntos + team.PE) : puntos;

    let gd = team.GF - team.GC;
    team.GD = gd > 0 ? `+${gd}` : gd;

    team.PJ = team.PG + team.PE + team.PP;
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

groupA.forEach(calculatePointsGoalsMatches);
groupA.sort(sortByPointsAndGoals);
groupA.forEach(processGroupA);

grupoB.forEach(calculatePointsGoalsMatches);
grupoB.sort(sortByPointsAndGoals);
grupoB.forEach(processGroupB);