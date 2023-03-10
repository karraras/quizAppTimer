let parent = document.querySelector(".parent");
let question = document.querySelector(".qautions h3");
let answers = document.querySelectorAll(".answers div");
let from = document.querySelector(".footer .from");
let to = document.querySelector(".footer .to");
let next = document.querySelector(".footer .next");
let time = document.querySelector(".header .time span");
let progress = document.querySelector(".progress");
let result = document.querySelector(".result");
let num = 0;
let allTime = 15;
let total = 0;
function getData() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      time.innerHTML = allTime;
      from.innerHTML = data[num].numb;
      to.innerHTML = data.length;
      progress.classList.add("start");
      fullData(data[num]);

      let pass = true;
      let pa = true;
      answers.forEach((el) => {
        el.addEventListener("click", (e) => {
          if (e.currentTarget.innerHTML == data[num].answer) {
            if (pass === true) {
              total++;
              e.currentTarget.classList.add("right");
              result.innerHTML = `your score is ${total}`;
              pass = false;
            }
          } else {
            if (pa == true) {
              el.classList.add("wrong");
              e.currentTarget.innerHTML += `
<span><i class="fa-regular fa-circle-xmark"></i></span>

`;
              result.innerHTML = `your score is ${total}`;
              pa = false;
            }
          }
          answers.forEach((e) => {
            e.style.pointerEvents = "none";
          });
          answers.forEach((le) => {
            if (le.innerHTML == data[num].answer) {
              le.classList.add("right");
              le.innerHTML += `<span><i class="fa-regular fa-circle-check"></i></span>`;
            }
          });
        });
      });

      let count = setInterval(() => {
        time.innerHTML -= 1;
        if (time.innerHTML == 0) {
          next.click();
        }
        if (time.innerHTML <= 0) {
          clearInterval(count);
          time.innerHTML = 0;
        }
        if (time.innerHTML <= 0 && num == 4) {
          parent.style.display = "none";
          result.style.display = "flex";
        }
      }, 1000);
    }
  };
  myRequest.open("GET", "./questions.json");
  myRequest.send();
}
getData();
function fullData(data) {
  question.innerHTML = data.question;
  answers.forEach((el, index) => {
    el.innerHTML = data.options[index];
  });
}

next.addEventListener("click", () => {
  if (num < 4) {
    num++;
    answers.forEach((el) => {
      document.querySelector(".start").style.animationPlayState = "running";
      el.style.pointerEvents = "auto";
      el.classList.remove("wrong");
      el.classList.remove("right");
    });
    progress.classList.remove("start");
    getData();
  }
});
