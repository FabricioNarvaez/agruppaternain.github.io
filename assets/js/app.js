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

    const positionField = document.createElement("td");
    const pos = index + 1;
    if(pos <= 2){
      positionField.classList.add("qualifiedToChampions");
    }
    positionField.textContent = pos;
    row.appendChild(positionField);

    const teamField = document.createElement("td");
    teamField.style.width = "280px";
    const difPos = team.lastPos - pos;
    const leftText = document.createElement("span");
    leftText.textContent = team.team;
    leftText.classList.add("leftText");

    const rightText = document.createElement("span");
    const triangle = document.createElement("span");
    triangle.classList.add("triangle");
    const difPosSpan = document.createElement("span");
    difPosSpan.style.marginRight = "5px";
    if(difPos < 0){
      triangle.classList.add("redTriangle");
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "red";
    }else if(difPos > 0){
      triangle.classList.add("greenTriangle");
      difPosSpan.textContent = `${Math.abs(difPos)}`;
      rightText.style.color = "green";
    }
    rightText.appendChild(triangle);
    rightText.appendChild(difPosSpan);
    rightText.classList.add("rightText");
    teamField.appendChild(leftText);
    teamField.appendChild(rightText);
    row.appendChild(teamField);

    const PJField = document.createElement("td");
    PJField.textContent = team.PJ;
    row.appendChild(PJField);
    
    const PGField = document.createElement("td");
    PGField.textContent = team.PG;
    row.appendChild(PGField);

    const PEField = document.createElement("td");
    PEField.textContent = team.PE;
    row.appendChild(PEField);
    
    const PPField = document.createElement("td");
    PPField.textContent = team.PP;
    row.appendChild(PPField);

    const GFField = document.createElement("td");
    GFField.textContent = team.GF;
    row.appendChild(GFField);
    
    const GCField = document.createElement("td");
    GCField.textContent = team.GC;
    row.appendChild(GCField);

    const GDField = document.createElement("td");
    GDField.textContent = team.GD;
    GDField.style.fontWeight = "bold";
    if(team.GD > 0){
      GDField.style.color = "green";
    }else if(team.GD < 0){
      GDField.style.color = "red";
    }
    row.appendChild(GDField);

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
    const points = team.PG * 3;
    team.Pts = team.PE ? (points + team.PE) : points;

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
