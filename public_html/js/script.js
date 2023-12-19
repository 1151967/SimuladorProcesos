let PROCESS = [];
let cyclesDispatcher = 0;
let cyclesInterrupts = 0;
let STATESPROCESS = [];

function addProcess() {
    const inputElement = document.getElementById('processInput');
    const inputText = inputElement.value.trim();

    // Validar que la entrada termine con la letra 'F'
    if (inputText.endsWith('F')) {
        // Validar que cada elemento sea solo un número o una letra (I, T, F)
        const elements = inputText.split(',');

        // Validar que el primer elemento sea un número
        if (/^\d+/.test(elements[0]) && elements.every(element => /^(?:\d+|[ITF])$/.test(element))) {
            PROCESS.push(inputText);
            inputElement.value = '';
            document.getElementById("size").textContent = PROCESS.length;
        } else {
            alert("La entrada debe empezar con una direcccion de memoria, seguido de mas direcciones o I, F, T, separados por comas.");
        }
    } else {
        alert("La entrada debe terminar con la letra 'F' que finaliza la terminacion de el proceso.");
    }
}

function showR() {
    const outBody = document.getElementById('outBody');
    outBody.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const Out = procesarinfoProcess(PROCESS[i]);

        const row = document.createElement('tr');
        const cellinfoProcess = document.createElement('td');
        const cellOut = document.createElement('td');

        cellinfoProcess.textContent = "P-" + i;
        cellOut.textContent = PROCESS[i];

        row.appendChild(cellinfoProcess);
        row.appendChild(cellOut);

        outBody.appendChild(row);
    }
}

function procesarinfoProcess(infoProcess) {
    // Aquí puedes realizar cualquier procesamiento necesario en la infoProcess
    // En este ejemplo, simplemente devolvemos la longitud de la infoProcess
    return infoProcess.length;
}

// function dispatcher() {
//     document.getElementById("outDistpatcher").textContent = "Must print the dispatcher run table";
// }


function readAndDisplayData() {
    // read window :
    cyclesDispatcher = prompt("Dispatcher Cycles:");
    cyclesInterrupts = prompt("Interrupts Cycles:");



    // Show data
    document.getElementById("result").innerHTML = `
        <p>Dispatcher Cycles: ${cyclesDispatcher}</p>
        <p>Interrupts Cycles: ${cyclesInterrupts}</p>
      `;
}


const tableContainer = document.querySelector('.table-container2');

const table = document.createElement('table');
tableContainer.appendChild(table);

const thead = table.createTHead();
const headerRow = thead.insertRow();
headerRow.insertCell();
for (let i = 1; i <= 100; i++) {
    const th = document.createElement('th');
    th.textContent = i;
    headerRow.appendChild(th);
}

const tbody = table.createTBody();
for (let p = 0; p <= 3; p++) {
    const row = tbody.insertRow();
    const th = document.createElement('th');
    th.textContent = `P-${p}`;
    row.appendChild(th);

    for (let i = 1; i <= 100; i++) {
        const td = document.createElement('td');
        td.style.backgroundColor = 'gray';
        row.appendChild(td);
    }
}

const dispatcherRow = tbody.insertRow();
const dispatcherTh = document.createElement('th');
dispatcherTh.textContent = 'DISPATCHER';
dispatcherRow.appendChild(dispatcherTh);

for (let i = 1; i <= 100; i++) {
    const td = document.createElement('td');
    td.style.backgroundColor = 'gray';
    dispatcherRow.appendChild(td);
}

function dispatcher() {
    document.getElementById("outDistpatcher").textContent = "Must print the dispatcher run table";
    console.log(cyclesDispatcher);
    console.log(cyclesInterrupts);
    console.log(PROCESS);

    let pos = 0;
    let continuar = true;

    while (continuar) {
        if (PROCESS.length > 0) {
            PROCESS.forEach((proceso, index) => {
                console.log(index);

                // Obtenemos la primera cadena del arreglo "5,6,7,I,8,F" (en este caso solo hay una)
                let cadena = proceso;

                // Dividimos la cadena usando la coma como delimitador
                let caracteres = cadena.split(',');

                // Procesar ciclos de interrupciones
                let elementsToProcess = Math.min(cyclesInterrupts, caracteres.length);
                for (let i = 0; i < elementsToProcess; i++) {
                    pos++;
                    let instru = caracteres[i];

                    // Almacenar en STATESPROCESS
                    if (!isNaN(instru)) {
                        let estado = {
                            pos,
                            instruccion: instru,
                            color: "verde"
                        };
                        STATESPROCESS.push(estado);
                    } else if (instru === "T" || instru === "I") {
                        let estado = {
                            pos,
                            instruccion: instru,
                            color: "rojo"
                        };
                        let estado2 = {
                            pos,
                            instruccion: "dispatcher",
                            color: "verde"
                        };
                        STATESPROCESS.push(estado);
                        STATESPROCESS.push(estado2);
                    } else if (instru === "F") {
                        let estado = {
                            pos,
                            instruccion: instru,
                            color: "amarillo"
                        };
                        let estado2 = {
                            pos,
                            instruccion: "dispatcher",
                            color: "verde"
                        };
                        STATESPROCESS.push(estado);
                        STATESPROCESS.push(estado2);
                    }
                }

                // Eliminar los valores procesados de la cadena
                PROCESS[index] = caracteres.slice(elementsToProcess).join(',');

                // Procesar ciclos de dispatcher
                for (let i = 0; i < cyclesDispatcher; i++) {
                    pos++;
                    let estado = {
                        pos,
                        instruccion: "dispatcher",
                        color: "verde"
                    };
                    STATESPROCESS.push(estado);
                }
            });

            console.log(STATESPROCESS);
            // Verificar si todas las cadenas están vacías
            continuar = PROCESS.some(cadena => cadena !== "");
        } else {
            continuar = false;
        }
    }
}