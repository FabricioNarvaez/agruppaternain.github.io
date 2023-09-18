import { appendField, sortByGoals } from "./common.js";
function createRow(team, index) {
    let row = document.createElement("tr");

    const pos = index + 1;
    row.appendChild(appendField(pos));
    if (pos <= 4) {
        row.children[0].classList.add("qualifiedToChampions");
    } else {
        row.children[0].classList.add("qualifiedToUEFA");
    }

    const teamField = document.createElement("td");
    const imgSrc = team.logo || "https://res.cloudinary.com/dzd68sxue/image/upload/v1695055988/default_bnoacd.png";
    const calculateDifPos = team.lastPos - pos;
    let difPos = "";
    if(calculateDifPos != 0){
        var className = "";
        var color = "";
        if(calculateDifPos < 0 ){
            className = "redTriangle";
            color = "red";
        } else if(calculateDifPos > 0) {
            className = "greenTriangle";
            color = "green";
        }
        difPos = Math.abs(calculateDifPos);
    }
    const htmlTemplate = `
        <div class="flexAlignCenter spaceBetween">
            <div class="flexAlignCenter">
                <img src="${imgSrc}" class="teamIndexLogo">
                <span>${team.team}</span>
            </div>
            <div class="flexAlignCenter">
                <span class="triangle ${className}"></span>
                <span style="color: ${color}">${difPos}</span>
            </div>
        </div>
    `;
    teamField.innerHTML = htmlTemplate;
    row.appendChild(teamField);

    row.appendChild(appendField(team.PJ));
    row.appendChild(appendField(team.PG));
    row.appendChild(appendField(team.PE));
    row.appendChild(appendField(team.PP));
    row.appendChild(appendField(team.GF));
    row.appendChild(appendField(team.GC));

    row.appendChild(appendField(team.GD));
    row.children[8].style.fontWeight = "bold";
    if (team.GD > 0) {
        row.children[8].style.color = "green";
    } else if (team.GD < 0) {
        row.children[8].style.color = "red";
    }
    let pts = team.Pts;
    row.appendChild(appendField(pts));
    row.children[9].classList.add("lastColumnRows");

    return row;
}

export function processGroup(group, groupId){
    group.forEach((team, index) => {
        const bodyTable = document.getElementById(groupId);
        bodyTable.appendChild(createRow(team, index));
    })
}

export function calculatePointsGoalsMatches(team) {
    let puntos = team.PG * 3;
    team.Pts = team.PE ? puntos + team.PE : puntos;

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
