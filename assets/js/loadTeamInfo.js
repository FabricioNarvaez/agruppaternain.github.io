const teamTitle = document.getElementById("teamTitle");
const params = new URLSearchParams(window.location.search);
const group = params.get("group");
const equipoId = params.get("id");
teamTitle.innerHTML = equipoId + "grupo" + group;
import { url } from "./url.js";

(async () => {
    const response = await fetch(`${url}api/team/${group}/${equipoId}`);
    const { team } = await response.json();
    teamTitle.classList.remove("hidden");

    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    processGroup(teamsGroupA, "groupA");

    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    processGroup(teamsGroupB, "groupB");
})();
