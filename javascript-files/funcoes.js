let proposicao = "";

// Função para deletar o último caractere ou limpar a proposição
function deleteProp(text) {
    if (text === "⌫") {
        proposicao = proposicao.slice(0, -1);
    } else {
        proposicao = "";
    }
    atualizarProp();
}

// Função para atualizar o display 
function atualizarProp() {
    document.getElementById('display').value = proposicao;
}

function addCaractere(caract) {
    proposicao += caract; // Adiciona letra/caractere na proposição
    atualizarProp();
}

export { proposicao, deleteProp, addCaractere }