// QUIZ

const questions = [
  {
    question: "Qual material demora mais para se decompor?",
    answers: ["Papel", "Vidro", "Casca de banana"],
    correct: 1
  },
  {
    question: "O que ajuda a diminuir o aquecimento global?",
    answers: ["Plantar árvores", "Queimar lixo", "Desmatamento"],
    correct: 0
  },
  {
    question: "Qual energia é renovável?",
    answers: ["Petróleo", "Solar", "Carvão"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

function loadQuestion(){

  if(currentQuestion >= questions.length){

    questionEl.innerHTML = "🎉 Você concluiu o quiz!";
    answersEl.innerHTML = "";

    return;
  }

  const q = questions[currentQuestion];

  questionEl.innerText = q.question;

  answersEl.innerHTML = "";

  q.answers.forEach((answer,index)=>{

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

  }else{

    lives--;

    livesEl.innerText = lives;

    if(lives <= 0){

      questionEl.innerHTML = "❌ Game Over";

      answersEl.innerHTML = "";

      return;
    }
  }

  currentQuestion++;

  loadQuestion();
}

loadQuestion();


// SIMULADOR

const trees = document.getElementById("trees");
const treesResult = document.getElementById("treesResult");

function updateSimulator(){

  const value = trees.value;

  treesResult.innerHTML =
  `🌳 ${value} árvores absorvem aproximadamente <b>${value * 22}kg</b> de CO₂ por ano`;

}

trees.addEventListener("input",updateSimulator);

updateSimulator();


// METAS

const checkboxes = document.querySelectorAll(".goals input");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

checkboxes.forEach(box=>{

  box.addEventListener("change",updateProgress);

});

function updateProgress(){

  let checked = document.querySelectorAll(".goals input:checked").length;

  let total = checkboxes.length;

  let percent = (checked / total) * 100;

  progressBar.style.width = percent + "%";

  progressText.innerText = `${percent}% concluído`;

}


// GAME

const gameArea = document.getElementById("gameArea");

const gameScoreEl = document.getElementById("gameScore");

const timeEl = document.getElementById("time");

const startGame = document.getElementById("startGame");

let gameScore = 0;
let timeLeft = 30;
let gameInterval;
let timer;

const trashItems = ["🧴","📦","🥤","📰","🍾"];

function createTrash(){

  const trash = document.createElement("div");

  trash.classList.add("trash");

  trash.innerText =
  trashItems[Math.floor(Math.random()*trashItems.length)];

  trash.style.left = Math.random() * 90 + "%";

  trash.style.top = Math.random() * 80 + "%";

  trash.onclick = ()=>{

    gameScore++;

    gameScoreEl.innerText = gameScore;

    trash.remove();

  };

  gameArea.appendChild(trash);

  setTimeout(()=>{

    trash.remove();

  },2000);
}

function startEcoGame(){

  gameScore = 0;

  timeLeft = 30;

  gameScoreEl.innerText = gameScore;

  timeEl.innerText = timeLeft;

  gameArea.innerHTML = "";

  gameInterval = setInterval(createTrash,700);

  timer = setInterval(()=>{

    timeLeft--;

    timeEl.innerText = timeLeft;

    if(timeLeft <= 0){

      clearInterval(gameInterval);

      clearInterval(timer);

      alert("🌍 Fim de jogo! Sua pontuação: " + gameScore);

    }

  },1000);
}

startGame.addEventListener("click",startEcoGame);


// GRÁFICO

const ctx = document.getElementById("ecoChart");

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Reciclagem','Energia Solar','Plantio'],
    datasets: [{
      data: [35,25,40]
    }]
  },
  options: {
    responsive:true
  }
});