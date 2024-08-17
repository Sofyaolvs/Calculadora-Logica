
let proposicao = "";

function addCaractere(caract) {
    // let parametroI = false;
    // for(let k in caract){
    //     if(k == "("){
    //         parametroI = true
    //         break;
    //     }
    // }
    if (
        (proposicao.slice(-1) === "^" && caract === "v") ||
        (proposicao.slice(-1) === "v" && caract === "^") ||
        (proposicao.slice(-1) === "^" && caract === "→") ||
        (proposicao.slice(-1) === "v" && caract === "→") ||
        (proposicao.slice(-1) === "→" && caract === "^") ||
        (proposicao.slice(-1) === "→" && caract === "v") ||
        (proposicao.slice(-1) === "→" && caract === "↔") ||
        (proposicao.slice(-1) === "↔" && caract === "→") ||
        (proposicao.slice(-1) === "↔" && caract === "^") ||
        (proposicao.slice(-1) === "↔" && caract === "v") ||
        (proposicao.slice(-1) === "^" && caract === "↔") ||
        (proposicao.slice(-1) === "v" && caract === "↔") ||
        (proposicao.slice(-1) === "A" && (caract === "B" || caract === "C" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === "B" && (caract === "A" || caract === "C" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === "C" && (caract === "A" || caract === "B" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === "V" && (caract === "A" || caract === "B" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === "F" && (caract === "A" || caract === "B" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === "(" && (caract === ")" || caract === "v" || caract === "^" || caract === "→" || caract === "↔" || caract === "V" || caract === "F")) ||
        (proposicao.slice(-1) === ")" && (caract === "A" || caract === "B" || caract === "C" || caract === "~" || caract === "V" || caract === "F" || caract == "(")) ||
        (proposicao === "" && (caract === ")" || caract === "↔" || caract === "→" || caract === "v" || caract === "^"))
    ) {
        //alert("Caractere inválido");
    } else {
        proposicao += caract;
        atualizarProp();
    }

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
    // pegas as variaveis proposição
    //  `replace` remove  os caracteres que não são letras 
    //  `Set` faz com q cada variavel apareça so uma vez, o `Array.from` converte o set pra um array.
    const variaveis = Array.from(new Set(proposicao.replace(/[^A-Z]/g, '')));

    // calcula o num de linhas da tabela vdd
    // 2^num variaveis
    const linhas = Math.pow(2, variaveis.length);

    // criação da tabela  A primeira linha da tabela tem o nome das variaveis e proposiçao
    let tabelaHtml = '<table class="table"><tr>';

    // adc cabeçalho de coluna para cada var
    variaveis.forEach(v => tabelaHtml += `<th>${v}</th>`);

    // adc cabeçalho de coluna para a proposiçao
    tabelaHtml += `<th>${proposicao}</th></tr>`;

    // P cada combinaçao cria um obj pra aramzenar V ou F na linha
    for (let i = 0; i < linhas; i++) {
        let valores = {};

        // p cada var calcula o valor vdd ( v ou f)
        variaveis.forEach((v, index) => {
            valores[v] = (i >> (variaveis.length - index - 1)) & 1 ? 'F' : 'V';
        });

        // Substitui cada variável na proposição pelo valor de verdade correspondente ('V' ou 'F').
        let resultado = proposicao.replace(/[A-Z]/g, m => valores[m]);

        // avalia a proposiçao
        // substitui v e f por 1 e 0 para facilitar com `eval`.
        // susbtitui os caracteres por valores q o js entende
        resultado = resultado
            .replace(/~(V|F)/g, (_, p1) => (p1 === 'V' ? 'F' : 'V'))
            .replace(/V/g, '1').replace(/F/g, '0')
            .replace(/\^/g, '&&').replace(/v/g, '||')
            .replace(/↔/g, '===');

        // Reescrita da Implicação
        if (resultado.includes("→")) {

            let partes = resultado.split("→");

            let novoResultado = partes[0].trim();

            for (let i = 1; i < partes.length; i++) {
                let argumentoAnterior = novoResultado;
                let argumentoPosterior = partes[1].trim()

                novoResultado = `!(${argumentoAnterior}) || (${argumentoPosterior})`
            }

            resultado = novoResultado;
        }


        //  `eval` p avaliar a expressão logica final e dizer se é true (1) ou falsa (0).
        // converte o resultadi p v ou f dnv
        const valorFinal = eval(resultado) ? 'V' : 'F';

        // começa uma nova linha na tabela
        tabelaHtml += '<tr>';

        // Adiciona uma celula para o valor vdd de cada var
        variaveis.forEach(v => tabelaHtml += `<td>${valores[v]}</td>`);

        // Adiciona uma celula(linha) para o resultado final da proposiçao
        tabelaHtml += `<td>${valorFinal}</td></tr>`;
    }

    // termina a tabela
    tabelaHtml += '</table>';

    // bota a tabela no html 
    document.getElementById('table').innerHTML = tabelaHtml;
}

export { proposicao, deleteProp, addCaractere, gerarTabelaVerdade }
