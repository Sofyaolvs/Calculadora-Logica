// Variavel Global Display
let proposicao = "";

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

function gerarTabelaVerdade(proposicao) {
    //pega todas as variaveis 
    const variaveis = Array.from(new Set(proposicao.replace(/[^A-Z]/g, '')));
    const linhas = Math.pow(2, variaveis.length);  //calcula o numero de linhas

    let tabelaHtml = '<table class="table"><tr>'; //cria uma string p armazenar o conteudo ,
    //cria <table> vai ser container da tabela html e 
    //atribuiu a classe table por causa do css
    variaveis.forEach(v => tabelaHtml += `<th>${v}</th>`);//itera o array variaveis e pra cada variavel "v"
    // add um 
    tabelaHtml += `<th>${proposicao}</th></tr>`; //cabeçalho das colunas e adc a ultima celula de cabeçalho(linha)

}
export { proposicao, deleteProp, addCaractere, gerarTabelaVerdade }
