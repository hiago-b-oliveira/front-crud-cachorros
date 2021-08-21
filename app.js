
function excluiCachorro(idCachorro) {
    const ok = confirm("Você realmente deseja excluir o cachorro?")
    if (ok) {
        mostraLoader()
        fetch(`http://localhost:3000/cachorros/${idCachorro}`, {
            method: 'DELETE'
        }).then(function () {
            carregaCachorros()
            escondeLoader()
        })
    }
}

function salvarCachorro() {
    const nomeDom = document.getElementById('cachorro_nome')
    const donoDom = document.getElementById('cachorro_dono')
    const telefoneDom = document.getElementById('cachorro_telefone')
    const observacoesDOM = document.getElementById('cachorro_observacoes')

    const corpo = {
        nome: nomeDom.value,
        dono: donoDom.value,
        telefone: telefoneDom.value,
        observacoes: observacoesDOM.value
    }

    nomeDom.value = ''
    donoDom.value = ''
    telefoneDom.value = ''
    observacoesDOM.value = ''

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(corpo),
    };

    mostraLoader()
    fetch("http://localhost:3000/cachorros", requestOptions)
        .then(function (result) {
            escondeModal()
            carregaCachorros()
            escondeLoader()
        })
        .catch(error => console.log('error', error));

}

function carregaCachorros() {
    const myHeaders = new Headers();

    mostraLoader()
    fetch("http://localhost:3000/cachorros/", {
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
                        <a onclick="alert('edit${cachorro.id}')">
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



document.addEventListener("DOMContentLoaded", function () {
    carregaCachorros()
});

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