import { appendField, sortByGoals, appendSpan } from "./common.js";
function createRow(team, index){
    let row = document.createElement("tr");

    const pos = index + 1;
    row.appendChild(appendField(pos));
    if(pos <= 2){
      row.children[0].classList.add("qualifiedToChampions");
    }else{
      row.children[0].classList.add("qualifiedToUEFA");
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
    row.appendChild(appendField(pts));
    row.children[9].classList.add("lastColumnRows");

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

    const gd = team.GF - team.GC;
    team.GD = gd > 0 ? `+${gd}` : gd;

    team.PJ = team.PG + team.PE + team.PP;
}

export function sortByPointsAndGoals(a, b) {
    if (a.Pts > b.Pts) {
      return -1;
    } else if (a.Pts < b.Pts) {
      return 1;
    } else {
      return sortByGoals(a, b);
    }
}
