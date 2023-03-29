let grupoA = [
  { equipo: "Real Madrid", PJ: 10, PG: 8, PE: 1, PP: 3, GF: 10, GC: 5, GD: 0, Pts: 0 },
  { equipo: "Barcelona", PJ: 10, PG: 7, PE: 1, PP: 3, GF: 8, GC: 5, GD: 0, Pts: 0 },
  { equipo: "Atletico de Madrid", PJ: 10, PG: 6, PE: 1, PP: 5, GF: 5, GC: 5, GD: 0, Pts: 0 }
];

let cuerpoTabla = document.querySelector("tbody");

function procesarGrupo(equipo) {
    let fila = document.createElement("tr");
    let celdaEquipo = document.createElement("td");
    celdaEquipo.textContent = equipo.equipo;
    fila.appendChild(celdaEquipo);

    let celdaPJ = document.createElement("td");
    celdaPJ.textContent = equipo.PJ;
    fila.appendChild(celdaPJ);
    
    let celdaPG = document.createElement("td");
    celdaPG.textContent = equipo.PG;
    fila.appendChild(celdaPG);

    let celdaPE = document.createElement("td");
    celdaPE.textContent = equipo.PE;
    fila.appendChild(celdaPE);
    
    let celdaPP = document.createElement("td");
    celdaPP.textContent = equipo.PP;
    fila.appendChild(celdaPP);

    let celdaGF = document.createElement("td");
    celdaGF.textContent = equipo.GF;
    fila.appendChild(celdaGF);
    
    let celdaGC = document.createElement("td");
    celdaGC.textContent = equipo.PG;
    fila.appendChild(celdaGC);

    let celdaGD = document.createElement("td");
    celdaGD.textContent = equipo.GD;
    fila.appendChild(celdaGD);

    let celdaPuntos = document.createElement("td");
    celdaPuntos.textContent = equipo.Pts;
    fila.appendChild(celdaPuntos);


    cuerpoTabla.appendChild(fila);
};

function calcularPuntos(equipo){
    let puntos = equipo.PG * 3;
    if(equipo.PE){
        puntos += equipo.PE;
    }
    equipo.Pts = puntos;

    let gd = equipo.GF - equipo.GC;
    equipo.GD = gd > 0 ? `+${gd}` : gd;
}

function ordenarPorPuntosYGoles(a, b) {
    if (a.Pts > b.Pts) {
      return -1;
    } else if (a.Pts < b.Pts) {
      return 1;
    } else {
      if (a.GD > b.GD) {
        return -1;
      } else if (a.GD < b.GD) {
        return 1;
      } else {
        return 0;
      }
    }
  }

grupoA.forEach(calcularPuntos);
grupoA.sort(ordenarPorPuntosYGoles);
grupoA.forEach(procesarGrupo);