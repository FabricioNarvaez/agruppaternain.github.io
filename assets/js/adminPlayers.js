import { url } from "./url.js";
import { createOption } from "./common.js";

$(document).ready(async function () {
    $(".select").select2();
    const response = await fetch(`${url}api/teams`);
    const teamSelect = $("#teamSelect");
    const inputTexts = $(".inputTexts");
    const { teamsGroupA, teamsGroupB } = await response.json();
    const allTeams = teamsGroupA.concat(teamsGroupB);
    allTeams.forEach(team =>{
        const newTeamOption = createOption(team.team);
        teamSelect.append(newTeamOption);
    });

    teamSelect.change(()=>{
        for(let i = 1; i <= 25; i++){
            const div = $("<div>", {
                id: `adminFlex${i}`,
                class: "adminFlex",
            });
            const className = `player${i}`;
            var index = $("<p>").text(i);
            var inputText = $("<input>", {
                type: "text",
                class: `adminInput ${className}`,
            });
            var inputNumber = $("<input>", {
                type: "number",
                class: `adminInput ${className}`,
                value: "0",
            });
            div.append(index);
            div.append(inputText);
            div.append(inputNumber);
            inputTexts.append(div);
        }
    });

    var sendingData =  false;
    $("#sendPlayersDataButton").click(function () {
        const teamPlayersData = {
            team: teamSelect.val(),
            players: []
        }
        for(let index = 1; index <= 25; index++){
            const player = $(`.player${index}`);
            const name = player[0].value;
            if(name.length){
                const number = player[1].value;
                teamPlayersData.players.push({
                    name, number,
                    goals: 0
                });
            }
        }
        if(!sendingData){
            sendingData = true;
            $.ajax({
                type: "PUT",
                url: `${url}api/savePlayers`,
                data: JSON.stringify(teamPlayersData),
                contentType: "application/json",
                success: function (response) {
                    alert(response);
                    location.reload();
                    sendingData = false;
                },
                error: function (error) {
                    alert(error.message);
                },
            });
        };
    })
})