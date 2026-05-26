// QUIZ

const questions = [
  {
    question: "Qual material demora mais para se decompor?",
    answers: ["Papel", "Vidro", "Casca de banana"],
    correct: 1
  },
  {
    question: "O que ajuda a diminuir o aquecimento global?",
    answers: ["Desmatamento", "Plantar árvores", "Queimar lixo"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

function loadQuestion(){
  const q = questions[currentQuestion];

  questionEl.innerText = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((answer, index)=>{
    const btn = document.createElement("button");

    btn.innerText = answer;

    btn.onclick = ()=>checkAnswer(index);

    answersEl.appendChild(btn);
  });
}

function checkAnswer(index){
  if(index === questions[currentQuestion].correct){
    score += 10;
    scoreEl.innerText = score;
  }

  currentQuestion++;

  if(currentQuestion < questions.length){
    loadQuestion();
  }else{
    questionEl.innerText = "Quiz finalizado!";
    answersEl.innerHTML = "";
  }
}

loadQuestion();


// SIMULADOR

const trees = document.getElementById("trees");
const treesResult = document.getElementById("treesResult");

function updateSimulator(){
  const value = trees.value;

  treesResult.innerText =
    `${value} árvores podem absorver aproximadamente ${value * 22}kg de CO₂ por ano.`;
}

trees.addEventListener("input", updateSimulator);

updateSimulator();


// MINI GAME

let gameScore = 0;

const gameBtn = document.getElementById("gameBtn");
const gameScoreEl = document.getElementById("gameScore");

gameBtn.addEventListener("click", ()=>{
  gameScore++;

  gameScoreEl.innerText = gameScore;

  gameBtn.style.transform = "scale(1.2)";

  setTimeout(()=>{
    gameBtn.style.transform = "scale(1)";
  },100);
});


// GRÁFICO

const ctx = document.getElementById('ecoChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Reciclagem', 'Energia Solar', 'Árvores'],
    datasets: [{
      label: 'Impacto Sustentável',
      data: [12, 19, 25],
      borderWidth: 1
    }]
  },
  options: {
    responsive:true
  }
});