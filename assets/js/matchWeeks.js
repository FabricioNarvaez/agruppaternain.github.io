import { appendField, sortByGoals } from "./common.js";
import { url } from "./url.js";

const matchWeeksLoader = document.getElementById("matchWeeksLoader");

(async () => {
    const response = await fetch(`${url}matchweeks/getAll`);
    const { matchWeeks } = await response.json();
    // TODO: Search better way to do this
    matchWeeks.sort((a, b) => {
        const numA = parseInt(a.matchWeek.match(/\d+/)[0]);
        const numB = parseInt(b.matchWeek.match(/\d+/)[0]);
        return numA - numB;
    });
    matchWeeksLoader.remove();
    const matchWeeksContent = document.getElementById("matchWeeksContent");
    if (matchWeeks.length) {
        // TODO: Descomentar esto
        // matchWeeks.forEach((matchWeek, index) => {
        //     const matchWeekContainer = document.createElement("div");
        //     matchWeekContainer.classList.add("tablesMargin");
        //     const matchWeekTitle = document.createElement("h3");
        //     matchWeekTitle.textContent = `${matchWeek.matchWeek} (${matchWeek.date})`;

        //     matchWeekContainer.appendChild(matchWeekTitle);
        //     matchWeekContainer.appendChild(newDesign(matchWeek.matches));

        //     matchWeeksContent.appendChild(matchWeekContainer);
        // });
        // TODO: Borrar esto
        const noData = document.createElement("h3");
        noData.appendChild(appendField("Las jornadas aún no están definidas"));
        matchWeeksContent.appendChild(noData);
    } else {
        const noData = document.createElement("h3");
        for (let i = 0; i < 4; i++) {
            noData.appendChild(appendField("Sin datos"));
        }
        matchWeeksContent.appendChild(noData);
    }
})();

function newDesign(matches) {
    const container = document.createElement("div");
    container.classList.add("weekContainer");
    matches.forEach((matchHour) => {
        const divRowA = document.createElement("div");
        divRowA.innerHTML = createRow(matchHour.groupA, matchHour.hour);
        divRowA.classList.add("matchweek_row");
        const divRowB = document.createElement("div");
        divRowB.innerHTML = createRow(matchHour.groupB, matchHour.hour);
        divRowB.classList.add("matchweek_row");
        container.appendChild(divRowA);
        container.appendChild(divRowB);
    });
    return container;
}

function createRow(matchData, hour) {
    const hourOrResult = matchData.localResult
        ? `${matchData.localResult} - ${matchData.visitorResult}`
        : `${hour}`;
    const template = `
        <div class="matchweekTeam">
            <img src="${matchData.localLogo}" class="teamIndexLogo" alt="${matchData.local}" title="${matchData.local}">
            <p>${matchData.local}</p>
        </div>
        <div class="matchHourOrResult">
            <span>${hourOrResult}</span>
        </div>
        <div class="matchweekTeam matchweekTeamVisitor">
            <p>${matchData.visitor}</p>
            <img src="${matchData.visitorLogo}" class="teamIndexLogo" alt="${matchData.visitorLogo}" title="${matchData.visitorLogo}">
        </div>
        `;
    return template;
}
