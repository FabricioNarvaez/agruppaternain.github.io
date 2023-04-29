import { appendField, sortByGoals, appendSpan } from "./common.js";

const groupA = [
  { team: "Los Panas",      PG: 4, PE: 0, PP: 1, GF: 23,  GC: 8, lastPos: 2},
  { team: "Peñarol",        PG: 2, PE: 0, PP: 3, GF: 21,  GC: 21, lastPos: 4},
  { team: "Comboloco",      PG: 5, PE: 0, PP: 0, GF: 24,  GC: 3, lastPos: 1},
  { team: "Los Rumberos",   PG: 1, PE: 0, PP: 4, GF: 14,  GC: 38, lastPos: 5},
  { team: "Latin Brothers", PG: 3, PE: 0, PP: 2, GF: 26,   GC: 11, lastPos: 3},
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

function createRow(team, index, groupA = false){
    const row = document.createElement("tr");

    const pos = index + 1;
    row.appendChild(appendField(pos));
    if(pos <= 2){
      row.children[0].classList.add("qualifiedToChampions");
    }

    const teamField = document.createElement("td");
    teamField.style.width = "280px";
    const difPos = team.lastPos - pos;
    teamField.appendChild(appendSpan(team.team));
    teamField.appendChild(appendSpan("", difPos, false));
    row.appendChild(teamField);

    row.appendChild(appendField(team.PJ));
    row.appendChild(appendField(team.PG));
    row.appendChild(appendField(team.PE));
    row.appendChild(appendField(team.PP));
    row.appendChild(appendField(team.GF));
    row.appendChild(appendField(team.GC));

    row.appendChild(appendField(team.GD));
    row.children[8].style.fontWeight = "bold";
    if(team.GD > 0){
      row.children[8].style.color = "green";
    }else if(team.GD < 0){
      row.children[8].style.color = "red";
    }
    let pts = team.Pts;
    if(groupA){
      pts = pts + 3;
    }
    row.appendChild(appendField(pts));
    row.children[9].classList.add("lastColumnRows");

    return row;
}

function processGroupA(team, index) {
    const bodyTableA = document.getElementById("groupA");
    bodyTableA.appendChild(createRow(team, index, true));
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
      return sortByGoals(a, b);
    }
}

groupA.forEach(calculatePointsGoalsMatches);
groupA.sort(sortByPointsAndGoals);
groupA.forEach(processGroupA);

grupoB.forEach(calculatePointsGoalsMatches);
grupoB.sort(sortByPointsAndGoals);
grupoB.forEach(processGroupB);
