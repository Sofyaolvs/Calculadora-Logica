// Variavel Global Display
let proposicao = ""; // Logica Back
let proposicaoDisplay = ""; // Front Display

// Adiciona letra/caractere na proposição
function addCaractere(caract) {
    proposicao += caract;
    proposicaoDisplay += caract;
    atualizarProp();
}

// Função para deletar o último caractere ou limpar a proposição
function deleteProp(text) {
    if (text === "⌫") {
        proposicao = proposicao.slice(0, -1);
        proposicaoDisplay = proposicaoDisplay.slice(0, -1);
    } else {
        proposicao = "";
        proposicaoDisplay = "";
    }
    atualizarProp();
}

// Função para atualizar o display 
function atualizarProp() {
    document.getElementById('display').value = proposicaoDisplay;
}

function sentenca() {

    if (proposicao.includes("→")) {

        let partes = proposicao.split("→");

        let novaProposicao = "";

        for (let i = 1; i < partes.length; i++) {
            let argumentoAnterior = partes[0].trim();
            let argumentoPosterior = partes[1].trim();

            novaProposicao = `!(${argumentoAnterior}) || (${argumentoPosterior})`
        }

        proposicao = novaProposicao;
    }

    if (proposicao.includes("↔")) {
        let partesB = proposicao.split("↔")

        let novaProposicaoB = "";

        for (let i = 0; i < partesB.length; i++) {
            let argumentoAnteriorB = partesB[0].trim();
            let argumentoPosteriorB = partesB[1].trim();

            novaProposicaoB = `(${argumentoAnteriorB} && ${argumentoPosteriorB}) || (!(${argumentoAnteriorB}) && !(${argumentoPosteriorB}))`;
        }

        proposicao = novaProposicaoB;
    }

    let translatedExpression = proposicao.replace(/~/g, "!").replace(/\^/g, "&&").replace(/v/g, "||")

    let result = translatedExpression

    //Valores:
    let valores = [true, false];
    // Sentenca Logica
    const V = true;
    const F = false;

    // if (n == 3) {
    //     sentencaABC(valores, proposicao, result, V, F);
    // } else if (n == 2) {
    //     sentencaAB(valores, proposicao, result, V, F);
    // } else {
    //     sentenceA(valores, proposicao, result, V, F)
    // }
    deleteProp();
    //alert(result);
    //alert(eval(result));
}

function sentencaABC(valores, proposicao, result, V, F) {
    let A;
    let B;
    let C;

    // Inicia a tabela HTML
    document.write("<table border='1'>");
    document.write(`<tr><th>A</th><th>B</th><th>C</th><th>${proposicao}</th></tr>`);

    // Loop para gerar as combinações
    for (let a of valores) {
        A = a;
        for (let b of valores) {
            B = b;
            for (let c of valores) {
                C = c;
                document.write(`<tr><td>${A}</td><td>${B}</td><td>${C}</td><td>${eval(result)}</td></tr>`);
            }
        }
    }

    // Fecha a tabela HTML
    document.write("</table>");
}

export { proposicao, deleteProp, addCaractere, sentenca }