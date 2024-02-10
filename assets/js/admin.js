import { url } from "./url.js";
$(document).ready(async function () {
    $(".select").select2();
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    const teamsCollection = teamsGroupA.concat(teamsGroupB);

    const local = $("#local");
    const visitor = $("#visitor");

    var selectLocalCounter = 0;
    var selectVisitorCounter = 0;

    teamsCollection.forEach(function (team) {
        const newOptionLocal = createOption(team.team);
        local.append(newOptionLocal);

        const newOptionVisitor = createOption(team.team);
        visitor.append(newOptionVisitor);
    });

    function addPlayerOption(selectCounter, selectId) {
        const teamSelected = $(`#${selectId}`).val();
        const teamFounded = teamsCollection.find(
            (team) => team.team === teamSelected
        );
        const teamPlayers = teamFounded.players;
        const className = `player${selectId}${selectCounter}`;
        const div = $("<div>", {
            id: `adminFlex${selectCounter}`,
            class: "adminFlex",
        });

        var selectElement = $("<select>", {
            id: className,
            class: `select ${className}`,
        }).append(
            $("<option>", {
                value: "",
                disabled: true,
                selected: true,
                text: "Selecciona un jugador",
            })
        );

        var inputElement = $("<input>", {
            type: "number",
            class: `adminInput ${className}`,
            value: "0",
        });

        for (const name in teamPlayers) {
            const newPlayer = createOption(name);
            selectElement.append(newPlayer);
        }
        div.append(selectElement, inputElement);
        return div;
    }

    $("#addLocalScorer").click(function () {
        selectLocalCounter++;
        addScorer("local", selectLocalCounter);
    });

    $("#removeLocalScorer").click(function () {
        $(`#adminFlex${selectLocalCounter}`).remove();
        selectLocalCounter--;
    });

    $("#addVisitorScorer").click(function () {
        selectVisitorCounter++;
        addScorer("visitor", selectVisitorCounter);
    });

    $("#removeVisitorScorer").click(function () {
        $(`#adminFlex${selectLocalCounter}`).remove();
        selectLocalCounter--;
    });

    $("#sendMatchDataButton").click(function () {
        var dataToSend = {
            local: {
                team: local.val(),
                goals: calculateGoals(selectLocalCounter, "local"),
            },
            visitor: {
                team: visitor.val(),
                goals: calculateGoals(selectVisitorCounter, "visitor"),
            },
        };
        $.ajax({
            type: "PUT",
            url: `${url}api/update`,
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            success: function (response) {
                alert(response);
                location.reload();
            },
            error: function (error) {
                console.error("Error en la solicitud PUT:", error);
            },
        });
        console.log(dataToSend);
    });

    function calculateGoals(counter, playerType) {
        const goalsArray = [];
        for (let i = counter; i > 0; i--) {
            let playerName;
            let goals;
            $(`.player${playerType}${i}`).each(function (index, element) {
                if (element.localName == "select") playerName = element.value;
                else goals = element.value;
            });
            goalsArray.push({ name: playerName, goals: goals });
        }
        return goalsArray;
    }

    function addScorer(selectId, selectCounter) {
        $(`#${selectId}`).prop("disabled", true);
        const adminFlexDiv = addPlayerOption(selectCounter, selectId);
        $(`.${selectId}PlayersAndGoals`).append(adminFlexDiv);
        $(`#player${selectId}${selectCounter}`).select2();
    }

    function createOption(name) {
        return $("<option></option>").val(name).text(name);
    }
});
