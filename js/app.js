let cards = ["fa-coffee", "fa-coffee", "fa-bomb", "fa-bomb", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-bell", "fa-bell", "fa-leaf", "fa-leaf", "fa-flask", "fa-flask", "fa-gavel", "fa-gavel"];
let deck = $(".deck");
let openCards = [];
let startgame = true;
let moves = 0;
let matchMade = 0;
let delay = 500;
let second = 0;
let firstStar = 8;
let secondStar = 20;
let thirdStar = 30;
let star = 3;
let timer;
let sec = 0;
cardHTML();
Game();
startTimer();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//loop through each card and create its HTML
function appendCard(card) {
    deck.append('<li class="card" ><i class="fa ' + card + '"></i></li>');

}

//add each card's HTML to the page
function cardHTML() {
    let listCard = shuffle(cards);
    listCard.forEach(appendCard);

}

//Initiate start of game by displaying cards
function Game() {

    $(".card").click(function() {
        $(".card").submit(function(event) {

            event.preventDefault();
        });
        startgame = true;
        if ($(this).hasClass("open show")) {
            return;
        }

        $(this).toggleClass("open show").animateCss('pulse');

        openCards.push($(this));
        Match();


    });

    //Function to find a match
    function Match() {


        if (openCards.length === 2) {

            if (openCards[0][0].firstChild.className === openCards[1][0].firstChild.className) {
                openCards[0].addClass('match').animateCss('rubberBand');
                openCards[1].addClass('match').animateCss('rubberBand');
                matchMade++;
                moves++;
                // disableCards();
                deleteCards();
                addMoves();
                stars();
            } else {
                openCards[0].addClass('wrong').animateCss('swing');
                (openCards[1].addClass('wrong').animateCss('swing'), delay / 0.5);
                moves++;
                setTimeout(function() {
                    remove()
                }, delay / 0.5);
                // disableCards();
                deleteCards();
                addMoves();
                stars();
            }
        }
        //if match made, return results || Sweetalert.js.org || https://github.com/PoBlue/memory-game
        if (matchMade === 8) {
            clearInterval(timer);
            swal({
                title: "Good job!",
                text: "You finished the game with " + moves + " moves, " + star + " star(s) in " + sec + " seconds",
                type: "success",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showSuccessButton: true,
                confirmButtonClass: "btn-success",
                confirmButtonText: "Restart",
                closeOnConfirm: true
            }).then(function(isConfirm) {
                if (isConfirm) {
                    reset();
                }
            });
        }
        function deleteCards() {
            openCards = [];
        }
    }
}
//function to remove the card display
function remove() {
    $(".card").removeClass("open show flash pulse swing wrong");

}
//function to add number of moves to html page
function addMoves() {
    $(".moves").html(moves);
}

//function to disable card click
function disableCards() {
    openCards.forEach(function(card) {

        card.off("click");
    });

}
//Function to reset game
function reset() {
    openCards = [];
    $(".card").removeClass("open show flash pulse swing wrong match");
    moves = 0;
    $(".seconds").html("0");
    addMoves();
    matchMade = 0;
    deck.empty();
    cardHTML();
    Game();
    sec = 0;
    resetStars();
    startTimer();
}
//function to remove stars based on number of moves made
function stars() {

    if (moves === thirdStar) {
        $(".fa-star").eq(0).removeClass('fa-star').addClass('fa-star-o');
        star = 0;
    }
    if (moves === secondStar) {
        $(".fa-star").eq(1).removeClass('fa-star').addClass('fa-star-o');
        star = 1;
    }

    if (moves === firstStar) {
        $(".fa-star").eq(2).removeClass('fa-star').addClass('fa-star-o');
        star = 2;
    }
}
//Reset stars
function resetStars() {
    $(".fa-star-o").remove();
    $(".fa-star").remove();

    for (var i = 0; i < 3; ++i) {
        $(".stars").append('<li><i class="fa fa-star"></i></li>');
    }
}
//Reset button click
$(".fa-repeat").click(function() {
    reset();
});

//start timer when a card is clicked on || https://github.com/shannonj498/memory-matching-game/
function startTimer() {
    let cardclick = 0;
    $(".card").click(function() {
        cardclick += 1;
        if (cardclick === 1) {
            timer = setInterval(function() {
                $(".seconds").html(++sec);
            }, 1000);
        }
    })
}

//Add animation to game 
$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});
