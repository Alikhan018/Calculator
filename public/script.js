class Calculator {
  constructor() {
    this.init();
    this.currentValue = "";
    this.prev = null;
    this.operator = null;
    this.result = null;
    this.history = JSON.parse(localStorage.getItem("history"));
    this.clear();
    this.display();
    this.chaining();
    this.evaluate();
    this.showHistory();
    this.renderHistory();
  }
  init() {
    if (
      localStorage.getItem("history") === null ||
      localStorage.getItem("history") === undefined
    ) {
      localStorage.setItem("history", JSON.stringify([]));
      this.history = JSON.parse(localStorage.getItem("history"));
    }
  }

  display() {
    const buttons = document.getElementsByClassName("num");
    const screen = document.getElementById("expression");
    for (let button of buttons) {
      button.addEventListener("click", () => {
        const value = button.innerText;
        if (screen.innerText === "Enter a valid equation") {
          screen.innerText = "";
          screen.style.fontSize = "28px";
        }
        this.currentValue += value;
        screen.innerText = this.currentValue;
      });
    }
  }

  clear() {
    const btnClear = document.getElementById("clear");
    const screen = document.getElementById("expression");
    btnClear.addEventListener("click", () => {
      screen.innerText = "";
      this.currentValue = "";
      this.prev = null;
      this.operator = null;
      this.result = null;
    });
  }

  chaining() {
    const opButtons = document.getElementsByClassName("dis");
    const screen = document.getElementById("expression");
    for (let button of opButtons) {
      button.addEventListener("click", () => {
        if (this.currentValue === "" && this.prev === null) return;
        if (this.currentValue === "" && this.prev !== null) {
          this.operator = button.innerText;
          return;
        }

        if (this.prev === null) {
          this.prev = Number(this.currentValue);
        } else {
          this.calculate();
          if (this.result === "INVALID DIV") {
            setTimeout(() => {
              screen.innerText = "";
              this.currentValue = "";
              this.prev = null;
              this.operator = null;
              this.result = null;
            }, 1000);
          }
          screen.innerText = this.result;
        }
        this.operator = button.innerText;
        this.currentValue = "";
      });
    }
  }

  evaluate() {
    const btnEval = document.getElementById("evaluate");
    const screen = document.getElementById("expression");

    btnEval.addEventListener("click", () => {
      if (this.currentValue === "" || this.prev === null) return;
      this.calculate();
      if (this.result === "INVALID DIV") {
        setTimeout(() => {
          screen.innerText = "";
          this.currentValue = "";
          this.prev = null;
          this.operator = null;
          this.result = null;
        }, 1000);
      }
      screen.innerText = this.result;
      this.prev = this.result;
      this.currentValue = "";
      this.operator = null;
    });
  }

  calculate() {
    const current = Number(this.currentValue);
    if (this.operator === "+") {
      this.result = this.prev + current;
    } else if (this.operator === "-") {
      this.result = this.prev - current;
    } else if (this.operator === "*") {
      this.result = this.prev * current;
    } else if (this.operator === "/") {
      if (current === 0) {
        this.result = "INVALID DIV";
      } else {
        this.result = this.prev / current;
      }
    }
    const calculation = `${this.prev} ${this.operator} ${current} = ${this.result}`;
    this.history.push(calculation);
    localStorage.setItem("history", JSON.stringify(this.history));
    this.prev = this.result;
  }
  showHistory() {
    const historyBtn = document.querySelector("i");
    const innerBody = document.querySelector("#body")
    const screen = document.querySelector(".display");
    const historyDiv = document.querySelector("#history");
    historyBtn.addEventListener("click", () => {
      innerBody.classList.toggle("none")
      screen.classList.toggle("none")
      historyDiv.classList.toggle("none")
    })
  }
  renderHistory() {
    const historyInnerDiv = document.querySelector("#history div");
    this.history.map(item => {
      const historyP = document.createElement("p");
      historyP.innerText = item;
      historyInnerDiv.append(historyP);
    })
      
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Calculator();
});
