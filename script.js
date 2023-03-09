const numbers = document.querySelectorAll('.numbers ');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const clearLocal = document.querySelector('.clearlocal')
const getLocal = document.querySelector('.getlocal')


let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

let numberArray = []


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (isFirstValue === false) {
            getFirstValue(atr)
        }
        if (isSecondValue === false) {
            getSecondValue(atr)
        }
    })
}



function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;

}
function getSecondValue(el) {
    if (firstValue != "" && sign != "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = + secondValue;

    }
}
function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            isFirstValue = true;
        })
    }

}
getSign();



equals.addEventListener('click', () => {
    result.innerHTML = "";
    if (sign === "+") {

        resultValue = firstValue + secondValue;

    } else if (sign === "-") {
        resultValue = firstValue - secondValue;
    } else if (sign === "x") {
        resultValue = firstValue * secondValue;
    } else if (sign === "/") {
        resultValue = firstValue / secondValue;
    }

    // locallstorage

    const local = (arr) => {
        let localItem = [firstValue, sign, secondValue, '=', resultValue,]
        let joinItem = localItem.join('')
        arr.push(joinItem)
    }
    local(numberArray)
    localStorage.setItem('array', JSON.stringify(numberArray))


    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";
    checkResultLength()

})

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultValue = -resultValue;
    }
    result.innerHTML = -resultValue;
})
percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue / 100;
})
clear.addEventListener('click', () => {
    result.innerHTML = 0;

    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
})

clearLocal.addEventListener('click', () => {
    localStorage.removeItem('array')
})

getLocal.addEventListener('click', () => {

    let get = localStorage.getItem('array')

    let itemLocal = JSON.parse(get)

    let itemLength = itemLocal.length || false
    console.log("items:", itemLength)
    result.innerHTML = itemLocal.slice('', 5)
    console.log(itemLocal.slice('', 5))
    console.log(sign)

})

/*
Calculator,
Done :
+ Simple actions ( + - / * );
+ Actions with interest;
+ Validation of the entered data (only numbers can be entered into the calculator
and signs of the operations indicated above)
+ Saving history (action and result of the format 2 + 2 = 4, data
+ store in local storage in the format of objects, and the maximum number
actions at a time unlimited)
+ the ability to view it (show
last 5 actions);
+ Clearing history and generating a report on recent actions, in a report
included:;
+ 1) the number of all actions in the history.

not done :

- 2) the number of actions for each operation (multiplication: 10pcs, division:
20pcs...).

*/