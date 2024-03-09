const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
let correctCount = 0;
let wrongCount = 0;
let seconds = 60;
let timerInterval;

// Calcola la percentuale in base alle risposte
function calculatePercentage(count, total) {
  return (count / total) * 100;
}

// Aggiorna il contatore delle domande
function updateQuestionCounter() {
  const questionCounterElement = document.getElementById("questionCounter");
  questionCounterElement.innerHTML = `QUESTION ${
    currentQuestionIndex + 1
  }<span class="numeroColorato"> / ${totalQuestions}</span>`;
}

// Avvia il quiz
function startQuiz() {
  resetTimer();
  resetAnimation();
  displayQuestions(questions[currentQuestionIndex]);
  startTimer();
}

// Avvia il timer
function startTimer() {
  timerInterval = setInterval(function () {
    if (seconds >= 0) {
      updateTimerDisplay();
      updateAnimation();
    } else {
      clearInterval(timerInterval);
      handleTimeout();
    }
    seconds--;
  }, 1000);
}

// Resettare completamente il timer
function resetTimer() {
  clearInterval(timerInterval);
  seconds = 60;
  updateTimerDisplay();
}

// Aggiorna la visualizzazione del timer
function updateTimerDisplay() {
  const timerText = document.getElementById("timerText");
  timerText.textContent = seconds;
}

// Aggiorna l'animazione
function updateAnimation() {
  const progressCircle = document.getElementById("progress-circle");
  const dashOffset = (seconds / 60) * 440;
  progressCircle.style.strokeDashoffset = dashOffset;
}

// Resettare l'animazione
function resetAnimation() {
  const progressCircle = document.getElementById("progress-circle");
  progressCircle.style.strokeDashoffset = 440;
}

// Gestisce il timeout
function handleTimeout() {
  checkAnswer("");
  startQuiz();
}

// Visualizza le domande 
function displayQuestions(question) {
  const questionContainer = document.getElementById("container");
  questionContainer.innerHTML = "";

  const questionElement = document.createElement("div");
  questionElement.innerHTML = `<p class="stilep">${question.question}</p>`;

  const answers = [...question.incorrect_answers, question.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("stileBottoni");
    button.textContent = answer;
    button.addEventListener("click", () =>
      checkAnswer(answer, question.correct_answer)
    );
    questionElement.appendChild(button);
  });

  questionContainer.appendChild(questionElement);
  updateQuestionCounter();
}

// Aggiorna il contatore dei punteggi
function updateScoreCounter() {
  const scoreCounterElement = document.getElementById("scoreCounter");

  const correctPercentage = calculatePercentage(correctCount, totalQuestions);
  const wrongPercentage = calculatePercentage(wrongCount, totalQuestions);

  if (currentQuestionIndex === questions.length) {
    localStorage.setItem("correctPercentage", correctPercentage);
    localStorage.setItem("wrongPercentage", wrongPercentage);
    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("wrongCount", wrongCount);

    clearInterval(timerInterval);
    window.location.href = `./results.html`;
  }
}

// Verifica la risposta
function checkAnswer(selectedAnswer, correctAnswer) {
  clearInterval(timerInterval);

  const feedbackContainer = document.getElementById("feedbackContainer");
  feedbackContainer.innerHTML = "";

  const feedbackElement = document.createElement("div");

  if (selectedAnswer === correctAnswer) {
    feedbackElement.textContent = "Correct Answer!";
    feedbackElement.classList.add("correct-feedback");
    correctCount++;
  } else {
    feedbackElement.textContent =
      "Wrong answer!";
    feedbackElement.classList.add("wrong-feedback");
    wrongCount++;
  }

  feedbackContainer.appendChild(feedbackElement);

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    startQuiz();
  } else {
    updateScoreCounter();
    window.location.href = "./risultati.html";
  }
  updateScoreCounter();
}

// Avvia il quiz quando la pagina è completamente caricata
document.addEventListener("DOMContentLoaded", startQuiz);

// Gestisce l'evento mouseout per prevenire il barare
const quizPageElement = document.getElementById("quizPage");
if (quizPageElement) {
  window.addEventListener("mouseout", function (event) {
    const from = event.relatedTarget || event.toElement;

    if (
      !from ||
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      alert("Don't cheat, we're watching you :)");
    }
  });
} 
