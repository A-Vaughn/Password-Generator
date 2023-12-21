document.addEventListener("DOMContentLoaded", function () {
    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    let pwRangeBar = document.getElementById("passwordLength");
    pwRangeBar.value=15;

    DisplaypwLength(pwRangeBar.value);
    generate();

    pwRangeBar.addEventListener("input", function () {
        DisplaypwLength(this.value);
        
        generate();
    })

    let checkBoxes = document.querySelectorAll(".form-check-input");

    checkBoxes.forEach(function(checkBox) {
        checkBox.addEventListener('change', function() {
          generate();
          checkBoxes.forEach(function(checkBox) {
            checkBox.classList.remove("errorBox");
          });
        })
    });

    let clipboardIcon = document.getElementById("clipboard");
    clipboardIcon.addEventListener("click", function () {
        this.classList.remove("bi-clipboard")
        this.classList.add("bi-clipboard-check")
        copyPassword();
        
    })

    let generateIcon =  document.getElementById("generate");

    generateIcon.addEventListener("click", function () {
        generate();
    })
})

function getupperCase() 
{
    let upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let rnum = Math.floor(Math.random() * upperCaseList.length);  
    return upperCaseList[rnum];
}

function getLowerCase() 
{
    let lowerCaseList = "abcdefghijklmnopqrstuvwxyz";
    let rnum = Math.floor(Math.random() * lowerCaseList.length);  
    return lowerCaseList[rnum];
}

function getNumber() 
{
    let numberList = "0123456789";
    let rnum = Math.floor(Math.random() * numberList.length);  
    return numberList[rnum];
}

function getSpecialSymbol() 
{
    let specialSymbolList = "!@#$%^&*+~\?></=";
    let rnum = Math.floor(Math.random() * specialSymbolList.length);  
    return specialSymbolList[rnum];
}

function getDifficultSymbol() 
{
    let difficultSymbolList = "(){}[]`',._-:;|";
    let rnum = Math.floor(Math.random() * difficultSymbolList.length);  
    return difficultSymbolList[rnum];
}

function generatePassword(length, upper, lower, number, specialSymbol, difficultSymbol)
{
    let temp = "";
    let rand = 0;
    let checkBoxes = document.querySelectorAll(".form-check-input");
    let generateTooltip = bootstrap.Tooltip.getInstance('#generate');
    let clipboardTooltip = bootstrap.Tooltip.getInstance('#clipboard');


    if (upper == false && lower == false && number == false && specialSymbol == false && difficultSymbol == false)
    {

        checkBoxes.forEach(function(checkBox) {
            checkBox.classList.add("errorBox");
        });

        
        generateTooltip.setContent({ '.tooltip-inner': 'Please choose an option' });

        
        clipboardTooltip.setContent({ '.tooltip-inner': 'Please choose an option' });

        return "Please choose an option";
    }
    else
    {
        for (i = 0; i < length; i++)
        {
            rand = Math.floor(Math.random() * 5);

            if (rand == 0 && upper == true)
            {
                temp = temp.concat(getupperCase());
            }
            else if (rand == 1 && lower == true)
            {
                temp = temp.concat(getLowerCase());
            }
            else if (rand == 2 && number == true)
            {
                temp = temp.concat(getNumber());
            }    
            else if (rand == 3 && specialSymbol == true)
            {
                temp = temp.concat(getSpecialSymbol());
            }
            else if (rand == 4 && difficultSymbol == true)
            {
                temp = temp.concat(getDifficultSymbol());
            }
            else
            {
                i--;
            }
            let generateTooltip = bootstrap.Tooltip.getInstance('#generate');
            generateTooltip.setContent({ '.tooltip-inner': 'Generate' });

            let clipboardTooltip = bootstrap.Tooltip.getInstance('#clipboard');
            clipboardTooltip.setContent({ '.tooltip-inner': 'Copy' });
        } 
        return temp;
    }
    
}

function generate()
{
    let pword = document.getElementById("password");

    let pwRangeBar = document.getElementById("passwordLength");
    let upper = document.getElementById("upperCaseCheckBox").checked;
    let lower = document.getElementById("lowerCaseCheckBox").checked;
    let number = document.getElementById("numbersCheckBox").checked;
    let specialSymbol = document.getElementById("specialSymbolsCheckBox").checked;
    let difficultSymbol = document.getElementById("difficultSymbolsCheckBox").checked;
    
    pword.value  = generatePassword(pwRangeBar.value, upper, lower, number, specialSymbol, difficultSymbol);

    let clipboardIcon = document.getElementById("clipboard");
    
    clipboardIcon.classList.remove("bi-clipboard-check");
    clipboardIcon.classList.add("bi-clipboard");
  
}

function DisplaypwLength(length)
{
    document.getElementById("passwordLenghtLabel").innerHTML = "Password Length: " + length;
}

function copyPassword()
{   
    let upper = document.getElementById("upperCaseCheckBox").checked;
    let lower = document.getElementById("lowerCaseCheckBox").checked;
    let number = document.getElementById("numbersCheckBox").checked;
    let specialSymbol = document.getElementById("specialSymbolsCheckBox").checked;
    let difficultSymbol = document.getElementById("difficultSymbolsCheckBox").checked;

    if (upper == false && lower == false && number == false && specialSymbol == false && difficultSymbol == false)
    {
        let clipboardIcon = document.getElementById("clipboard");
    
        clipboardIcon.classList.remove("bi-clipboard-check");
        clipboardIcon.classList.add("bi-clipboard");

        let checkBoxes = document.querySelectorAll(".form-check-input");

        checkBoxes.forEach(function(checkBox) {
            checkBox.classList.add("errorBox");
        });
    }
    else
    {   
        if(isMobile())
        {
            let pword = document.getElementById("password");
            pword.select();
            pword.setSelectionRange(0, 99999);
            document.execCommand("copy");
        }
        else
        {
            let pword = document.getElementById("password");
            pword.select();
            navigator.clipboard.writeText(pword.value);
        } 

        let clipboardTooltip = bootstrap.Tooltip.getInstance('#clipboard');
        clipboardTooltip.setContent({ '.tooltip-inner': 'Copied!' });
        
        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
    }
}

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
  



