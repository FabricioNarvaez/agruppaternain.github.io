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
            matchWeekContainer.classList.add("tablesMargin");
            const matchWeekTitle = document.createElement("h3");
            matchWeekTitle.textContent = `${matchWeek.matchWeek} (${matchWeek.date})`;

            matchWeekContainer.appendChild(matchWeekTitle);
            matchWeekContainer.appendChild(newDesign(matchWeek.matches));

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

function newDesign(matches){
    const container = document.createElement("div");
    container.classList.add("weekContainer");
    matches.forEach(matchHour =>{
        const divRowA = document.createElement("div");
        divRowA.innerHTML = createRow(matchHour.groupA, matchHour.hour);
        divRowA.classList.add("matchweek_row");
        const divRowB = document.createElement("div");
        divRowB.innerHTML = createRow(matchHour.groupB, matchHour.hour);
        divRowB.classList.add("matchweek_row");
        container.appendChild(divRowA);
        container.appendChild(divRowB);
    })
    return container;
}

function createRow(matchData, hour){
    const hourOrResult = matchData.localResult ? `${matchData.localResult} - ${matchData.visitorResult}` : `${hour}`;
    const template = `
        <p>${matchData.local}</p>
        <div class="matchHourOrResult">
            <span>${hourOrResult}</span>
        </div>
        <p>${matchData.visitor}</p>
    `;
    return template;
}