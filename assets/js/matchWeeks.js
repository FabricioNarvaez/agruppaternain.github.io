import { appendField, sortByGoals } from "./common.js";
import { url } from "./url.js";

const matchWeeksLoader = document.getElementById("matchWeeksLoader");
const restTeams = [{
        name:"Bolivia"
    },
    {
        name: "Comboloco",
        logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695398424/WEBP/comboloco-yxnvxo_a3ewne.webp"
    },
    {
        name: "Acorralados"
    },
    {
        name: "El Valle",
        logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395616/WEBP/el-valle-vsd59e_t5fqrg.webp"
    },
    {
        name: "Los Panas",
        logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395612/WEBP/Los_Panas_fltebx_ezz2bg.webp"
     },
     {
        name: "Leones",
        logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395613/WEBP/Los_Leones_u4yqpr_cnasv4.webp"
     },
     {
        name: "Impersiva",
        logo: "https://res.cloudinary.com/dzd68sxue/image/upload/v1695395617/WEBP/Impersiva_rwwguv_zjwd1x.webp"
      }, 
    ];

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
        matchWeeks.forEach((matchWeek, index) => {
            const matchWeekContainer = document.createElement("div");
            matchWeekContainer.classList.add("tablesMargin");
            const matchWeekTitle = document.createElement("h3");
            matchWeekTitle.textContent = `${matchWeek.matchWeek} (${matchWeek.date})`;

            matchWeekContainer.appendChild(matchWeekTitle);
            matchWeekContainer.appendChild(newDesign(matchWeek.matches));

            matchWeeksContent.appendChild(matchWeekContainer);
            const restTeam = document.createElement("p");
            const restTeamLogo = restTeams[index].logo ? restTeams[index].logo : "https://res.cloudinary.com/dzd68sxue/image/upload/v1695396332/WEBP/default-bnoacd-1_qnmcps.webp";
            const restTeamName = restTeams[index].name;
            const restTeamTemplate = `
                <b>Descansa: </b> ${restTeamName}<img src="${restTeamLogo}" class="teamIndexLogo" alt="${restTeamName}" title="${restTeamName}">
            `;
            restTeam.innerHTML = restTeamTemplate;
            restTeam.classList.add("matchweekTeam");
            restTeam.style.gap = "7px";
            matchWeeksContent.appendChild(restTeam);
        });
    } else {
        const noData = document.createElement("h3");
        noData.innerHTML = "Las jornadas aún no están definidas";
        matchWeeksContent.appendChild(noData);
    }
})();

function newDesign(matches) {
    const container = document.createElement("div");
    container.classList.add("weekContainer");
    matches.forEach((matchHour) => {
        if(matchHour.groupA){
            const divRowA = document.createElement("div");
            divRowA.innerHTML = createRow(matchHour.groupA, matchHour.hour);
            divRowA.classList.add("matchweek_row");
            container.appendChild(divRowA);
        }
        const divRowB = document.createElement("div");
        divRowB.innerHTML = createRow(matchHour.groupB, matchHour.hour);
        divRowB.classList.add("matchweek_row");
        container.appendChild(divRowB);
    });
    return container;
}

function createRow(matchData, hour) {
    const hourOrResult = matchData.localResult || matchData.visitorResult
        ? `${matchData.localResult} - ${matchData.visitorResult}`
        : `${hour}`;
    const localLogo = matchData.localLogo ? matchData.localLogo : "https://res.cloudinary.com/dzd68sxue/image/upload/v1695396332/WEBP/default-bnoacd-1_qnmcps.webp";
    const visitorLogo = matchData.visitorLogo ? matchData.visitorLogo : "https://res.cloudinary.com/dzd68sxue/image/upload/v1695396332/WEBP/default-bnoacd-1_qnmcps.webp";
    const template = `
        <div class="matchweekTeam">
            <img src="${localLogo}" class="teamIndexLogo" alt="${matchData.local}" title="${matchData.local}">
            <p>${matchData.local}</p>
        </div>
        <div class="matchHourOrResult">
            <span>${hourOrResult}</span>
        </div>
        <div class="matchweekTeam matchweekTeamVisitor">
            <p>${matchData.visitor}</p>
            <img src="${visitorLogo}" class="teamIndexLogo" alt="${matchData.visitor}" title="${matchData.visitor}">
        </div>
        `;
    return template;
}
