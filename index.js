const form1 = document.getElementById('form')
form1.addEventListener('submit', e => {
    e.preventDefault()
    adicionarAtividade()
})


class Fase {
    atividades = []

    addAtividade(descricao, responsavel) {
        this.atividades.push({
            "descricao": descricao,
            "responsavel": responsavel,
            "ativo": true
        })
        mostrar()
    }

    posiAtividade(descricao, responsavel) {
        return this.atividades.findIndex(n => {
            if (n.descricao == descricao && n.responsavel == responsavel) {
                return n
            }
        })
    }

}

let projetos = new Fase()
let implementacao = new Fase()
let testes = new Fase()

let storage = localStorage;


function adicionarAtividade() {
    let atividade = document.getElementById("atividadeNome").value
    let responsavel = document.getElementById("responsavelNome").value
    if (atividade !== "" && responsavel !== "") {
        projetos.addAtividade(atividade, responsavel)
        document.getElementById("atividadeNome").setAttribute("class", "form-control col")
        document.getElementById("responsavelNome").setAttribute("class", "form-control col")
        document.getElementById("atividadeNome").value = ""
        document.getElementById("responsavelNome").value = ""
    }
    if (atividade === "") {
        document.getElementById("atividadeNome").setAttribute("class", "form-control col is-invalid")
        document.getElementById("validarNome").innerHTML = 'A descrição da atividade não pode estar vazia'
    }
    if (responsavel === "") {
        document.getElementById("responsavelNome").setAttribute("class", "form-control col is-invalid")
        document.getElementById("validarResponsavel").innerHTML = 'O "responsável" não pode estar vazio'
    }
}

function recuperarTodasAtividades() {
    let storageImplementacao = storage.getItem("implementacao") !== "" ? JSON.parse(storage.getItem("implementacao")) : ""
    let storageProjeto = storage.getItem("projeto") !== "" ? JSON.parse(storage.getItem("projeto")) : ""
    let storageTestes = storage.getItem("teste") !== "" ? JSON.parse(storage.getItem("teste")) : ""

    if (storageImplementacao === "" && storageProjeto === "" && storageTestes === "") {
        window.alert("Não há dados para serem carregados!")
    } else {
        projetos = new Fase()
        implementacao = new Fase()
        testes = new Fase()

        projetos.atividades = storageProjeto.atividades
        implementacao.atividades = storageImplementacao.atividades
        testes.atividades = storageTestes.atividades

        window.alert("Dados carregados com sucesso!")
    }
    mostrar()
}

function salvarTodasAtividades() {
    if (implementacao.atividades.length > 0 || projetos.atividades.length > 0 || testes.atividades.length > 0) {
        storage.setItem("implementacao", JSON.stringify(implementacao))
        storage.setItem("projeto", JSON.stringify(projetos))
        storage.setItem("teste", JSON.stringify(testes))

        window.alert("Atividades salvas com sucesso!")
    } else {
        window.alert("Não existem atividades para serem salvas!")
    }

    mostrar()
}
function limparTodasAtividades() {
    storage.setItem("implementacao", "")
    storage.setItem("projeto", "")
    storage.setItem("teste", "")

    projetos.atividades = []
    implementacao.atividades = []
    testes.atividades = []
    mostrar()

    window.alert("Dados limpos")
}

