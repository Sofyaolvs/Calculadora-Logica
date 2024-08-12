import { addCaractere, deleteProp, sentenca } from './funcoes.js';

// Adiciona eventos de clique aos botões de caracteres
document.querySelectorAll('.caract').forEach(function (button) {
    button.addEventListener('click', function () {
        addCaractere(button.textContent);
    });
});

// Evento para o botão de limpar
document.querySelector(".clear-button").addEventListener("click", function () {
    deleteProp("C");
});

// Evento para o botão de backspace
document.querySelector(".back").addEventListener("click", function () {
    deleteProp("⌫");
});

document.querySelector(".equal").addEventListener("click", function () {
    sentenca();
    deleteProp();
})

