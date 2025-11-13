const board = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
let tempoRestante = 120;
let intervalo;
let acertos = 0;

// Sons
function tocarSomAcerto() {
  const som = new Audio('audio.mp3');
  som.play();
}

function tocarSomErro() {
  const som = new Audio('audiobob.mp3');
  som.play();
}

function tocarSomCelebracao() {
  const som = new Audio('celebracao.mp3');
  som.play();
}

// Perguntas
const perguntas = [
  {
    pergunta: "Qual planeta é conhecido como o planeta vermelho?",
    alternativas: ["Terra", "Marte", "Júpiter", "Vênus"],
    correta: 1
  },
  {
    pergunta: "Qual é o maior animal terrestre?",
    alternativas: ["Elefante", "Girafa", "Hipopótamo", "Rinoceronte"],
    correta: 0
  },
  {
    pergunta: "Quem escreveu 'Dom Quixote'?",
    alternativas: ["Machado de Assis", "Cervantes", "Camões", "Shakespeare"],
    correta: 1
  },
  {
    pergunta: "Qual é o elemento químico H?",
    alternativas: ["Hélio", "Hidrogênio", "Mercúrio", "Oxigênio"],
    correta: 1
  },
  {
    pergunta: "Quantos continentes existem?",
    alternativas: ["5", "6", "7", "8"],
    correta: 2
  },
  {
    pergunta: "Qual é a capital da França?",
    alternativas: ["Paris", "Londres", "Roma", "Berlim"],
    correta: 0
  },
  {
    pergunta: "Qual é o resultado de 9 x 7?",
    alternativas: ["63", "72", "56", "49"],
    correta: 0
  },
  {
    pergunta: "Qual instrumento tem teclas?",
    alternativas: ["Violino", "Piano", "Flauta", "Violão"],
    correta: 1
  },
  {
    pergunta: "Qual é a cor da clorofila?",
    alternativas: ["Verde", "Azul", "Amarela", "Vermelha"],
    correta: 0
  },
  {
    pergunta: "Qual país é famoso pelo sushi?",
    alternativas: ["China", "Coreia", "Japão", "Tailândia"],
    correta: 2
  },
  {
    pergunta: "Qual é o menor número primo?",
    alternativas: ["1", "2", "3", "5"],
    correta: 1
  },
  {
    pergunta: "Qual é o nome do satélite natural da Terra?",
    alternativas: ["Lua", "Sol", "Estrela", "Marte"],
    correta: 0
  },
  {
    pergunta: "Qual é a função dos pulmões?",
    alternativas: ["Digestão", "Respiração", "Circulação", "Movimento"],
    correta: 1
  },
  {
    pergunta: "Qual é o símbolo da paz?",
    alternativas: ["Coração", "Pomba", "Estrela", "Flecha"],
    correta: 1
  },
  {
    pergunta: "Qual é a moeda do Brasil?",
    alternativas: ["Peso", "Real", "Dólar", "Euro"],
    correta: 1
  },
  {
    pergunta: "Qual é o maior oceano do mundo?",
    alternativas: ["Atlântico", "Índico", "Pacífico", "Ártico"],
    correta: 2
  }
];

// Timer
function atualizarTimer() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  timerDisplay.innerText = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  tempoRestante--;

  if (tempoRestante < 0) {
    clearInterval(intervalo);
    alert("⏰ Tempo esgotado! Tente novamente.");
    desativarCartas();
  }
}

function desativarCartas() {
  const todasAsCartas = document.querySelectorAll(".card");
  todasAsCartas.forEach(card => card.removeEventListener("click", revelarPergunta));
}

// Criação do tabuleiro
function createBoard() {
  perguntas.forEach((pergunta, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.innerText = "❓";
    card.addEventListener("click", revelarPergunta);
    board.appendChild(card);
  });

  atualizarTimer();
  intervalo = setInterval(atualizarTimer, 1000);
}

// Revela pergunta
function revelarPergunta() {
  if (this.classList.contains("respondido")) return;

  const index = parseInt(this.dataset.index);
  const pergunta = perguntas[index];

  const resposta = prompt(
    `${pergunta.pergunta}\n\n` +
    pergunta.alternativas.map((alt, i) => `${i + 1}. ${alt}`).join("\n")
  );

  const escolha = parseInt(resposta) - 1;

  if (escolha === pergunta.correta) {
    tocarSomAcerto();
    this.classList.add("respondido");
    this.innerText = "✅";
    acertos++;

    if (acertos === perguntas.length) {
      clearInterval(intervalo);
      tocarSomCelebracao();
      setTimeout(() => alert("🎉 Parabéns! Você respondeu todas as perguntas!"), 500);
    }
  } else {
    tocarSomErro();
    this.innerText = "❌";
    setTimeout(() => {
      this.innerText = "❓";
    }, 1000);
  }
}

createBoard();
