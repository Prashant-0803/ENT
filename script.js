let questions = [];
let currentIndex = 0;
let answers = [];

document.querySelectorAll(".subject-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const subject = btn.dataset.subject;
    loadSubject(subject);
  });
});

function loadSubject(subject) {
  fetch(`${subject}.json`)
    .then(res => res.json())
    .then(data => {
      questions = shuffleArray(data);
      currentIndex = 0;
      answers = new Array(questions.length).fill(null);

      document.getElementById("subjectScreen").style.display = "none";
      document.getElementById("quizScreen").style.display = "block";

      loadQuestion();
    });
}

function loadQuestion() {
  const q = questions[currentIndex];
  document.getElementById("questionText").innerText =
    `Q${currentIndex + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    if (answers[currentIndex] === i) div.classList.add("selected");
    div.innerText = opt;
    div.onclick = () => {
      answers[currentIndex] = i;
      loadQuestion();
    };
    optionsDiv.appendChild(div);
  });
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

