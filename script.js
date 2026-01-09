let questions = [];
let current = 0;
let answered = false;

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

  const correct = 0; // ALWAYS first option

  const options = document.querySelectorAll(".option");

  options[correct].classList.add("correct");

  if (index !== correct) {
    el.classList.add("wrong");
  }
}

function nextQ() {
  if (current < questions.length - 1) {
    current++;
    loadQ();
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
