import { addCaractere, deleteProp } from './funcoes.js';

// Adiciona eventos de clique aos botões de caracteres
document.querySelectorAll('.caract').forEach(function (button) {
    button.addEventListener('click', function () {
        addCaractere(button.textContent);
    });
});

// Eventos para os botões de limpar e backspace
document.querySelector(".clear-button").addEventListener("click", function() {
    deleteProp("C");
});

document.querySelector(".back").addEventListener("click", function() {
    deleteProp("⌫");
});








