const loader = document.querySelector('.loader-container')
const questionContainerUl = document.querySelector('.questions-container-ul')
const pointsCounter = document.querySelector('.point')
const correctCounter = document.querySelector('.correct')

const difficultyPoints = {
  easy: 1,
  medium: 2,
  hard: 3
}
const fetchData = () => {
  loader.classList.add('active')
  fetch('https://opentdb.com/api.php?amount=20&type=multiple')
    .then((response) => { return response.json() })
    .then((data) => {
      const { results } = data
      const newResultsArray = refactorData(results)
      console.log(newResultsArray)
      renderQuestions(newResultsArray)
      loader.classList.remove('active')
    }).catch((error) => {
      console.log(error)
      loader.classList.remove('active')
    })
}

const handleClickAnswer = (answerId, isCorrectAnswer, questionId, questionsArray, difficulty) => {
  const { answered } = questionsArray[questionId]
  if (answered) {
    return
  }
  const answerElement = document.querySelector(`.question-answers-li[data-answerid="${answerId}"]`)
  answerElement.classList.add(isCorrectAnswer ? 'correct' : 'incorrect')
  questionsArray[questionId].answered = true
  const point = +pointsCounter.innerText
  if (isCorrectAnswer) {
    pointsCounter.innerHTML = point + difficultyPoints[difficulty]
    correctCounter.innerText = +correctCounter.innerText + 1
  } else {
    pointsCounter.innerHTML = point - 1 < 0 ? 0 : point - difficultyPoints[difficulty]
  }
}


const refactorData = (questinosArray) => {
  const newQuestionsArray = questinosArray.map((question) => {
    const answers = [...question.incorrect_answers, question.correct_answer]
    for (let i = 0; i < answers.length; i++) {
      answers[i] = {
        id: i,
        text: answers[i],
        isCorrectAnswer: i === answers.length - 1
      }
    }
    const newAnswers = reArrangeAnswers(answers)
    return {
      ...question,
      answers: newAnswers,
      answered: false
    }
  })
  return newQuestionsArray
}

const reArrangeAnswers = (answers) => {
  const localAnswers = [...answers]
  const newAnswers = [];
  while (localAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * localAnswers.length)
    const elem = localAnswers.splice(randomIndex, 1)[0]
    newAnswers.push(elem)
  }
  return newAnswers
}

const renderQuestions = (questionsArray) => {
  for (let i = 0; i < questionsArray.length; i++) {
    const {
      category,
      difficulty,
      question,
      answers
    } = questionsArray[i]

    const questionLi = document.createElement('li')
    questionLi.classList.add('questions-container-li');

    const singleQuestion = document.createElement('div')
    singleQuestion.classList.add('single-question');

    questionLi.appendChild(singleQuestion);

    const questionDetails = document.createElement('div')
    questionDetails.classList.add('question-details')

    const questionText = document.createElement('p')
    questionText.classList.add('question-text');

    const questionNumber = document.createElement('span');
    questionNumber.classList.add('question-number')
    const questionNumberText = document.createTextNode(i + 1)
    questionNumber.appendChild(questionNumberText)
    const questionTextNode = document.createTextNode(question)

    questionText.appendChild(questionNumber)
    questionText.appendChild(questionTextNode)

    const difficultyElement = document.createElement('span');
    const difficultyText = document.createTextNode(difficulty);
    difficultyElement.classList.add('question-difficulty')
    difficultyElement.classList.add(difficulty.toLowerCase())

    difficultyElement.appendChild(difficultyText)
    questionDetails.appendChild(questionText);
    questionDetails.appendChild(difficultyElement)

    const questionAnswers = document.createElement('div');
    questionAnswers.classList.add('question-answers')

    const questionAnswersUl = document.createElement('ul');

    questionAnswers.appendChild(questionAnswersUl);

    for (let j = 0; j < answers.length; j++) {
      const answersLi = document.createElement('li')
      answersLi.classList.add('question-answers-li');
      const answertext = document.createTextNode(answers[j].text)
      answersLi.appendChild(answertext)
      answersLi.setAttribute('data-answerId', `${i}${answers[j].id}`)
      answersLi.addEventListener('click', () => { handleClickAnswer(`${i}${answers[j].id}`, answers[j].isCorrectAnswer, i, questionsArray, difficulty) })
      questionAnswersUl.appendChild(answersLi)
    }

    singleQuestion.appendChild(questionDetails)
    singleQuestion.appendChild(questionAnswers)
    questionContainerUl.appendChild(questionLi)
  }
}


fetchData()