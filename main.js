const button = document.querySelector('.button-add-task') // Usei para conectar o button do html com o javascript
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = [] // as tarefas adicionadas na verdade são uma lista, por isso precisamos do array para ir adicionando as tarefas em lista


function adicionarTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    }) // o metodo push vai adicionar o valor digitado no input no array (lista)

    input.value = ''

    mostrarTarefa()  //aqui estou chamando a função mostrarTarefa para exibir na tela a tarefa adicionada pela função adicionarTarefa
}

function mostrarTarefa() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, index) => { // o foreach vai pegando cada item da lista (array) e executando o comando que definirmos dentro da função.
        novaLi = novaLi + `

            <li class="task ${item.concluida && "done"}">
                <img src="assets/images/checked.png" alt="checked" onclick="concluirTarefa(${index})">
                <p>${item.tarefa}</p>
                <img src="assets/images/trash.png" alt="Excluir Tarefa" onclick="deletarItem(${index})">
            </li>

        `
    })

    listaCompleta.innerHTML = novaLi  //innerHTML permite que eu insira informações no HTML através do JavaScript

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(index) {
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida

    mostrarTarefa()
}

function deletarItem(index) {
    minhaListaDeItens.splice(index, 1)

    mostrarTarefa()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefa()
}

recarregarTarefas()

button.addEventListener('click', adicionarTarefa) //chama a função pegarValorDoInput quando clicar no botão
