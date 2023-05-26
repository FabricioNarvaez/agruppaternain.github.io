import { calculatePointsGoalsMatches, processGroupA, processGroupB, sortByPointsAndGoals} from './app.js';
import { url } from './url.js';

(async ()=> {
    
    const response = await fetch(`${url}api/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();
    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    teamsGroupA.forEach(processGroupA);
    
    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    teamsGroupB.forEach(processGroupB);
})();