function limpar() {
    document.getElementById("projeto").innerHTML = ""
    document.getElementById("implementacao").innerHTML = ""
    document.getElementById("teste").innerHTML = ""
}
function mostrar() {
    limpar()
    mostrarProjetos()
    mostrarImplementacao()
    mostrarTestes()
    function mostrarProjetos() {
        if ([...projetos.atividades].length >= 3) document.getElementById("painelProjeto").classList.add("h-75")
        for (let projeto of [...projetos.atividades]) {

            if (projeto.ativo !== true) continue

            let buttons = `<div class="btn-toolbar justify-content-center" role="toolbar"><button type="button" data-toggle="tooltip" data-placement="top" title="Avançar tarefa" class="btn" onclick ="avancarAtividade(this)">➡️</button></div>`

            document.getElementById("projeto").innerHTML +=
                `<li class="list-group-item mb-2 card">
                <div class=" btn-toolbar justify-content-end">
                    <button type="button" onclick="excluirAtividade(this)" data-toggle="tooltip" data-placement="top" title="Excluir tarefa"
                    class="btn">❌</button>
                </div>
                <div>
                    <p>Título: <span class="descricao">${projeto.descricao}</span></p>
                    <p>Responsável: <span class="responsavel">${projeto.responsavel}</span></p>
                </div>
                ${buttons}
            </li>`;
        }
    }
    function mostrarImplementacao() {
        if ([...implementacao.atividades].length >= 3) document.getElementById("painelImplementacao").classList.add("h-75")
        for (let implement of [...implementacao.atividades]) {
            if (implement.ativo !== true) continue
            let buttons = `<div class="btn-toolbar justify-content-center" role="toolbar">
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Voltar tarefa"
                        class="btn" onclick = "voltarAtividade(this)">⬅️</button>
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Avançar tarefa"
                        class="btn" onclick ="avancarAtividade(this)">➡️</button>
                </div>`
            document.getElementById("implementacao").innerHTML +=
                `<li class="list-group-item mb-2 card">
                    <div class=" btn-toolbar justify-content-end">
                        <button type="button" onclick="excluirAtividade(this)" data-toggle="tooltip" data-placement="top" title="Excluir tarefa"
                        class="btn">❌</button>
                    </div>
                    <div>
                        <p>Título: <span class="descricao">${implement.descricao}</span></p>
                        <p>Responsável: <span class="responsavel">${implement.responsavel}</span></p>
                    </div>
                    ${buttons}
                </li>`;
        }
    }
    function mostrarTestes() {
        if ([...testes.atividades].length >= 3) document.getElementById("painelTestes").classList.add("h-75")

        for (let teste of [...testes.atividades]) {
            if (teste.ativo !== true) continue
            let buttons = `<div class="btn-toolbar justify-content-center" role="toolbar">
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Voltar tarefa"
                        class="btn" onclick = "voltarAtividade(this)">⬅️</button>
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Finalizar tarefa"
                        class="btn" onclick = "excluirAtividade(this)">✅</button>
                </div>`
            document.getElementById("teste").innerHTML +=
                `<li class="list-group-item mb-2 card">
                    <div class=" btn-toolbar justify-content-end">
                        <button type="button" onclick="excluirAtividade(this)" data-toggle="tooltip" data-placement="top" title="Excluir tarefa"
                        class="btn">❌</button>
                    </div>
                    <div>
                        <p>Título: <span class="descricao">${teste.descricao}</span></p>
                        <p>Responsável: <span class="responsavel">${teste.responsavel}</span></p>
                    </div>
                    ${buttons}
                </li>`;
        }
    }
}

function avancarAtividade(obj) {
    let descricao = obj.parentElement.parentElement.getElementsByClassName("descricao")[0].outerText
    let responsavel = obj.parentElement.parentElement.getElementsByClassName("responsavel")[0].outerText

    if (projetos.posiAtividade(descricao, responsavel) >= 0) {
        implementacao.addAtividade(descricao, responsavel)
        projetos.atividades.splice(projetos.posiAtividade(descricao, responsavel), 1)

    } else if (implementacao.posiAtividade(descricao, responsavel) >= 0) {
        testes.addAtividade(descricao, responsavel)
        implementacao.atividades.splice(implementacao.posiAtividade(descricao, responsavel), 1)
    }

    mostrar()

}

function voltarAtividade(obj) {
    let descricao = obj.parentElement.parentElement.getElementsByClassName("descricao")[0].outerText
    let responsavel = obj.parentElement.parentElement.getElementsByClassName("responsavel")[0].outerText

    if (implementacao.posiAtividade(descricao, responsavel) >= 0) {
        projetos.addAtividade(descricao, responsavel)
        implementacao.atividades.splice(implementacao.posiAtividade(descricao, responsavel), 1)
    } else if (testes.posiAtividade(descricao, responsavel) >= 0) {
        implementacao.addAtividade(descricao, responsavel)
        testes.atividades.splice(testes.posiAtividade(descricao, responsavel), 1)
    }

    mostrar()
}

function excluirAtividade(obj) {
    let descricao = obj.parentElement.parentElement.getElementsByClassName("descricao")[0].outerText
    let responsavel = obj.parentElement.parentElement.getElementsByClassName("responsavel")[0].outerText

    if (projetos.posiAtividade(descricao, responsavel) >= 0) {
        projetos.atividades.splice(projetos.posiAtividade(descricao, responsavel), 1)
    } else if (implementacao.posiAtividade(descricao, responsavel) >= 0) {
        implementacao.atividades.splice(implementacao.posiAtividade(descricao, responsavel), 1)
    } else if (testes.posiAtividade(descricao, responsavel) >= 0) {
        testes.atividades.splice(testes.posiAtividade(descricao, responsavel), 1)
    }

    mostrar()
}


