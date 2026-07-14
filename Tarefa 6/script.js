const inputBox = document.getElementById("input-box");
const inputData = document.getElementById("input-data");
const listaContainer = document.getElementById("listaContainer");

const formatador = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});


let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function adicionarTarefa() {
    if (inputBox.value === "" || inputData.value === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const tarefa = {
        nome: inputBox.value,
        dataCriacao: formatador.format(new Date(inputData.value)),
        concluida: false
    };

    tarefas.push(tarefa);

    inputBox.value = "";
    inputData.value = "";

    salvarDados();
    mostrarTarefas();
}

function mostrarTarefas() {
    listaContainer.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${tarefa.nome}</strong><br>
            Data: ${tarefa.dataCriacao}
        `;

        if (tarefa.concluida) {
            li.classList.add("checked");
        }

        li.addEventListener("click", function () {
            marcarConcluida(indice);
        });

        const span = document.createElement("span");
        span.innerHTML = "\u00D7";

        span.onclick = function (e) {
            e.stopPropagation();
            excluirTarefa(indice);
        };

        li.appendChild(span);
        listaContainer.appendChild(li);
    });
}

function marcarConcluida(indice) {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvarDados();
    mostrarTarefas();
}

function excluirTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarDados();
    mostrarTarefas();
}

function listarPendentes() {
    return tarefas.filter(tarefa => !tarefa.concluida);
}

function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

mostrarTarefas();