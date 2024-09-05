
let proposicao = "";

function addCaractere(caract) {
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
            .replace(/↔/g, '==')
            .replace(/\^/g, '&&')
            .replace(/v/g, '||')
            .replace(/~/g, '!')
            .replace(/true/g, 'true')
            .replace(/false/g, 'false')
            .replace(/V/g, 'true')
            .replace(/F/g, 'false')
            
        if (expressao.includes("→")) {
            let partes = expressao.split("→").map(p => p.trim());
    
            // A primeira parte é o início do novo resultado
            let novoResultado = partes[0];
    
            // Itera sobre as partes para converter as implicações
            for (let i = 1; i < partes.length; i++) {
                novoResultado = `((!${novoResultado}) || ${partes[i]})`;
            }
    
            expressao = novoResultado;
        }
        
        expressao = removerParentesesOciosos(expressao);
        
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

function removerParentesesOciosos(expressao) {
    // Função para verificar se a expressão tem parênteses balanceados
    function balancearParenteses(exp) {
        let stack = [];
        let resultado = '';
        for (let char of exp) {
            if (char === '(') {
                stack.push('(');
                resultado += char;
            } else if (char === ')') {
                if (stack.length > 0) {
                    stack.pop();
                    resultado += char;
                }
            } else {
                resultado += char;
            }
        }
        return resultado;
    }

    // Remove parênteses redundantes
    function removerParentesesRedundantes(exp) {
        let resultado = '';
        let i = 0;

        while (i < exp.length) {
            if (exp[i] === '(') {
                let j = i;
                // Encontra o parêntese de fechamento correspondente
                let count = 1;
                while (count > 0 && j < exp.length) {
                    j++;
                    if (exp[j] === '(') count++;
                    if (exp[j] === ')') count--;
                }
                
                // Verifica se os parênteses são redundantes
                let subExpr = exp.slice(i + 1, j);
                if (subExpr && subExpr[0] === '(' && subExpr[subExpr.length - 1] === ')') {
                    subExpr = subExpr.slice(1, -1); // Remove parênteses internos
                }

                resultado += subExpr;
                i = j + 1;
            } else {
                resultado += exp[i];
                i++;
            }
        }

        return resultado;
    }

    // Balanceia parênteses e remove redundâncias
    let expressaoBalanceada = balancearParenteses(expressao);
    let expressaoLimpa = removerParentesesRedundantes(expressaoBalanceada);

    return expressaoLimpa;
}

export { proposicao, deleteProp, addCaractere, gerarTabelaVerdade, verificarClassificacao }
