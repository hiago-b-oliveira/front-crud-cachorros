const SERVER_URL = 'http://localhost:3000'



document.addEventListener("DOMContentLoaded", function () {
    carregaCachorros()
});


function excluiCachorro(idCachorro) {
    const ok = confirm("Você realmente deseja excluir o cachorro?")
    if (ok) {
        mostraLoader()
        fetch(`${SERVER_URL}/cachorros/${idCachorro}`, {
            method: 'DELETE'
        }).then(function () {
            carregaCachorros()
            escondeLoader()
        })
    }
}

function salvarCachorro() {
    const idDom = document.getElementById('cachorro_id')
    const nomeDom = document.getElementById('cachorro_nome')
    const donoDom = document.getElementById('cachorro_dono')
    const telefoneDom = document.getElementById('cachorro_telefone')
    const observacoesDOM = document.getElementById('cachorro_observacoes')

    const id = idDom.value
    const corpo = {
        nome: nomeDom.value,
        dono: donoDom.value,
        telefone: telefoneDom.value,
        observacoes: observacoesDOM.value
    }

    idDom.value = ''
    nomeDom.value = ''
    donoDom.value = ''
    telefoneDom.value = ''
    observacoesDOM.value = ''


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const metodo = id ? 'PUT' : 'POST'
    const url = id ? `${SERVER_URL}/cachorros/${id}` : `${SERVER_URL}/cachorros`

    var requestOptions = {
        method: metodo,
        headers: myHeaders,
        body: JSON.stringify(corpo),
    };

    mostraLoader()
    fetch(url, requestOptions)
        .then(function (result) {
            escondeModal()
            carregaCachorros()
            escondeLoader()
        })
        .catch(error => console.log('error', error));

}

function mostrarModalSalvarCachorro() {
    ativaFuncaoCadastrar()
    mostraModal()
}

function atualizaCachorro(id) {
    ativaFuncaoAtualizar()
    mostraModal()
    mostraLoader()
    fetch(`${SERVER_URL}/cachorros/${id}`, {
        method: 'GET',
    })
        .then(result => result.json())
        .then(function (cachorro) {
            console.log(cachorro)

            const idDom = document.getElementById('cachorro_id')
            const nomeDom = document.getElementById('cachorro_nome')
            const donoDom = document.getElementById('cachorro_dono')
            const telefoneDom = document.getElementById('cachorro_telefone')
            const observacoesDOM = document.getElementById('cachorro_observacoes')

            idDom.value = cachorro.id
            nomeDom.value = cachorro.nome
            donoDom.value = cachorro.dono
            telefoneDom.value = cachorro.telefone
            observacoesDOM.value = cachorro.observacoes

            M.updateTextFields()
            escondeLoader()
        })

}

function carregaCachorros() {
    const myHeaders = new Headers();

    mostraLoader()
    fetch(`${SERVER_URL}/cachorros/`, {
        method: 'GET',
        headers: myHeaders
    })
        .then(result => result.json())
        .then(function (listaCachorros) {

            const tableDom = document.getElementById('table-cachorros')

            tableDom.innerHTML = ''

            for (let cachorro of listaCachorros) {
                console.log(cachorro)

                tableDom.innerHTML += `
                <tr>
                    <td>${cachorro.nome}</td>
                    <td>${cachorro.dono}</td>
                    <td>${cachorro.telefone}</td>
                    <td>
                        <a onclick="atualizaCachorro(${cachorro.id})">
                            <i class=" material-icons">edit</i>
                        </a>
                        <a onclick="excluiCachorro(${cachorro.id})">
                            <i class=" material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            `
            }
            escondeLoader()
        })
        .catch(error => console.log('error', error));
}

function mostraLoader() {
    const loaderDom = document.getElementById('loader')
    loaderDom.classList.remove("hide");
}

function escondeLoader() {
    const loaderDom = document.getElementById('loader')
    loaderDom.classList.add("hide");
}

function mostraModal() {
    const div = document.getElementById('modal-form')
    div.classList.add('mostra-modal')
    div.classList.remove('hide')
}


function escondeModal() {
    const div = document.getElementById('modal-form')
    div.classList.remove('mostra-modal')
    div.classList.add('hide')
}

function ativaFuncaoAtualizar() {
    const botaoDom = document.getElementById('btn-form-cachorro')
    botaoDom.innerHTML = 'atualizar'

    const titulo = document.getElementById('titulo_modal')
    titulo.innerHTML = 'Atualizar Cachorro'
}

function ativaFuncaoCadastrar() {
    const botaoDom = document.getElementById('btn-form-cachorro')
    botaoDom.innerHTML = 'salvar'

    const titulo = document.getElementById('titulo_modal')
    titulo.innerHTML = 'Cadastrar um Cachorro'
}
