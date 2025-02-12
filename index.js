let timerId;
const checkButtonQuestion = document.getElementById('check');
const startButton = document.getElementById('start');

let time = document.getElementById('time');
let answer = document.getElementById('answer');
const pathJSON = './assets/data.JSON';
const questionText = document.querySelector('.description');
const questionNumberHTML = document.querySelector('.question_number');
let unswearText;
let questionNumberStop = questionNumberHTML.innerHTML;
let questionNumber = 0;
let dataState;
// timer
let newDate;
async function startTime() {
  newDate = Date.parse(new Date()) + (60 * 1000);
  initializeClock('time', newDate);
  startButton.removeEventListener('click', startTime);
  answer.disabled = false;
  getQuestion(pathJSON);
  checkButtonQuestion.addEventListener('click', changeQuestion);
  answer.addEventListener('keydown', (e)=>{
    if (e.key =="Enter") {
      changeQuestion();
    } 
  })
}
startButton.addEventListener('click', startTime);
function getTimeRemaining(endtime) {
  var t = endtime - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);
    let minute = t.minutes > 9 ? t.minutes : `0${t.minutes}`;
    let seconds = t.seconds > 9 ? t.seconds : `0${t.seconds}`;
    clock.innerHTML =
      `${minute}:${seconds}`
    if (t.total <= 0) {
      clearInterval(timeinterval);
      looseTest();
      clock.innerHTML =
        `время вышло`
    }
  }, 1000);
}
// timer
// check question
function shuffleArray(arr) {
  return arr.sort(function (a, b) {
    return Math.random() - 0.5;
  });
}
function dataQuestion(data) {
    questionNumber >= data.length ? (questionNumber = 0) : questionText.innerHTML = data[questionNumber-1].description; questionNumberHTML.innerHTML = questionNumber;
  
}
function getQuestion(path) {
  fetch(path)
    .then(res => res.json())
    // .then(data => dataQuestion(data))
    .then(data =>{ 
      dataState =shuffleArray(data);
      questionNumber++;
      dataQuestion(dataState);
    })
}

function changeQuestion() {
  // if (questionNumber) {
    if (answer.value == dataState[questionNumber- 1].tag) {
      answer.value = '';
      questionNumber++;
      dataQuestion(dataState);
      answer.style.borderColor = "black";
    } else {
      answer.style.borderColor = "red";
      answer.style.borderStyle = "solid";
      answer.style.borderWidth = "2px";
    };
}


// check question
// revert test
document.getElementById('revert').addEventListener('click', () => location.reload())
// revert test
// loose test
function looseTest() {
  questionText.innerHTML = `Время закончилось, вы не успели ответить на все вопросы((<br> 
  Попробуйте пройти тест заново<br>
  Ваш результат: ${questionNumber} из ${dataState.length}`;
  answer.disabled = true;
  checkButtonQuestion.removeEventListener('click', changeQuestion);
}
// loose test