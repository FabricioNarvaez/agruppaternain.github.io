import { calculatePointsGoalsMatches, processGroupA, processGroupB, sortByPointsAndGoals} from './app.js';
import { url } from './url.js';

(async ()=> {
    const response = await fetch(`${url}/api/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();
    console.log("La conexión con la API se ha realizado correctamente");
    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    teamsGroupA.forEach(processGroupA);
    
    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    teamsGroupB.forEach(processGroupB);
})();