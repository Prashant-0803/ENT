let questions = [];
let current = 0;
let answered = false;

let attempted = 0;
let correctCount = 0;
let wrongCount = 0;

// store wrong questions with full options + user choice
let wrongQuestions = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQ();
  });

function loadQ() {
  answered = false;
  const q = questions[current];

  document.getElementById("questionBox").innerHTML =
    `<h3>${current + 1}. ${q.question}</h3>`;

  let html = "";
  q.options.forEach((opt, i) => {
    if (opt.trim() !== "") {
      html += `<div class="option" onclick="check(${i}, this)">
                ${opt}
              </div>`;
    }
  });

  document.getElementById("optionsBox").innerHTML = html;
}

function check(index, el) {
  if (answered) return;
  answered = true;

  attempted++;

  const correct = 0; // correct option always first
  const options = document.querySelectorAll(".option");

  // mark correct option
  options[correct].classList.add("correct");

  if (index === correct) {
    correctCount++;
  } else {
    wrongCount++;
    el.classList.add("wrong");

    // store wrong question details
    wrongQuestions.push({
      question: questions[current].question,
      options: questions[current].options,
      userChoice: index
    });
  }
}

function nextQ() {
  if (current < questions.length - 1) {
    current++;
    loadQ();
  } else {
    showResult();
  }
}

function prevQ() {
  if (current > 0) {
    current--;
    loadQ();
  }
}

function jumpQ() {
  const n = parseInt(document.getElementById("jumpInput").value);
  if (n >= 1 && n <= questions.length) {
    current = n - 1;
    loadQ();
  }
}

function showResult() {
  let html = `
    <h2>Result Summary</h2>
    <p><s
