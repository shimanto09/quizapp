const myBtn = document.querySelector(".startBtn button");
const rulesBox = document.querySelector(".rulesBox");
const exitBack = document.getElementById("ext");
const Continue = document.querySelector("#continue");
const qna = document.querySelector(".question");
const nextQna = document.querySelector(".nextBtn");
const timeCount = document.querySelector(".timeCount .second");
const timeLine = document.querySelector(".questionHeader .timeLines");
const timeOff = document.querySelector(".QuestionsHeader .timeLeft");
const winner = document.querySelector(".resultBox");
const quitQuiz = document.querySelector(".resultBtn .quit");

// button Worker=============================================================
myBtn.onclick = () => {
  rulesBox.classList.add("blockRule");
};
exitBack.onclick = () => {
  rulesBox.classList.remove("blockRule");
};
Continue.onclick = () => {
  qna.classList.add("qnaBlock");
  showQna(0);
  startTimer(15);
  startTimeLine(0);
};

// quit Button====================================================================

quitQuiz.onclick = () => {
  window.location.reload();
};

var counter; //this is time counter
let timeValue = 15; //this is the time value of quiz timer
let counterLine; // this is line counter time
let lineValue = 0; //this is line value
let scoreCount = 0; //this is the score value count

// ==============================next btn qna
let qnaCount = 0;
nextQna.onclick = () => {
  if (qnaCount < question.length - 1) {
    qnaCount++;
    showQna(qnaCount);
    clearInterval(counter); //time count reset
    startTimer(timeValue); //time count start

    clearInterval(counterLine); //time line reset
    startTimeLine(lineValue); //time line start
    nextQna.style.display = "none";
  } else {
    console.log("You Have Complete Your Task. 🥰🥰");
    showResultBox();
  }
};

var optionList = document.querySelector(".qnaOption"); //this is option list selector global scop

function showQna(index) {
  const que_text = document.querySelector("#span");
  let que_tag = `<span> ${question[index].numb}.  ${question[index].question} </span>`;
  que_text.innerHTML = que_tag;

  // =============================option qna

  let optionTag =
    `<div class="option"> ${question[index].option[0]} </div>` +
    `<div class="option"> ${question[index].option[1]} </div>` +
    `<div class="option"> ${question[index].option[2]} </div>` +
    `<div class="option"> ${question[index].option[3]} </div>`;
  optionList.innerHTML = optionTag;

  // qna count===================================================

  const totalQna = document.querySelector(".totalQna");
  let totalQnaTag = `<p>${question[index].numb} Of 5</p>`;
  totalQna.innerHTML = totalQnaTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// ans mark==============================================================
let tickIcon = `<div class="tick icon"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = `<div class="cross icon"><i class="fa-solid fa-xmark"></i></div>`;

// ==============================ans selected=============================

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = question[qnaCount].answer;
  let allOption = optionList.children.length;

  clearInterval(counter); //option selected timer stop
  clearInterval(counterLine); // option selected time line stop

  if (correctAns.trim() == userAns.trim()) {
    answer.classList.add("correctAns");
    console.log("Your ans is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    scoreCount += 1;
  } else {
    answer.classList.add("wrongAns");
    console.log("Your ans is Wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOption; i++) {
      if (optionList.children[i].textContent.trim() == correctAns.trim()) {
        optionList.children[i].setAttribute("class", "option correctAns");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOption; i++) {
    optionList.children[i].classList.add("disable");
    nextQna.style.display = "block";
  }
}

//result box show=======================================

function showResultBox() {
  rulesBox.classList.remove("blockRule");
  qna.classList.remove("qnaBlock");
  winner.classList.add("blockResult");

  const scoreText = document.querySelector(".resultBox .scoreText");
  if (scoreCount > 3) {
    let scoreTag = `<span>Congratulation💥😊 You Got <p>${scoreCount}</p> Out of <p>${question.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (scoreCount >= 1) {
    let scoreTag = `<span>Carry on👌💞 You Got <p>${scoreCount}</p> Out of <p>${question.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>You are Fail👎😞 You Got <p>${scoreCount}</p> Out of <p>${question.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}

// timer count===================================================

function startTimer(time) {
  counter = setInterval(timer, 900);
  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = 0 + addZero;
    }

    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";

      timeOff.textContent = "Time Off";
    }
  }
}

// time line start=====================================

function startTimeLine(time) {
  counterLine = setInterval(timer, 50);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 339) {
      clearInterval(counterLine);
    }
  }
}
