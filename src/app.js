// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE#execute_an_async_function
(async () => {
  let currentQuestionIndex = 0;

  const response = await fetch("https://quizapi.io/api/v1/questions", {
    method: "GET",
    headers: {
      "X-Api-Key": "rsl2k3j28gd9HILJ93Fx1J1RSTew1PEaUegewNM5",
      "Content-Type": "application/json",
    },
  });
  const questions = await response.json();

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("nextButton");

  function displayQuestion(index) {
    questionElement.textContent = questions[index].question;

    optionsElement.innerHTML = "";

    ///How do I iterate an object in an object?..//
    Object.keys(questions[index].answers).forEach((answer) => {
      const value = questions[index].answers[answer];
      const li = document.createElement("li");

      li.textContent = value;
      optionsElement.appendChild(li);

      li.addEventListener("click", checkAnswer);

      function checkAnswer() {
        //Output test
        //console.log(questions[index].correct_answers[answer + '_correct'])
        if (
          answer === questions[index].correct_answer ||
          questions[index].correct_answers[answer + "_correct"] === "true"
        ) {
          li.classList.add("correct");
          nextQuestion();
        } else {
          li.classList.add("incorrect");
        }
      }
    });

    //Output test
    console.log(questions[index]);
  }

  function nextQuestion() {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      console.log("Quiz Finished!");
      console.log(``);
    }
  }

  // Initial display
  displayQuestion(currentQuestionIndex);

  // Add click event listener to the next button
  nextButton.addEventListener("click", nextQuestion);
})();
