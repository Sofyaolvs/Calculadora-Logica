# Calculadora-Logica
Calculadora Lógica desenvolvida para a matéria de Matemática Discreta no curso de Ciência da Computação. Este projeto visa auxiliar no aprendizado de operadores lógicos e proposições.

Funcionalidades
A calculadora permite a criação e manipulação de proposições lógicas usando os operadores básicos de lógica booleana, 
como conjunção (AND), disjunção (OR), negação (NOT), implicação (IF), bicondicional (IF AND ONLY IF),
além de valores verdadeiros e falsos.

Interface:
Proposições: O usuário pode inserir variáveis proposicionais (A, B, C) e operadores lógicos (^, v, →, ↔, ~).
Botões de Controle: Há botões para limpar toda a proposição (C), apagar o último caractere (⌫), e calcular a tabela-verdade (=).

Como usar:
Insira variáveis e operadores na ordem desejada usando os botões da calculadora.
A proposição será exibida na área de exibição (textarea).
Ao pressionar o botão =, a calculadora gera uma tabela verdade correspondente à proposição inserida.
A tabela é exibida abaixo da calculadora, mostrando os resultados para todas as combinações possíveis de valores verdadeiros e falsos das variáveis.

Como funciona:
Função addCaractere: Responsável por adicionar os caracteres na proposição e garantir que a entrada seja válida.
Função deleteProp: Limpa a proposição ou apaga o último caractere inserido.
Função gerarTabelaVerdade: Gera e exibe a tabela verdade baseada nas variáveis e operadores lógicos inseridos.
Função avaliarExpressao: Avalia a proposição substituindo os operadores lógicos por equivalentes em JavaScript.

Como rodar o projeto:
1.Clone o repositório.
2.Abra o arquivo index.html no navegador.
