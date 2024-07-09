//select Elements
let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-option ul');
let flagLis = document.querySelector('.flag-option ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let incorrectAns = document.querySelector('.score .incorrect span');
let btnNewGame = document.querySelector('#newGame');
let currentIndex = 0;
let rightAnswer = 0;

//1st function
function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let question = JSON.parse(this.responseText);

            //number of question for each new game
            let qCount = 10;
            questionNum(qCount);

            //random question for each new game
            questions = question.sort(() => Math.random() - Math.random()).slice(0, 7);

            //question data
            addQuestionData(questions[currentIndex], qCount);

            flagLis.forEach(li => {
                li.addEventListener('click', () => {
                    let rightAnswer = questions[currentIndex].right_answer;
                    li.classList.add('active');
                    currentIndex++;

                    //checking answer after 450ms
                    setTimeout(() => {
                        checkAnswer(rightAnswer, qCount);
                    }, 450);

                    setTimeout(() => {
                        //removing img and all classes [active,wrong and success]
                        flagImg.src = '';
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');

                        //more questions data to show next question
                        addQuestionData(question[currentIndex], qCount);
                    }, 1000);

                    //results
                    setTimeout(() => {
                        showResult(qCount);
                    }, 1002);

                });
            });






        }
    }
    myRequest.open("GET", "js/flag_questions.json", true);
    myRequest.send();

}
getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `img/${obj.img}`;

        //creating options
        flagLis.forEach((li, i) => {
            //dynamic id to li
            li.id = `answer_${i + 1}`;
            //dynamic data-attribut for li
            li.dataset.answer = obj[`options`][i];
            //putting options in the list
            li.innerHTML = obj[`options`][i];



        });

    }
}
function checkAnswer(rAnswer, count) {
    let choosenAnswer;
    for (let i = 0; i < flagLis.clientHeight; i++) {
        if ( flaglis[i].classList.contains('active')) {
            choosenAnswer = flagLis[i].dataset.answer;
            if (rAnswer === choosenAnswer) {
                flagLis[i].classList.add('success');
                rightAnswer++;
                score.innerHTML = rightAnswer;

            } else {
                flagLis[i].classList.add('wrong');
            }
        }
    }
}
