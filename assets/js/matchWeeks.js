import { appendField, sortByGoals } from "./common.js";
import { url } from "./url.js";

const matchWeeksLoader = document.getElementById("matchWeeksLoader");

(async () => {
    const response = await fetch(`${url}matchweeks/getAll`);
    const { matchWeeks } = await response.json();
    matchWeeksLoader.remove();
    const matchWeeksContent = document.getElementById("matchWeeksContent");
    if(matchWeeks.length){
        matchWeeks.forEach((matchWeek, index) => {
            const matchWeekContainer = document.createElement("div");
            const matchWeekTitle = document.createElement("h3");
            matchWeekTitle.textContent = `${matchWeek.matchWeek} (${matchWeek.date})`;

            matchWeekContainer.appendChild(matchWeekTitle);
            matchWeekContainer.appendChild(addMatchWeek(matchWeek.matches));

            matchWeeksContent.appendChild(matchWeekContainer);
        });
    }else{
        const noData = document.createElement("h3");
        for(let i =0; i<4; i++){
            noData.appendChild(appendField("Sin datos"));
        }
        matchWeeksContent.appendChild(noData);
    }
    
})();

function addMatchWeek(matches){
    const table = document.createElement("table");
    table.style.textAlign = 'center';
    const htmlTemplate = `
        <thead>
            <tr>
                <th style="width:8%;">Horas</th>
                <th style="width:46%;">Grupo A</th>
                <th style="width:46%;">Grupo B</th>
            </tr>
        </thead>
    `;
    table.innerHTML = htmlTemplate;
    const thElements = table.querySelectorAll("thead th");

    thElements.forEach(th => {
        th.style.textAlign = 'center';
    });

    const tableTbody = document.createElement("tbody");
    matches.forEach(match =>{
        tableTbody.appendChild(createMatchWeekRow(match));
    })

    table.appendChild(tableTbody);
    return table;
}

function createTableCell(local, visitor) {
    const cell = document.createElement("td");
    const content = local.localResult && visitor.visitorResult ? 
        `<div class="tableGrid">
            <div class="gridTeamData">
                <p>${local.local}</p>
                <div class="matchWeeksResults">
                    <p>${local.localResult}</p>
                </div>
            </div>
            <strong> VS </strong>
            <div class="gridTeamData">
                <p>${visitor.visitor}</p>
                <div class="matchWeeksResults">
                    <p>${visitor.visitorResult}</p>
                </div>
            </div>
        </div>
        `
        :
        `<div class="tableGrid">
            <div class="flexJustifyCenter">
                <p>${local.local}</p>
            </div>
            <strong> VS </strong>
            <div class="flexJustifyCenter">
                <p>${visitor.visitor}</p>
            </div>
        </div>
        `
    ;
    cell.innerHTML = content;
    return cell;
}

function createMatchWeekRow(match) {
    const row = document.createElement("tr");
    const hourtd = document.createElement("td");
    hourtd.textContent = match.hour;
    row.appendChild(hourtd);
    row.appendChild(createTableCell(match.groupA, match.groupA));
    row.appendChild(createTableCell(match.groupB, match.groupB));
    return row;
}