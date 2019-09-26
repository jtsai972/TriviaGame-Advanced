// ? Comments styled with Better Comments VSCode Extension
// * All these comments will go away as code gets filled in.
//variables go somewhere up here

var timer;
var time = 10;
var qDone = false;
var qTotal = ("fieldset").length;
var qId = 1;
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

// * Setup
//ToDo: set up repeatable timer, timestop & count functions

// * On Start
//Todo: on click start, display timer, unhide form & first fieldset

// * Form
// ToDo: on click fieldset, get fieldset id for submission
// Todo: Submit Button displays result

// * Setting up results
//Todo: h2 with "Time's up", Correct/Incorrect depending on cause
// ? Correct answer will probably be based on :radio:checked.val() = correct; isCorrect ? correct : incorrect
// Note to self: learn how to use ternary operators properly and find places to use them
//ToDo: Display correct answer 

//ToDo: reset timer, hide result, unhide next fieldset

// * Bonus stuff
//Todo: experiment with adding and removing classes dynamically to try to animate stuff lightly
//ToDo: add details about answers to result based on question id i.e stuff about why moon is coldest.

$( function() {
    $("#start").click( function() {
        //console.log(this);
        $(this).addClass("hide");

        //unhiding
        $("#timer").removeClass("hide");
        $("#questions").removeClass("hide");
        $("#q"+qId).removeClass("hide");
        
        //timer
        startTimer();
    });

    $("form button").click( function() {
        console.log("submitting form");

        //submit form & prevent page refresh
        $("form").submit(function(e) {
            e.preventDefault();
        });

        checkAnswers();
    });
});


//Functions go somewhere down here
function startTimer() {
    timer = setInterval(printTime, 1000);
}

function stopTimer() {
    clearInterval(timer);

    //hiding form
    $("form").addClass("hide");
    //setting up last question to be hidden
    $("#q"+qId).addClass("hide");
    console.log("#q"+qId);
}

function printTime() {
    //print time
    $("#time").text(time);

    //countdown every second
    time--;
            
    if(time < 0) {
        time = 30;
        resultTxt = "Time is up!"
        
        checkAnswers();
    }
}

function checkAnswers() {
    stopTimer();

    checked = $(":radio:checked").val();

    console.log("Checked answer: " + checked);

    if(checked === "correct") {
        resultTxt = "Great Job!"
    } else {
        resultTxt = "Sorry";
    }

    //printing results
    $("#results h2").text(resultTxt);
    $("#results #answer").text(answer[(qId-1)])

    //show this after content is generated
    $("#results").removeClass("hide");
}