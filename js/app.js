/*
 * Create a list that holds all of your cards

 */
$(".modal").hide();
let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-anchor", "fa-anchor", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle"];
let deck = $(".deck");
let openCards =[];
let startgame=true;
let moves = 0;
let matchMade =0;
let delay = 400;
let second = 0;
let firstStar = 1;
let secondStar = 2;
let  thirdStar = 10;
let star = 3;
cardHTML();
Game();





/*function Time() {
  currentTimer = setInterval(function () {

    $(".timer").text(second);
    second = second + 1
  }, 1000);
}
*/
function stars (){

  
    
    if( moves === thirdStar) {
    $(".fa-star").eq(0).removeClass('fa-star').addClass('fa-star-o');
    star = 2;
    }
    if ( moves === secondStar) {
    $(".fa-star").eq(1).removeClass('fa-star').addClass('fa-star-o');
    star = 1;
  }

    if(moves===firstStar) {
    $(".fa-star").eq(2).removeClass('fa-star').addClass('fa-star-o');
    star = 0;
    }
  
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function cardHTML(){
let listCard = shuffle(cards);
listCard.forEach(appendCard) ;


}

function appendCard(card) {
  deck.append('<li class="card" ><i class="fa ' + card +'"></i></li>');

}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Initiate start of game by displaying a cards symbol
function Game(){
//Time();

$(".card").click(function(){
  startgame = true;
  if ($(this).hasClass("open show")) { return; }

  $(this).toggleClass("open show").animateCss('pulse');

     openCards.push($(this));
     Match();

     
});
function Match(){


  if(openCards.length === 2){
  
    if(openCards[0][0].firstChild.className === openCards[1][0].firstChild.className){
       
          
        openCards[0].addClass('match').animateCss('rubberBand');
        openCards[1].addClass('match').animateCss('rubberBand');
   
        matchMade ++;
        moves++;
                disableCards();
                deleteCards();
                addMoves();
                stars();

    } else {
      
      openCards[0].addClass('wrong').animateCss('swing');
      (openCards[1].addClass('wrong').animateCss('swing'), delay/0.5);
      moves++;
      
                        addMoves();
                        stars();
            deleteCards();
            setTimeout(function () {
          remove() }, delay /0.5);
          
        disableCards();
    }
  }

  if(matchMade === 1) {
     
     swal( {
      title: "Good job!", 
      text:"You finished the game with " + moves +" moves" + " " + star + " star(s)", 
      type:"success",
      showSuccessButton:true,
      confirmButtonClass:"btn-success",
      confirmButtonText: "Play Again!",
      closeOnConfirm: true
     }).then (function(isConfirm) {
       if(isConfirm){
        reset();
       }
      });
      
    
      }


  function deleteCards(){
  openCards = [];
}
  


}

}

function remove () {
  $(".card").removeClass("open show flash pulse swing wrong");

}
 function addMoves() {
  $(".moves").html(moves);
 }
function disableCards (){
  openCards.forEach( function(card) {
    // statements
    card.off("click");
  });
   
}


  function reset() {
   openCards = [];
   $(".card").removeClass("open show flash pulse swing wrong match");
   moves = 0;
   addMoves();
   matchMade = 0;
   $(".fa-star").removeClass('fa-star-o');
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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)


 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
