import {
    calculatePointsGoalsMatches,
    processGroup,
    sortByPointsAndGoals,
} from "./groupsTables.js";
import { url } from "./url.js";

const loaderRowA = document.getElementById("loaderRowA");
const loaderRowB = document.getElementById("loaderRowB");

(async () => {
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    loaderRowA.remove();
    loaderRowB.remove();

    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    processGroup(teamsGroupA, "groupA");

    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    processGroup(teamsGroupB, "groupB");
})();
