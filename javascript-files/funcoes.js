// Variavel Global Display
let proposicao = "";
const hierarquia = ["(", ")", "~", "^", "v", "→", "↔"];

// Adiciona letra/caractere na proposição
function addCaractere(caract) {
    proposicao += caract;
    atualizarProp();
}

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

export { proposicao, deleteProp, addCaractere }