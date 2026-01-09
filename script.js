let questions = [];
let current = 0;
let answered = false;

let attempted = 0;
let correctCount = 0;
let wrongCount = 0;

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

  options[correct].classList.add("correct");

  if (index === correct) {
    correctCount++;
  } else {
    wrongCount++;
    el.classList.add("wrong");

    wrongQuestions.push({
      question: questions[current].question,
      correctAnswer: questions[current].options[0]
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
    <p><strong>Total Attempted:</strong> ${attempted}</p>
    <p><strong>Correct Answers:</strong> ${correctCount}</p>
    <p><strong>Wrong Answers:</strong> ${wrongCount}</p>
    <hr>
    <h3>Wrong Questions Review</h3>
  `;

  if (wrongQuestions.length === 0) {
    html += `<p>🎉 Excellent! No wrong answers.</p>`;
  } else {
    wrongQuestions.forEach((wq, i) => {
      html += `
        <div style="margin-bottom:10px;">
          <strong>${i + 1}. ${wq.question}</strong><br>
          <span style="color:green;">Correct Answer: ${wq.correctAnswer}</span>
        </div>
      `;
    });
  }

  document.querySelector(".container").innerHTML = html;
}
