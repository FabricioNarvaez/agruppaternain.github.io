import { url } from "./url.js";
$(document).ready(async function () {
    $(".select").select2();
    const matchweekAdmin = await fetch(`${url}api/matchweekAdmin`);
    const apiResponse = await matchweekAdmin.json();
    const jornadas = apiResponse.matchweek;
    const jornadaSelect = $("#jornada");

    jornadas.forEach(jornada => {
        const newMatchweekOption = createOption(jornada.matchWeek);
        jornadaSelect.append(newMatchweekOption);
    });

    const grupoSelect = $("#grupo");
    const local = $("#local");
    const visitor = $("#visitor");
    const grupoASelect = createOption('groupA');
    const grupoBSelect = createOption('groupB');
    grupoSelect.append(grupoASelect);
    grupoSelect.append(grupoBSelect);

    grupoSelect.change(function(){
        local.find('option').not(':first').remove();
        visitor.find('option').not(':first').remove();
        const grupoSeleccionado = $(this).val();
        const jornadaSeleccionada = $("#jornada").val();
        const jornadaFiltrada = jornadas.filter(jornada=>{
            return jornada.matchWeek === jornadaSeleccionada;
        });
        const partidos = jornadaFiltrada[0].matches;
        partidos.forEach(match =>{
            const newOptionLocal = createOption(match[grupoSeleccionado].local);
            const newOptionVisitor = createOption(match[grupoSeleccionado].visitor);
            local.append(newOptionLocal);
            visitor.append(newOptionVisitor);
        })
    });

    local.change(function(){
        var selectedIndex = $(this).prop('selectedIndex');
        changeLocalVisitor(visitor, selectedIndex);
    });

    visitor.change(function(){
        var selectedIndex = $(this).prop('selectedIndex');
        changeLocalVisitor(local, selectedIndex);
    });

    let updating = false;
    var localPlayers, visitorPlayers;
    var selectLocalCounter = 0;
    var selectVisitorCounter = 0;
    async function changeLocalVisitor(otherTeam, selectedIndex){
        if(!updating){
            localPlayers, visitorPlayers = {};
            selectLocalCounter,selectVisitorCounter  = 0;
            updating = true;
            otherTeam.val(otherTeam.find("option").eq(selectedIndex).val());
            otherTeam.trigger("change");
            updating = false;
            const responseLocal = await fetch(`${url}api/teamByName/${grupoSelect.val()}/${local.val()}`);
            localPlayers = (await responseLocal.json()).team.players;
            const responseVisitor = await fetch(`${url}api/teamByName/${grupoSelect.val()}/${visitor.val()}`);
            visitorPlayers = (await responseVisitor.json()).team.players;
        }
    };

    $("#removeLocalScorer").click(function () {
        $(`#adminFlex${selectLocalCounter}`).remove();
        selectLocalCounter--;
    });

    $("#removeVisitorScorer").click(function () {
        $(`#adminFlex${selectLocalCounter}`).remove();
        selectLocalCounter--;
    });

    $("#addLocalScorer").click(function () {
        selectLocalCounter++;
        addScorer("local", selectLocalCounter, localPlayers);
    });

    $("#addVisitorScorer").click(function () {
        selectVisitorCounter++;
        addScorer("visitor", selectVisitorCounter, visitorPlayers);
    });

    function addScorer(localOrVisitor, selectCounter, localPlayers) {
        $(`#${localOrVisitor}`).prop("disabled", true);
        const adminFlexDiv = addPlayersOption(selectCounter, localOrVisitor, localPlayers);
        $(`.${localOrVisitor}PlayersAndGoals`).append(adminFlexDiv);
        $(`#player${localOrVisitor}${selectCounter}`).select2();
    }

    function addPlayersOption(selectCounter, localOrVisitor, teamPlayers) {
        const className = `player${localOrVisitor}${selectCounter}`;
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

        for (const player of teamPlayers) {
            const newPlayer = createOption(player.name);
            selectElement.append(newPlayer);
        }
        div.append(selectElement, inputElement);
        return div;
    };

    function createOption(name) {
        return $("<option></option>").val(name).text(name);
    }

    var sendingData = false
    $("#sendMatchDataButton").click(function () {
        if(!sendingData){
            sendingData = true;
            var dataToSend = {
                local: {
                    team: local.val(),
                    players: calculateGoals(selectLocalCounter, "local"),
                },
                visitor: {
                    team: visitor.val(),
                    players: calculateGoals(selectVisitorCounter, "visitor"),
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
        }
        sendingData = false;
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
            goalsArray.push({ name: playerName, goals: parseInt(goals) });
        }
        return goalsArray;
    }
});
