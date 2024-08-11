// Variavel Global Display
let proposicao = "";
//const hierarquia = ["(", ")", "~", "^", "v", "→", "↔"];

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

// Sentenca Logica
const V = true
const F = false

function sentenca() {
    // Testando Afirmacoes
    let A = true
    let B = false
    let C = true

    let translatedExpression = proposicao.replace(/~/g, "!").replace(/\^/g, "&&").replace(/v/g, "||")

    let result = translatedExpression

    alert(result)
    alert(eval(result))
}

export { proposicao, deleteProp, addCaractere, sentenca }