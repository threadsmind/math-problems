const firstElement = document.getElementById('first');
const secondElement = document.getElementById('second');
const operationElement = document.getElementById('operation');
const answerElement = document.getElementById('answer');
const nextElement = document.getElementById('next');
const barElement = document.getElementById('bar');
const countElement = document.getElementById('count');
const problemElement = document.getElementById('problem');
const operations = [minus, plus];
const colors = '1234567890abcdef'.split('');
const problem = {};
let frameCount = 0;
let correctCount = 0;
let lastAnswerCorrect = false;

function rng(l, h) {
  return Math.floor(Math.random() * (h - l + 1)) + l;
}

function plus(first, second) {
  return (!first) ? '+' : first + second;
}

function minus(first, second) {
  return (!first) ? '-' : first - second;
}

function next() {
  const input = parseInt(answerElement.value);
  if (input === problem.answer) {
    correctCount++;
    barElement.style.backgroundColor = '#70db70';
    lastAnswerCorrect = true;
    visualFeedback();
    newProblem();
  } else {
    if (frameCount === 0) {
      barElement.style.backgroundColor = '#FF8B8B';
      lastAnswerCorrect = false;
      visualFeedback();
    }
  }
}

function visualFeedback() {
  if (frameCount < 36) {
    if (!lastAnswerCorrect) {
      answerElement.style.margin = `0 ${Math.sin(frameCount / 2) * 6}px 0 0`;
    }
    frameCount++;
    requestAnimationFrame(visualFeedback);
  } else {
    answerElement.style.margin = '0';
    barElement.style.backgroundColor = '#FFF';
    frameCount = 0;
    cancelAnimationFrame(visualFeedback);
  }
}

function updateUI() {
  firstElement.innerText = problem.first;
  secondElement.innerText = problem.second;
  operationElement.innerText = problem.operation();
  answerElement.value = '';
  countElement.innerText = correctCount;
  let newBGColors = '';
  for (i = 0; i < 6; i++) {
    newBGColors += colors[Math.floor(Math.random() * colors.length)];
  }
  document.body.style.backgroundColor = `#${newBGColors}`;
}

function newProblem() {
  // set numbers (larger number first as we don't want negative answers)(0 is fine)
  const first = rng(1, 15);
  const second = rng(0, 9);
  if (first > second) {
    problem.first = first;
    problem.second = second;
  } else {
    problem.first = second;
    problem.second = first;
  }
  problem.operation = operations[rng(0, 1)];
  problem.answer = problem.operation(
    problem.first,
    problem.second
  );
  updateUI()
}

nextElement.addEventListener('click', next);
answer.addEventListener('keyup', e => {
  if (e.keyCode === 13) { // 13 = 'enter' key
    next();
  } else {
    return e;
  }
});
newProblem();