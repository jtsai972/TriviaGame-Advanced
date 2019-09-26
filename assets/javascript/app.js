//timer variables
var timer, timerNext, isTimeUp;
//created two variables to avoid need to change in multiple places
var time = timeQ = 15, // question timer in seconds
    timeQNext = 3 * 1000; // time in milliseconds

//question variables
var qNum = 1,
    qTotal = $("fieldset").length;
var qId = $("#q" + qNum);
var checked, textResult;
var answers = [
    "Elliptical Galaxy",
    "The Boomerang Nebula",
    "The Virgo Constellation",
    "13.8 billion years",
    "75%",
    "Red Dwarf Star",
    "Proxima Centauri",
    "67"
]

//score variables
var countCorrect = countIncorrect = countUnanswered = 0;

$( function() {
    //When the start button is clicked
    $("#start").click( function() {
        //console.log(this);
        $(this).addClass("hide");

        //unhiding
        $("#timer").removeClass("hide");
        $("#questions").removeClass("hide");
        qId.removeClass("hide");
        
        //timer
        startTimer();
    });

    //When form is submitted
    $("#questions button").click( function() {
        console.log("submitting form");

        //submit form & prevent page refresh
        $("#questions").submit(function(e) {
            e.preventDefault();
        });

        checkAnswers();
    });
});


// * Functions go somewhere down here

//Timer functions
function startTimer() {
    //print the first time
    $("#time").text(time);
    timer = setInterval(printTime, 1000);
}

function stopTimer() {
    clearInterval(timer);
    time = timeQ;

    //hiding form
    $("form").addClass("hide");
    //setting up last question to be hidden
    qId.addClass("hide");
    //console.log(qId);
}

function printTime() {
    //countdown every second
    time--;

    //print time after the first second
    $("#time").text(time);
    
    //times up!
    if(time <= 0) {
        isTimeUp = true;
        time = timeQ; //reset time
        checkAnswers();
    }
}

//Question functions
function checkAnswers() {
    stopTimer();

    checked = $("#q" + qNum + " :radio:checked").val();
    //console.log("Checked answer value: " + checked);

    var answeredNum = qId.find(":radio:checked").length;
    //console.log("Answered:" + answeredNum);

    if(answeredNum !== 1) {
        countUnanswered++;
    } else {
        if(checked === "correct") {
            textResult = "Great Job!"
            countCorrect++
        } else {
            textResult = "Sorry";
        }
    }    

    //setting time up
    if (isTimeUp === true) {
        textResult = "Time is up!";
        isTimeUp = false; //reset Time
    }

    //printing results
    $("#results h2").text(textResult);
    $("#results #answer").text(answers[qNum-1])

    //show this after content is generated
    $("#results").removeClass("hide");

    //setting new ids
    qNum++;
    qId = $("#q" + qNum);

    //moving to the next question
    timerNext = setTimeout(nextQuestion, timeQNext);
}

function nextQuestion() {
    //console.log("messing with timeouts");
    
    //hide results
    $("#results").addClass("hide");
    
    //if there are questions left
    if(qNum < qTotal+1) {
        //show next question
        $("form").removeClass("hide");
        qId.removeClass("hide");
        startTimer();
    } else {
        $("#timer").addClass("hide");

        //restart
        $("#start").removeClass("hide");
    }

    clearTimeout(timerNext);
}


// * Bonus stuff

//Todo: experiment with adding and removing classes dynamically to try to animate stuff lightly

//ToDo: add details about answers to result based on question id i.e stuff about why moon is coldest.