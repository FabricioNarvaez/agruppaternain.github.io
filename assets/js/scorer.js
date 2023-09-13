import { appendField, sortByGoals } from "./common.js";
import { url } from "./url.js";

const loaderScorers = document.getElementById("loaderScorers");

(async () => {
    const response = await fetch(`${url}players/scorers`);
    const { players } = await response.json();
    loaderScorers.remove();
    const scorrersTable = document.getElementById("scorersTable");
    if(players.length){
        players.sort(sortByGoals);
        players.forEach((scorer, index) => {
            
            const row = document.createElement("tr");
        
            const positionField = document.createElement("td");
            const pos = index + 1;
            if (pos === 1) {
                positionField.style.background = "url(https://e00-marca.uecdn.es/assets/v31/img/estaticas/trofeos/first-mobile.svg) no-repeat center center";
                positionField.style.backgroundSize = "auto 100%";
            } else {
                positionField.textContent = pos;
            }
            
            row.appendChild(positionField);
            row.appendChild(appendField(scorer.name));
            row.appendChild(appendField(scorer.team));
            row.appendChild(appendField(scorer.goals));
            row.children[3].classList.add("lastColumnRows");
        
            scorrersTable.appendChild(row);
        });
    }else{
        const row = document.createElement("tr");
        for(let i =0; i<4; i++){
            row.appendChild(appendField("Sin datos"));
        }
        scorrersTable.appendChild(row);
    }
    
})();
