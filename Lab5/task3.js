
let count = 0;
let countM = 0;
let num = prompt('Введіть число: ');
alert(`Адитивна стійкість: ${additiv(num, count)}`);
alert(`Мультиплікативна стійкість: ${multipl(num, countM)}`);

function multipl(number, countM){
    if(Math.floor(number / 10) == 0){
        return countM;
    }
    else{
        let integ = 0;
        let remain = 0;
        for(let i = 0; ; i++){   
            remain = number % 10;
            number = Math.floor(number / 10);
            integ = integ * remain;
            if(number == 0){
                countM++;
                break;
            }
        } 
        number = integ;
    }
    return multipl(number, countM);
}
function additiv(number, count){
    if(Math.floor(number / 10) == 0){
        return count;
    }
    else{
        let integ = 0;
        let remain = 0;
        for(let i = 0; ; i++){   
            remain = number % 10;
            number = Math.floor(number / 10);
            integ = integ + remain;
            if(number == 0){
                count++;
                break;
            }
        } 
        number = integ;
    }
    return additiv(number, count);
}
  
