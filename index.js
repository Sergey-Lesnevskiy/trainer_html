

// timer
let timerId;
const checkButtonQuestion = document.getElementById('check');
const startButton = document.getElementById('start');

let time = document.getElementById('time');
let answer = document.getElementById('answer');


let newDate;
function startTime() {
  newDate = Date.parse(new Date()) + (60 * 1000);
  initializeClock('time', newDate);
  startButton.removeEventListener('click', startTime);
  getQuestion(pathJSON);
  checkButtonQuestion.addEventListener('click', changeQuestion)
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
      clock.innerHTML =
        `время вышло`
    }
  }, 1000);
}
// timer
// check question
const pathJSON = './assets/data.JSON';
const questionText = document.querySelector('.description');
const questionNumberHTML = document.querySelector('.question_number');
let unswearText;
let questionNumberStop = questionNumberHTML.innerHTML;
let questionNumber = 0;
function dataQuestion(data) {
  if (questionNumber) {
    if (answer.value == data[questionNumber - 1].tag) {
      answer.value = '';
      questionNumber >= data.length ? (questionNumber = 0) : questionText.innerHTML = data[questionNumber].description; questionNumberHTML.innerHTML = questionNumber + 1;
    } else {
      answer.style.borderColor = "red";
      answer.style.borderStyle = "solid";
      questionNumber = questionNumberStop;
    };
  } else {
    questionNumber >= data.length ? (questionNumber = 0) : questionText.innerHTML = data[questionNumber].description; questionNumberHTML.innerHTML = questionNumber + 1;
  }

}
function getQuestion(path) {
  fetch(path)
    .then(res => res.json())
    .then(data => dataQuestion(data))
    .catch((err) => {
      questionText.innerHTML = 'проблемы c загрузкой вопросов'
    });
}

function changeQuestion() {
  getQuestion(pathJSON);
  questionNumber++;
}


// check question
// revert test
document.getElementById('revert').addEventListener('click', () => location.reload())
// revert test