//if click on the start/reset
var playing = false;
var score;
var timeRemaining;
var correctAnswer;
document.getElementById("startReset").onclick = function () {
    //if playing
    if(playing == true){
        //reload page
        location.reload();
    }else{//if not playing
        //set mode to playing
        playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        //show countdown box
        //document.getElementById("timeRemaining").style.display = "block";
        show("timeRemaining");
            //set var timeRemaining to 60
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        //hide game over box
        hide("gameOver");
        //change button to reset
        document.getElementById("startReset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();
        //generate new question and answers
        generateQA();


    }
};

//clicking on an answer box
for(i=1;i<5;i++){
    document.getElementById("box" + i).onclick = function () {
        //check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                //correct answer
                    //increase score by 1
                score++;
                document.getElementById("scoreValue").innerHTML =  score;
                //show correct box and hide the wrong box
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                },1000);

                //generate new Q&A
                generateQA();
            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                },1000);
            }
        }
    };
}





        

//if click on answer box
    //if playing
        //correct?
            //yes
                //increase score by 1
                //show correct box for 1sec
                // generate new Q&A
            //no
                //show try again box for 1 sec

//functions

//start Counter
function startCountdown() {
    action = setInterval(function () {
        //reduce time by 1sec in loops
        timeRemaining -= 1;
        //timeleft?
            //yes->continue
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining < 10){
            document.getElementById("timeRemaining").style.backgroundColor = "#FF6F96";
        }
            //no->gameover
        if(timeRemaining == 0){//gameover
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score +".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    },1000)
}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

//hide element
function hide(id) {
    document.getElementById(id).style.display = "none";
}

//show element
function show(id) {
    document.getElementById(id).style.display = "block";
}

//generate question and answer
function generateQA() {
    var x = 1 +  Math.round(Math.random()*9);
    var y = 1 +  Math.round(Math.random()*9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    //randomize between 4 boxes
    var correctPosition = 1 + Math.round(Math.random()*3);
    //fill 1 box with the correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    //fill other boxes with wrong answer
    var answers = [correctAnswer];

    for(i=1; i<5;i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 +  Math.round(Math.random()*9)) * (1 +  Math.round(Math.random()*9));
            }
            while (/*wrongAnswser == correctAnswer*/answers.indexOf(wrongAnswer) > -1);//if index is greater than -1, we will continue the loop until we get the wrongAnswer that not the same as correctAnswer, or the other wrongAnswer
            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
    }
}