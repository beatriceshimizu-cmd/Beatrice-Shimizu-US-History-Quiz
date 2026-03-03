const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");


const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const startButton = document.getElementById("start-btn");

let shuffledQuestions, currentQuestionIndex, score;
let wrongAnswers = [];

const questions = [
  {
    question: "Who was the first president of the United States?",
    answers: [
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "Abraham Lincoln", correct: false },
      { text: "Benjamin Franklin", correct: false },
    ],
  },
  {
    question: "What year did the American Revolutionary War end?",
    answers: [
      { text: "1776", correct: false },
      { text: "1781", correct: false },
      { text: "1783", correct: true },
      { text: "1801", correct: false },
    ],
  },
  {
    question: "Which document declared American independence from Britain?",
    answers: [
      { text: "The Constitution", correct: false },
      { text: "The Bill of Rights", correct: false },
      { text: "The Emancipation Proclamation", correct: false },
      { text: "The Declaration of Independence", correct: true },
    ],
  },
  {
    question: "What was the main issue of the Civil War?",
    answers: [
      { text: "Independence from Britain", correct: false },
      { text: "Abolition of slavery", correct: true },
      { text: "Women's suffrage", correct: false },
      { text: "Prohibition", correct: false },
    ],
  },
  {
    question: "Who was president during the Great Depression and World War II?",
    answers: [
      { text: "Herbert Hoover", correct: false },
      { text: "Franklin D. Roosevelt", correct: true },
      { text: "Harry S. Truman", correct: false },
      { text: "Dwight D. Eisenhower", correct: false },
    ],
  },
  {
    question: "In what year did women in the United States gain the right to vote?",
    answers: [
      { text: "1848", correct: false },
      { text: "1920", correct: true },
      { text: "1945", correct: false },
      { text: "1965", correct: false },
    ],
  },
  {
    question:
      "Which one of the founding fathers listed below was not a president of the United States?",
    answers: [
      { text: "George Washington", correct: false },
      { text: "Thomas Jefferson", correct: false },
      { text: "Benjamin Franklin", correct: true },
      { text: "John Adams", correct: false },
    ],
  },
  {
    question:
      "Which of the following presidents had not previously served as vice president?",
    answers: [
      { text: "George H.W. Bush", correct: false },
      { text: "Barack Obama", correct: true },
      { text: "Lyndon B. Johnson", correct: false },
      { text: "Richard Nixon", correct: false },
    ],
  },
  {
    question:
      "Which of the following people was nominated but not confirmed as a Supreme Court Justice?",
    answers: [
      { text: "Sandra Day O'Connor", correct: false },
      { text: "Ruth Bader Ginsburg", correct: false },
      { text: "Merrick Garland", correct: true },
      { text: "Clarence Thomas", correct: false },
    ],
  },
  {
    question: "How many original colonies formed the United States?",
    answers: [
      { text: "13", correct: true },
      { text: "12", correct: false },
      { text: "14", correct: false },
      { text: "15", correct: false },
    ],
  },
  {
    question: "In what year did the United States Constitution go into effect?",
    answers: [
      { text: "1787", correct: true },
      { text: "1776", correct: false },
      { text: "1789", correct: false },
      { text: "1791", correct: false },
    ],
  },
  {
    question: "How many amendments are there in the United States Bill of Rights?",
    answers: [
      { text: "10", correct: true },
      { text: "12", correct: false },
      { text: "15", correct: false },
      { text: "20", correct: false },
    ],
  },
];


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  quizBox.classList.remove("hide");
  startQuiz();
});

function startQuiz() {
  score = 0;
  wrongAnswers = [];

  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const radios = Array.from(answerButtons.querySelectorAll("input"));
  const answerIndex = radios.findIndex((radio) => radio.checked);

  if (answerIndex === -1) {
    alert("Please select an answer.");
    return;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion.answers[answerIndex];

  if (selectedAnswer.correct) {
    score++;
  } else {
    const correctAnswer = currentQuestion.answers.find((a) => a.correct);

    wrongAnswers.push({
      question: currentQuestion.question,
      yourAnswer: selectedAnswer.text,
      correctAnswer: correctAnswer.text,
    });
  }

  currentQuestionIndex++;

  if (shuffledQuestions.length > currentQuestionIndex) {
    setNextQuestion();
  } else {
    endQuiz();
  }
});


restartButton.addEventListener("click", () => {
  quizBox.classList.add("hide");
  startScreen.classList.remove("hide");

  
  resultDiv.classList.add("hide");
  resultDiv.innerHTML = "";
});


function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");

  let html = `<p>Your final score: ${score} / ${shuffledQuestions.length}</p>`;

  if (wrongAnswers.length > 0) {
    html += `
      <button id="review-btn" class="btn review-btn" type="button">
        Review Incorrect Questions
      </button>

      <div id="wrong-list" class="wrong-list hide">
        <h4>Questions You Got Wrong:</h4>
        ${wrongAnswers
          .map(
            (item) => `
              <div class="wrong-item">
                <p><strong>Question:</strong> ${item.question}</p>
                <p><strong>Your Answer:</strong> ${item.yourAnswer}</p>
                <p><strong>Correct Answer:</strong> ${item.correctAnswer}</p>
                <hr>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  } else {
    html += `<p class="perfect-score">Perfect score — you got everything right!</p>`;
  }

  resultDiv.innerHTML = html;

  const reviewBtn = document.getElementById("review-btn");
  const wrongList = document.getElementById("wrong-list");

  if (reviewBtn && wrongList) {
    reviewBtn.addEventListener("click", () => {
      const isHidden = wrongList.classList.contains("hide");
      wrongList.classList.toggle("hide");

      reviewBtn.textContent = isHidden
        ? "Hide Incorrect Questions"
        : "Review Incorrect Questions";
    });
  }
}