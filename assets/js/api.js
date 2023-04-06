import { calculatePointsGoalsMatches, processGroupA, processGroupB, sortByPointsAndGoals} from './app.js';
const urlApi = 'http://localhost:3900/api';

async function connectApiAndLoadData() {
    const response = await fetch(`${urlApi}/teams`);
    const {teamsGroupA, teamsGroupB} = await response.json();
    console.log("La conexión con la API se ha realizado correctamente");
    teamsGroupA.forEach(calculatePointsGoalsMatches);
    teamsGroupA.sort(sortByPointsAndGoals);
    teamsGroupA.forEach(processGroupA);
    
    teamsGroupB.forEach(calculatePointsGoalsMatches);
    teamsGroupB.sort(sortByPointsAndGoals);
    teamsGroupB.forEach(processGroupB);
}

connectApiAndLoadData();