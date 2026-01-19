let questions = [];
let index = 0;
let answered = [];

document.querySelectorAll(".subject-btn").forEach(btn => {
  btn.onclick = () => loadSubject(btn.dataset.subject);
});

function loadSubject(subject) {
  fetch(`${subject}.json`)
    .then(r => r.json())
    .then(data => {
      questions = shuffle(data);
      index = 0;
      answered = new Array(questions.length).fill(null);

      hideAll();
      document.getElementById("quizScreen").style.display = "block";
      document.getElementById("title").innerText =
        subject.toUpperCase() + " " + questions.length;

      showQuestion();
    });
}

function showQuestion() {
  const q = questions[index];
  document.getElementById("questionText").innerText =
    `${index + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.filter(o => o).forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    if (answered[index] !== null) {
      if (i === q.answer) div.classList.add("correct");
      if (i === answered[index] && i !== q.answer)
        div.classList.add("wrong");
    }

    div.onclick = () => {
      if (answered[index] === null) {
        answered[index] = i;
        showQuestion();
      }
    };

    optionsDiv.appendChild(div);
  });
}

function nextQuestion() {
  if (index < questions.length - 1) {
    index++;
    showQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
  }
}

function jumpTo() {
  const n = parseInt(document.getElementById("jumpInput").value);
  if (n >= 1 && n <= questions.length) {
    index = n - 1;
    showQuestion();
  }
}

function showResult() {
  hideAll();
  document.getElementById("resultScreen").style.display = "block";

  let attempted = answered.filter(a => a !== null).length;
  let correct = answered.filter((a, i) => a === questions[i].answer).length;
  let wrong = attempted - correct;

  document.getElementById("resultStats").innerHTML = `
    Total: ${questions.length}<br>
    Attempted: ${attempted}<br>
    Correct: ${correct}<br>
    Wrong: ${wrong}
  `;

  const wrongList = document.getElementById("wrongList");
  wrongList.innerHTML = "<h3>Wrong Questions</h3>";

  questions.forEach((q, i) => {
    if (answered[i] !== null && answered[i] !== q.answer) {
      const div = document.createElement("div");
      div.className = "wrong-question";
      div.innerHTML
