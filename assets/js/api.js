import {
    calculatePointsGoalsMatches,
    processGroupA,
    processGroupB,
    sortByPointsAndGoals,
} from "./groupsTables.js";
import { url } from "./url.js";

const loaderRowA = document.getElementById("loader-rowA");
const loaderRowB = document.getElementById("loader-rowB");

(async () => {
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    loaderRowA.remove();
    loaderRowB.remove();

    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    teamsGroupA.forEach(processGroupA);

    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    teamsGroupB.forEach(processGroupB);
})();
