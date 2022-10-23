const colors = require('colors');
const Colors = {GREEN : 0, RED : 1, YELLOW : 2}

let currentColor = Colors.GREEN;
const leftNumber = process.argv[2];
const rightNumber = process.argv[3];
let noNumber = true;

if(isNaN(leftNumber) || isNaN(rightNumber)) {
    console.log('Error. Incorrect start numbers');
}

const isNumber = (num) => {
    if (num <= 1)
    return false;
    for(let i = 2; i < num; i++)
    if (num % i === 0)
    return false;
    return true;
}

const changeColor = () => {
    currentColor++;
    if (currentColor > Colors.RED)
    currentColor = Colors.YELLOW;
}

const colorPrint = (num) => {
    if (noNumber) noNumber = false;
    switch (currentColor){
        case Colors.GREEN:
            console.log(`${num}` .green);
            break;
        case Colors.RED:
            console.log(`${num}` .red);
            break;
        case Colors.YELLOW:
            console.log(`${num}` .yellow);
            break;
    }
    changeColor();
}

for (let i = leftNumber; i <= rightNumber; i++){
    if (isNumber(i)) colorPrint(i);
}
if (noNumber)
console.log('No correct numbers');