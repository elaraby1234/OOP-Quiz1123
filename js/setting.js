import { Quiz } from "./quiz.js";
export class Setting {
  constructor() {
    console.log("hello from setting");
    document.getElementById("start").addEventListener("click", () => {
      this.startQuestion();
    });
  }

  async startQuestion() {
    const category = document.getElementById("category").value;
    const difficulty = document.querySelector(
      '[name="difficulty"]:checked'
    ).value;
    const amount = document.getElementById("amount").value;
    if (amount > 0) {
      $("#alertNumber").fadeOut(1000);

      const results = await this.getQuestions(category, difficulty, amount);
      console.log(results);
      document.getElementById("setting").classList.remove("show");
      document.getElementById("quiz").classList.add("show");
      const quiz = new Quiz(results);
    } else {
      $("#alertNumber").fadeIn(1000);
    }
  }

  async getQuestions(category, difficulty, amount) {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    );
    const data = await response.json();
    return data.results;
  }
}
