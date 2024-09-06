let proposicao = "";
let openParentesesCount = 0;

function addCaractere(caract) {
    let ultimoCaract = proposicao.slice(-1);

    // Verifica caracteres inválidos como no seu código original
    if (
        (ultimoCaract === "^" && caract === "v") ||
        (ultimoCaract === "v" && caract === "^") ||
        (ultimoCaract === "^" && caract === "→") ||
        (ultimoCaract === "v" && caract === "→") ||
        (ultimoCaract === "→" && caract === "^") ||
        (ultimoCaract === "→" && caract === "v") ||
        (ultimoCaract === "→" && caract === "↔") ||
        (ultimoCaract === "↔" && caract === "→") ||
        (ultimoCaract === "↔" && caract === "^") ||
        (ultimoCaract === "↔" && caract === "v") ||
        (ultimoCaract === "^" && caract === "↔") ||
        (ultimoCaract === "v" && caract === "↔") ||
        (ultimoCaract === "A" && (caract === "A" || caract === "B" || caract === "C" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (ultimoCaract === "B" && (caract === "A" || caract === "B" || caract === "C" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (ultimoCaract === "C" && (caract === "A" || caract === "B" || caract === "C" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (ultimoCaract === "V" && (caract === "A" || caract === "B" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (ultimoCaract === "F" && (caract === "A" || caract === "B" || caract === "(" || caract === "~" || caract === "V" || caract === "F")) ||
        (ultimoCaract === "(" && (caract === ")" || caract === "v" || caract === "^" || caract === "→" || caract === "↔")) ||
        (ultimoCaract === ")" && (caract === "A" || caract === "B" || caract === "C" || caract === "~" || caract === "V" || caract === "F" || caract === "(")) ||
        (proposicao === "" && (caract === ")" || caract === "↔" || caract === "→" || caract === "v" || caract === "^"))
    ) {
        // Caractere inválido, não faz nada
        return;
    }

    // Lógica de parênteses
    if (caract === "(") {
        openParentesesCount++; // Incrementa quando um parêntese de abertura é adicionado
    } else if (caract === ")") {
        // Verifica se há parênteses abertos suficientes para fechar
        if (openParentesesCount > 0) {
            openParentesesCount--; // Fecha um parêntese
        } else {
            // Não há parênteses de abertura suficientes, caractere inválido
            return;
        }
    }

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
    // Extrai variáveis únicas da proposição
    const variaveis = Array.from(new Set(proposicao.match(/[A-C]/g) || []));

    // Calcula o número de linhas da tabela verdade
    const linhas = Math.pow(2, variaveis.length);

    // Cria o cabeçalho da tabela
    let tabelaHtml = '<table class="table"><tr>';
    variaveis.forEach(v => tabelaHtml += `<th>${v}</th>`);
    tabelaHtml += `<th>${proposicao}</th></tr>`;

    // Função para substituir variáveis e operadores lógicos
    function substituirVariaveis(exp, valores) {
        let expressao = exp;
        variaveis.forEach(v => {
            expressao = expressao.replace(new RegExp(v, 'g'), valores[v] ? 'false' : 'true');
        });
        return expressao;
    }

    // Função para avaliar expressões lógicas com precedência
    function avaliarExpressao(expressao) {
        // Substitui operadores lógicos por seus equivalentes JavaScript
        expressao = expressao
            .replace(/↔/g, '===')
            .replace(/\^/g, '&&')
            .replace(/v/g, '||')
            .replace(/~/g, '!')
            .replace(/true/g, 'true')
            .replace(/false/g, 'false')
            .replace(/V/g, 'true')
            .replace(/F/g, 'false')

        if (expressao.includes("→")) {
            // Função auxiliar para converter uma implicação
            const converter = (partes) => {
                let novoResultado = partes[0];
                for (let i = 1; i < partes.length; i++) {
                    novoResultado = `((!(${novoResultado})) || (${partes[i]}))`;
                }
                return novoResultado;
            };

            // Primeiramente, lidamos com as expressões entre parênteses
            const regexParenteses = /\(([^()]+)\)/g;
            let match;

            // Processa as expressões dentro de parênteses
            while ((match = regexParenteses.exec(expressao)) !== null) {
                let subExpressao = match[1];
                if (subExpressao.includes("→")) {
                    let partes = subExpressao.split("→").map(p => p.trim());
                    let novoResultado = converter(partes);
                    expressao = expressao.replace(match[0], `(${novoResultado})`);
                }
            }

            // Lida com o que sobrou fora dos parênteses
            if (expressao.includes("→")) {
                let partes = expressao.split("→").map(p => p.trim());
                expressao = converter(partes);
            }
        }


        //expressao = removerParentesesOciosos(expressao);

        // Avalia a expressão lógica
        try {
            alert(expressao)
            return eval(expressao) ? 'V' : 'F';
        } catch (e) {
            console.error('Erro na avaliação da expressão:', expressao, e);
            return 'Erro';
        }
    }

    // Função para processar e avaliar a proposição
    function calcularValor(exp, valores) {
        let expressao = substituirVariaveis(exp, valores);
        return avaliarExpressao(expressao);
    }

    // Gera as linhas da tabela
    for (let i = 0; i < linhas; i++) {
        let valores = {};

        // Calcula o valor de verdade para cada variável
        variaveis.forEach((v, index) => {
            valores[v] = (i >> (variaveis.length - index - 1)) & 1;
        });

        // Calcula o valor da proposição para o conjunto atual de valores
        const resultado = calcularValor(proposicao, valores);

        // Adiciona uma linha na tabela
        tabelaHtml += '<tr>';
        variaveis.forEach(v => tabelaHtml += `<td>${valores[v] ? 'F' : 'V'}</td>`);
        tabelaHtml += `<td>${resultado}</td></tr>`;
    }

    // Finaliza a tabela
    tabelaHtml += '</table>';

    // Insere a tabela no HTML
    document.getElementById('table').innerHTML = tabelaHtml;
}

function verificarClassificacao() {
    // Seleciona todas as células da última coluna da tabela verdade
    const resultados = document.querySelectorAll('#table td:last-child');

    // Variáveis para controle
    let todosVerdadeiros = true;
    let todosFalsos = true;

    // Itera sobre todos os resultados da proposição
    resultados.forEach(resultado => {
        const valor = resultado.textContent.trim();
        if (valor === 'F') {
            todosVerdadeiros = false; // Se algum resultado for falso, não é tautologia
        } else if (valor === 'V') {
            todosFalsos = false; // Se algum resultado for verdadeiro, não é contradição
        }
    });

    // Determina a classificação da proposição
    let classificacao = '';
    if (todosVerdadeiros) {
        classificacao = 'Tautologia';
    } else if (todosFalsos) {
        classificacao = 'Contradição';
    } else {
        classificacao = 'Contingência';
    }

    // Exibe a classificação no HTML
    const titulo = document.getElementById('result-title');
    titulo.textContent = `Classificação: ${classificacao}`;
    document.body.innerHtml(titulo);
}


export { proposicao, deleteProp, addCaractere, gerarTabelaVerdade, verificarClassificacao }
