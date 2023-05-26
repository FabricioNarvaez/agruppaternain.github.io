import { calculatePointsGoalsMatches, processGroupA, processGroupB, sortByPointsAndGoals} from './app.js';
import { url } from './url.js';

const tableBodyA = document.getElementById('groupA');
const tableBodyB = document.getElementById('groupB');
const loaderRowA = document.getElementById('loader-rowA');
const loaderRowB = document.getElementById('loader-rowB');

(async ()=> {
    
    const response = await fetch(`${url}api/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();
    tableBodyA.removeChild(loaderRowA);
    tableBodyB.removeChild(loaderRowB);

    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    teamsGroupA.forEach(processGroupA);
    
    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    teamsGroupB.forEach(processGroupB);
})();