const result = document.querySelector(".result-value");
const tools = document.querySelector(".tools");

let resultStr = "";

const changeScreenValue = function (DOMEl) {
  if (Number(result.textContent) === 0)
    return (result.textContent = String(DOMEl));
  const final = result.textContent + DOMEl;
  resultStr = final;

  return (result.textContent = final);
};

tools.addEventListener("click", function (e) {
  const classOfTargetEl = e.target.className;
  let valueOfTargetEl = Number(
    document.querySelector(`.${classOfTargetEl}`).textContent
  );

  if (valueOfTargetEl) {
    changeScreenValue(valueOfTargetEl);
  }
  if (classOfTargetEl === "zero") result.textContent += 0;
  if (classOfTargetEl === "clear") result.textContent = 0;
  if (classOfTargetEl === "multiply") result.textContent += "×";
  if (classOfTargetEl === "divide") result.textContent += "÷";
  if (classOfTargetEl === "plus") result.textContent += "+";
  if (classOfTargetEl === "minus") result.textContent += "-";
  if (classOfTargetEl === "equil") {
    const arrForCountResult = [...result.textContent, "+"]; // плюс чтобы js видел последнее число

    let secondNum = "";
    let firstNum = "";
    let currOp = "";
    numSet = true; // отличить первое число от второго

    arrForCountResult.reduce(function (acc, el) {
      // проверить число
      if (Number(el) || Number(el) === 0) {
        if (numSet) firstNum += el;
        if (!numSet) secondNum += el;
      }

      // проверить операцию
      if (isNaN(el)) {
        //если числа два
        if (!numSet) {
          if (currOp === "+") {
            currOp = el; // поменять операцию
            acc = Number(firstNum) + Number(secondNum);
            firstNum = String(acc);
            secondNum = 0;
          }

          if (currOp === "-") {
            currOp = el;
            acc = Number(firstNum) - Number(secondNum);
            firstNum = String(acc);
            secondNum = 0;
          }
          if (currOp === "×") {
            currOp = el;
            acc = Number(firstNum) * Number(secondNum);
            firstNum = String(acc);
            secondNum = 0;
          }
          if (currOp === "÷") {
            currOp = el;
            acc = Number(firstNum) / Number(secondNum);
            firstNum = Math.trunc(String(acc));
            secondNum = 0;
          }
        }
        // сохранить операцию и выбрать второе число
        currOp = el;
        if (numSet) numSet = false;
      }

      result.textContent = firstNum;
    }, 0);
  }
});
