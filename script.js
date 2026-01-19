let questions = [];
let currentQuestion = 0;

async function loadSubject() {
  const file = document.getElementById("subjectSelect").value;
  const res = await fetch(file);
  questions = await res.json();
  currentQuestion = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").innerHTML =
    `<b>Q${currentQuestion + 1}.</b> ${q.question}`;

  const box = document.getElementById("optionsBox");
  box.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    box.appendChild(btn);
  });
}

function checkAnswer(index, btn) {
  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#optionsBox button");

  buttons.forEach(b => b.disabled = true);

  if (index === correct) {
    btn.style.background = "green";
  } else {
    btn.style.background = "red";
    buttons[correct].style.background = "green";
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

window.onload = loadSubject;
