export class Quiz {
  constructor(results) {
    this.results = results;
    this.currentIndex = 0;
    document.getElementById("to").innerHTML = this.results.length;
    this.from = document.getElementById("from");
    this.question = document.getElementById("questionTitle");
    this.showQuestion();
    this.score = 0;

    document.getElementById("nextQuestion").addEventListener("click", () => {
      this.nextQuestion();
    });
    document.getElementById("end").addEventListener("click", () => {
      location.reload();
    });
  }

  showQuestion() {
    this.from.innerHTML = this.currentIndex + 1;
    this.question.innerHTML = this.results[this.currentIndex].question;
    const Answers = [...this.results[this.currentIndex].incorrect_answers];
    const correctAnswer = this.results[this.currentIndex].correct_answer;
    const random = Math.round(Math.random() * Answers.length);
    Answers.splice(random, 0, correctAnswer);
    let cartona = ``;
    for (let i = 0; i < Answers.length; i++) {
      cartona += `  <li class="my-3 animate__animated">
                  <div class="pretty p-default p-round p-smooth p-plain">
                    <input type="radio" name="answer" value="${Answers[i]}" />
                    <div class="state p-success-o">
                      <label> ${Answers[i]}</label>
                    </div>
                  </div>
                </li>`;
    }
    document.getElementById("questionContent").innerHTML = cartona;
  }

  nextQuestion() {
    const currentAnswer = document.querySelector(
      '[name="answer"]:checked'
    )?.value;
    console.log(currentAnswer);

    if (currentAnswer != undefined) {
      $("#alertAns").fadeOut(1000);
      this.currentIndex++;

      if (this.currentIndex > this.results.length - 1) {
        document.getElementById("quiz").classList.remove("show");
        document.getElementById("finsish").classList.add("show");
        document.getElementById("score").innerHTML = this.score;
      } else {
        console.log(
          currentAnswer,
          this.results[this.currentIndex - 1].correct_answer
        );
        if (
          currentAnswer == this.results[this.currentIndex - 1].correct_answer
        ) {
          this.score++;
          $("#correct").fadeIn(0);
          setTimeout(() => {
            $("#correct").fadeOut(0);
          }, 300);
        } else {
          $("#inCorrect").fadeIn(0);
          setTimeout(() => {
            $("#inCorrect").fadeOut(0);
          }, 300);
        }
        this.showQuestion();
      }
    } else {
      $("#alertAns").fadeIn(1000);
    }
  }
}
