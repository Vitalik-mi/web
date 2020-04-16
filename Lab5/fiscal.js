
class Persona
{
  constructor(Name,Surname,Male,day, month,year,fisc){
    this.Name = Name;
    this.Surname = Surname;

    this.Male = Male;

    this.day = day;
    this.month = month;
    this.year = year;
    this.fisc = fisc;
  }
  calculation()
  {
    return (this.Name_fiscal_code(this.Surname, 1) + this.Name_fiscal_code(this.Name, 0) + this.Data_fiscal_code());
  }
  Name_fiscal_code(Fname, type)
  {
    const array_vowels = 'aiueoy'; 
    Fname = Fname.toLowerCase();
    var text = '';

    let k = 0;
    for (let i of Fname)
    {
      let NOTvowels = true;
      for(let j of array_vowels)
      { 
        if(i == j)
        NOTvowels = false;
      }
      if(NOTvowels)
      {
        if (type != 0 || k < 3)
          text += i;
        else{
          text = text.replace(text[2], i);
        }
        k++;
      }
      if((k==3 && type != 0) || k == 4)
        break;
    }
    if(k <3)
    {
      for(let i of Fname)
      {
        for(let j of array_vowels)
        {
          if(i == j)
          { 
            text += i;
            k++;
          }
        }
        if(k == 3)
          break;
      }
    }
    if(k < 3)
    {
      for(let i = 0; i < (3-Fname.length); i++)
        text += "X";
    }
    return text.toUpperCase();
  }
  Data_fiscal_code ()
  {
    const array_vowels = 'aiueoy'; 
   const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }
    let text = '';
    text += this.year[2] + this.year[3] + months[month]
    +((Male)?(this.day.length <2)?"0" + this.day:this.day:40+Number(this.day));
    return text;

  }

}
function output_code ()
 {
  let per = new Persona(Name,Surname,Male,day,month,year);
  let code = document.getElementById('code-output').innerHTML = per.calculation();
}

