export let proposicao = "";

// Função para adicionar texto à proposição
export function addProp(text) {
    proposicao += text;
    atualizarProp();
}

// Função para deletar o último caractere ou limpar a proposição
export function deleteProp(text) {
    if (text === "⌫") {
        proposicao = proposicao.slice(0, -1);
    } else {
        proposicao = "";
    }
    atualizarProp();
}

// Função para atualizar o display 
export function atualizarProp() {
    document.getElementById('display').value = proposicao;
}

export function addCaractere(caract) {
    proposicao += caract; // Adiciona letra/caractere na proposição
    atualizarProp();
}


