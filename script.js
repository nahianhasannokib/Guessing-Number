let low = 1
let high = 100
let mid

function startGame(){

    document.querySelector(".start").style.display="none"
    document.getElementById("questionArea").classList.remove("hidden")

    nextQuestion()
}

function nextQuestion(){

    mid = Math.floor((low + high)/2)

    if(low > high){

        document.getElementById("questionArea").classList.add("hidden")
        document.getElementById("result").innerText="Something went wrong 😅"

        return
    }

    document.getElementById("question").innerText =
    "Is your number greater than " + mid + " ?"

}

function answerYes(){

    low = mid + 1
    checkResult()
}

function answerNo(){

    high = mid
    checkResult()
}

function checkResult(){

    if(low === high){

        document.getElementById("questionArea").classList.add("hidden")

        document.getElementById("result").innerText =
        "🎉 Your number is " + low

    }
    else{

        nextQuestion()
    }
}