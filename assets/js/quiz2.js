const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Chi sei?",
    correct_answer: "Tuo Padre",
    incorrect_answers: ["Tuo Nonno", "Tuo Zio", "Pasquale"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Come ci si giustifica quando il corso Epicode ti va male?",
    correct_answer:
      "Ho un giardino",
    incorrect_answers: [
      "Mi impegnero' di piu'",
      "E' colpa di javascript",
      "Nel dubbio gioco a Poker",
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Egidio e' tipo la persona meno perfettina del mondo",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Melissa fa cagare come Leader",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Federico De Ambrosis quanto ama scrivere Pippo Pluto?",
    correct_answer: "E' tipo il suo unico credo",
    incorrect_answers: ["Normale", "Abbastanza", "Troppo"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Dove e' nato Sanam?",
    correct_answer:
      "L'ha generato il male in persona",
    incorrect_answers: ["Africa", "India", "Boh, e' spuntato cosi a caso"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Fra lobbia fa parte di quale lobbia?",
    correct_answer: "Gattari",
    incorrect_answers: ["Ku Klux Klan", "Apple-Fag", "Illuminati"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Quante lauree ha Valerio Casadei?",
    correct_answer: "Infinite",
    incorrect_answers: ["Troppe", "Poche", "Nessuna"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Javascript e' la cosa piu' facile del mondo",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Quanto si e' pentito Mario di aver detto che Javascript e' bello?",
    correct_answer: "Non abbastanza",
    incorrect_answers: ["Poco", "Per niente", "Jakarta"],
  },
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
let correctCount = 0;
let wrongCount = 0;
let seconds = 60;
let timerInterval;

// Calcola la percentuale
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
    feedbackElement.textContent = "Risposta corretta!";
    feedbackElement.classList.add("correct-feedback");
    correctCount++;
  } else {
    feedbackElement.textContent =
      "Riposta sbagliata, ASSHOLE";
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
      alert("Non barare, ti stiamo osservando :)");
    }
  });
}
