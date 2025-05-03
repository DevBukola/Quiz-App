const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const username = document.querySelector(".username");
const questionListing = document.querySelector(".question-listing");

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { input: "Paris", correct: true },
      { input: "Madrid", correct: false },
      { input: "Berlin", correct: false },
      { input: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { input: "Mars", correct: true },
      { input: "Earth", correct: false },
      { input: "Venus", correct: false },
      { input: "Jupiter", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { input: "William Shakespeare", correct: true },
      { input: "Charles Dickens", correct: false },
      { input: "Jane Austen", correct: false },
      { input: "George Orwell", correct: false },
    ],
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    answers: [
      { input: "Heart", correct: true },
      { input: "Liver", correct: false },
      { input: "Kidney", correct: false },
      { input: "Lungs", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { input: "Blue Whale", correct: true },
      { input: "Elephant", correct: false },
      { input: "Giraffe", correct: false },
      { input: "Polar Bear", correct: false },
    ],
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: [
      { input: "Africa", correct: true },
      { input: "Asia", correct: false },
      { input: "Europe", correct: false },
      { input: "Australia", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { input: "100°C", correct: true },
      { input: "90°C", correct: false },
      { input: "80°C", correct: false },
      { input: "70°C", correct: false },
    ],
  },
  {
    question: "How many legs does a spider have?",
    answers: [
      { input: "8", correct: true },
      { input: "6", correct: false },
      { input: "10", correct: false },
      { input: "12", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { input: "Carbon Dioxide", correct: true },
      { input: "Oxygen", correct: false },
      { input: "Hydrogen", correct: false },
      { input: "Nitrogen", correct: false },
    ],
  },
  {
    question: "Who invented the light bulb?",
    answers: [
      { input: "Thomas Edison", correct: true },
      { input: "Albert Einstein", correct: false },
      { input: "Isaac Newton", correct: false },
      { input: "Nikola Tesla", correct: false },
    ],
  },
];

// const name = prompt("Please enter your name.");

// if (name === "") {
//   alert("please enter your name");
// } else {
//   username.textContent = `${name},`;
// }

let name = "";

while (!name) {
  name = prompt("Please enter your name.");
}

username.textContent = `${name},`;

let currentQuestionIndex = 0;
let score = 0;
let chosenAnswer = null;

function beginQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionListing.style.display = "block";
  questionListing.classList.add("listings");
  nextBtn.innerHTML = "Next";
  displayQuestion();
}

function resetState() {
  nextBtn.style.display = "none";
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

function chooseAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answersEl.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = "true";
  });

  nextBtn.style.display = "block";
}

function displayScore() {
  resetState();
  questionEl.innerHTML = `Thank you for playing, <span class='username'>${name}</span>. You scored ${score} out of ${questions.length} questions!`;
  nextBtn.innerHTML = "Take Another Shot";
  nextBtn.style.display = "block";
  questionListing.style.display = "none";
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    beginQuiz();
  }
});

function displayQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionListing.innerHTML = `
  <p class='listing-header'>Question</p>
    <span class='color-listing'>
      ${questionNumber}/<span class='listing'>${questions.length}</span>
    </span>`;
  questionEl.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.input;
    button.classList.add("btn");
    answersEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", chooseAnswer);
  });
}

beginQuiz();
