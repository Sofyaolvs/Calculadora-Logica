import { addCaractere, deleteProp,gerarTabelaVerdade,proposicao, verificarClassificacao} from './funcoes.js';

document.querySelectorAll('.caract').forEach(function (button) {
    button.addEventListener('click', function () {
        addCaractere(button.textContent);
    });
});

document.querySelector(".clear-button").addEventListener("click", function () {
    deleteProp("C");
});

document.querySelector(".back").addEventListener("click", function () {
    deleteProp("⌫");
});

document.querySelector(".equal").addEventListener("click", function() {
    gerarTabelaVerdade(proposicao);
    verificarClassificacao();
    deleteProp("");
});
