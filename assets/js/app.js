const groupA = [
  { team: "Los Panas",      PG: 4, PE: 0, PP: 0, GF: 23,  GC: 6, lastPos: 1},
  { team: "Peñarol",        PG: 2, PE: 0, PP: 3, GF: 21,  GC: 21, lastPos: 3},
  { team: "Comboloco",      PG: 4, PE: 0, PP: 0, GF: 22,  GC: 3, lastPos: 2},
  { team: "Los Rumberos",   PG: 1, PE: 0, PP: 3, GF: 13,  GC: 26, lastPos: 5},
  { team: "Latin Brothers", PG: 2, PE: 0, PP: 2, GF: 14,   GC: 10, lastPos: 4},
  { team: "Golden",         PG: 0, PE: 0, PP: 5, GF: 2,   GC: 30, lastPos: 6}
];

const grupoB = [
  { team: "Impersiva",      PG: 2, PE: 0, PP: 3, GF: 9,   GC: 14, lastPos: 4},
  { team: "Estella",        PG: 0, PE: 2, PP: 3, GF: 5,   GC: 10, lastPos: 5},
  { team: "Cancheritos",    PG: 0, PE: 1, PP: 4, GF: 7,   GC: 16, lastPos: 6},
  { team: "El Valle",       PG: 3, PE: 0, PP: 2, GF: 15,  GC: 8, lastPos: 3},
  { team: "Spencer",        PG: 4, PE: 1, PP: 0, GF: 15,   GC: 7, lastPos: 1},
  { team: "Amistad",        PG: 4, PE: 0, PP: 1, GF: 13,   GC: 9, lastPos: 2}
];

function createRow(team, index){
    const row = document.createElement("tr");

    const celdaPos = document.createElement("td");
    const pos = index + 1;
    if(pos <= 2){
      celdaPos.style.borderLeft = "4px solid";
      celdaPos.style.borderLeftColor = "#0b95dd";
    }
    celdaPos.textContent = pos;
    row.appendChild(celdaPos);

    const celdaTeam = document.createElement("td");
    celdaTeam.style.width = "280px";
    const difPos = team.lastPos - pos;
    const leftText = document.createElement("span");
    leftText.textContent = team.team;
    leftText.style.display = "inline-block";
    leftText.style.width = "50%";
    leftText.style.textAlign = "left";

    const rightText = document.createElement("span");
    const triangle = document.createElement("span");
    triangle.style.display = "inline-block";
    triangle.style.width = "0";
    triangle.style.height = "0";
    triangle.style.borderLeft = "5px solid transparent";
    triangle.style.borderRight = "5px solid transparent";
    triangle.style.marginRight = "5px";
    const difPosSpan = document.createElement("span");
    difPosSpan.style.marginRight = "5px";
    if(difPos < 0){
      triangle.style.borderTop = "5px solid red";
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "red";
    }else if(difPos > 0){
      triangle.style.borderBottom = "5px solid green";
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "green";
    }
    rightText.appendChild(triangle);
    rightText.appendChild(difPosSpan);
    rightText.style.display = "inline-block";
    rightText.style.width = "50%";
    rightText.style.textAlign = "right";
    celdaTeam.appendChild(leftText);
    celdaTeam.appendChild(rightText);
    row.appendChild(celdaTeam);

    const celdaPJ = document.createElement("td");
    celdaPJ.textContent = team.PJ;
    row.appendChild(celdaPJ);
    
    const celdaPG = document.createElement("td");
    celdaPG.textContent = team.PG;
    row.appendChild(celdaPG);

    const celdaPE = document.createElement("td");
    celdaPE.textContent = team.PE;
    row.appendChild(celdaPE);
    
    const celdaPP = document.createElement("td");
    celdaPP.textContent = team.PP;
    row.appendChild(celdaPP);

    const celdaGF = document.createElement("td");
    celdaGF.textContent = team.GF;
    row.appendChild(celdaGF);
    
    const celdaGC = document.createElement("td");
    celdaGC.textContent = team.GC;
    row.appendChild(celdaGC);

    const celdaGD = document.createElement("td");
    celdaGD.textContent = team.GD;
    celdaGD.style.fontWeight = "bold";
    if(team.GD > 0){
      celdaGD.style.color = "green";
    }else if(team.GD < 0){
      celdaGD.style.color = "red";
    }
    row.appendChild(celdaGD);

    const pointsField = document.createElement("td");
    pointsField.textContent = team.Pts;
    pointsField.classList.add("lastColumnRows");
    row.appendChild(pointsField);

    return row;
}

function processGroupA(team, index) {
    const bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index));
};

function processGroupB(team, index) {
    const bodyTableB = document.getElementById("groupB");
    bodyTableB.appendChild(createRow(team, index));
};

function calculatePointsGoalsMatches(team){
    const puntos = team.PG * 3;
    team.Pts = team.PE ? (puntos + team.PE) : puntos;

    const gd = team.GF - team.GC;
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
