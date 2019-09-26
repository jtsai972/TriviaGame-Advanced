//timer variables
var timer, next;
//using qTime as base for easy reassignment
var time = qTime = 15, // question timer in seconds
    qNextTime = 3 * 1000; // time in milliseconds
var isTimeUp;

//question variables
var qNum = 1;
var qId = $("#q" + qNum);
var checked, resultTxt;
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
    time = qTime;

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
        time = qTime; //reset time
        checkAnswers();
    }
}

//Question functions
function checkAnswers() {
    stopTimer();

    checked = $("#q" + qNum + " :radio:checked").val();
    //console.log("Checked answer: " + checked);

    if(checked === "correct") {
        resultTxt = "Great Job!"
    } else if(isTimeUp === true) {
        resultTxt = "Time is up!";
        isTimeUp = false; //reset Time
    } else {
        resultTxt = "Sorry";
    }

    //printing results
    $("#results h2").text(resultTxt);
    $("#results #answer").text(answers[qNum-1])

    //show this after content is generated
    $("#results").removeClass("hide");

    //setting new ids
    qNum++;
    qId = $("#q" + qNum);

    //moving to the next question
    next = setTimeout(nextQuestion, qNextTime);
}

function nextQuestion() {
    //console.log("messing with timeouts");
    
    //hide results
    $("#results").addClass("hide");

    //show next question
    $("form").removeClass("hide");
    qId.removeClass("hide");

    clearTimeout(next);

    startTimer();
}


// * Bonus stuff

//Todo: experiment with adding and removing classes dynamically to try to animate stuff lightly

//ToDo: add details about answers to result based on question id i.e stuff about why moon is coldest.