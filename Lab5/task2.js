let arr = prompt('Введіть текст: ', );
Find_distance(arr.toLowerCase());
function Find_distance(text)
{
    let vowelArray = "aeiou";
    let len = text.length;
    let result = [];
    let consonants = 0;
    let vowel = -1;
    for(let i = 0; i < len; i++)
    {
        for(let j = 0; j < vowelArray.length; j++)
        {
            if(text[i] == vowelArray[j])
            {
                vowel = 0;
                break;
            }
        }
        if(vowel == 0)
        {
            vowel = -1;
            if(consonants == 0)
            {
                result.push(0);
                continue;
            }
            else if(result[result.length - 1] == 0)
            {
                for(let k = 0; k < consonants; k++)
                {
                    if(k < Math.floor(consonants / 2))
                    {
                        result.push(k+1);  
                    }
                    else
                    {
                        result.push(consonants - k);
                    } 
                }
            }
            else
            {
                for(let k = 0; k < consonants; k++)
                {
                    result.push(consonants - k); 
                }
            }
            result.push(0);
            consonants = 0;
        }
        else
        {
            consonants++;
        }
    }
    if(consonants != 0)
    {
        for(let k = 0; k < consonants; k++)
        {
            result.push(k+1);
        }
    }
    alert(result);
}
 


