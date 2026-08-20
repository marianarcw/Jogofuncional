const perguntas = [

    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        opcoes: [
            "Terra",
            "Marte",
            "Júpiter",
            "Saturno"
        ],
        correta: 2
    },

    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: [
            "São Paulo",
            "Rio de Janeiro",
            "Brasília",
            "Salvador"
        ],
        correta: 2
    },

    {
        pergunta: "Quanto é 8 × 7?",
        opcoes: [
            "48",
            "54",
            "56",
            "64"
        ],
        correta: 2
    },

    {
        pergunta: "Quem escreveu Dom Casmurro?",
        opcoes: [
            "Machado de Assis",
            "Monteiro Lobato",
            "José de Alencar",
            "Carlos Drummond de Andrade"
        ],
        correta: 0
    },

    {
        pergunta: "Qual processo as plantas usam para produzir seu alimento?",
        opcoes: [
            "Respiração",
            "Fotossíntese",
            "Digestão",
            "Evaporação"
        ],
        correta: 1
    },

    {
        pergunta: "Qual é o maior oceano do planeta?",
        opcoes: [
            "Atlântico",
            "Índico",
            "Ártico",
            "Pacífico"
        ],
        correta: 3
    },

    {
        pergunta: "Quantos estados existem no Brasil?",
        opcoes: [
            "24",
            "25",
            "26",
            "27"
        ],
        correta: 2
    },

    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        opcoes: [
            "Vênus",
            "Marte",
            "Mercúrio",
            "Netuno"
        ],
        correta: 1
    },

    {
        pergunta: "Quanto é 100 ÷ 4?",
        opcoes: [
            "20",
            "25",
            "30",
            "40"
        ],
        correta: 1
    },

    {
        pergunta: "Qual é o idioma oficial do Brasil?",
        opcoes: [
            "Espanhol",
            "Inglês",
            "Português",
            "Francês"
        ],
        correta: 2
    }

];


let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;


const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const contadorElemento = document.getElementById("contador");
const pontuacaoElemento = document.getElementById("pontuacao");
const progressoElemento = document.getElementById("progresso");
const botaoProximo = document.getElementById("botaoProximo");


function mostrarPergunta() {

    respondeu = false;

    botaoProximo.disabled = true;

    const atual = perguntas[perguntaAtual];

    perguntaElemento.textContent = atual.pergunta;

    contadorElemento.textContent =
        "Pergunta " +
        (perguntaAtual + 1) +
        " de " +
        perguntas.length;

    pontuacaoElemento.textContent =
        "Pontos: " + pontos;

    progressoElemento.style.width =
        ((perguntaAtual + 1) /
        perguntas.length * 100) + "%";

    opcoesElemento.innerHTML = "";


    atual.opcoes.forEach(function(opcao, indice) {

        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.className = "opcao";

        botao.addEventListener("click", function() {

            verificarResposta(indice, botao);

        });

        opcoesElemento.appendChild(botao);

    });
}


function verificarResposta(indice, botao) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const respostaCorreta =
        perguntas[perguntaAtual].correta;

    const botoes =
        document.querySelectorAll(".opcao");


    botoes.forEach(function(botao) {

        botao.disabled = true;

    });


    if (indice === respostaCorreta) {

        botao.classList.add("correta");

        pontos++;

        pontuacaoElemento.textContent =
            "Pontos: " + pontos;

    } else {

        botao.classList.add("errada");

        botoes[respostaCorreta]
            .classList.add("correta");

    }


    botaoProximo.disabled = false;
}


botaoProximo.addEventListener("click", function() {

    perguntaAtual++;


    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

});


function mostrarResultado() {

    document
        .getElementById("quiz")
        .classList.add("escondido");

    document
        .getElementById("resultado")
        .classList.remove("escondido");


    document
        .getElementById("pontuacaoFinal")
        .textContent =
        "Você fez " +
        pontos +
        " de " +
        perguntas.length +
        " pontos!";


    let mensagem;


    if (pontos === 10) {

        mensagem =
            "🏆 Perfeito! Você acertou todas!";

    } else if (pontos >= 8) {

        mensagem =
            "👏 Excelente resultado!";

    } else if (pontos >= 6) {

        mensagem =
            "😊 Muito bom!";

    } else if (pontos >= 4) {

        mensagem =
            "📚 Bom esforço! Continue estudando!";

    } else {

        mensagem =
            "💪 Continue estudando e tente novamente!";

    }


    document
        .getElementById("mensagemFinal")
        .textContent = mensagem;

}


document
    .getElementById("botaoReiniciar")
    .addEventListener("click", function() {

        perguntaAtual = 0;

        pontos = 0;

        document
            .getElementById("resultado")
            .classList.add("escondido");

        document
            .getElementById("quiz")
            .classList.remove("escondido");

        mostrarPergunta();

    });


mostrarPergunta();