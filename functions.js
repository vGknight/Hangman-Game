 var listOfWords = ["pulp fiction", "the godfather", "the shawshank redemption", "goodfellas", "fight club", "forest gump"];
 var wordToGuess = listOfWords[Math.floor(Math.random() * listOfWords.length)];
 var maxAttempts = 20; //how many guesses the user gets
 var numAttempts = 0; //sets attempts to 0 for new game //number of Guesses in current session
 var numWins = 0; //Wins - tracks how many times you won
 var numRemaingAttempts = 20; //number of guesses per round
 var choices = []; // array to store choices user made
 var validChoices = []; // used to store good guesses
 var lettersLeft = wordToGuess.split(""); // contains letters that need to be guessed to win, if any letters are in this array then the game is not won - populated from
 var wordArray = wordToGuess.split("");
 var correctWordsList = []


 document.onkeyup = function(event) {

     var pressedKeyAny = event.key;
     var pressedKey = pressedKeyAny.toLowerCase(); //sanitize input
     // var myst = (showLetter(wordArray, pressedKey, validChoices));
     //win condition

     //checks if user choice is a repeat
     if (isValueInArr(choices, pressedKey)) { // is the chosen letter in our list of previously chosen letters?

         return;
     } else {
         choices.push(pressedKey);

         // now we can evaluate if the letter is in the winning word array

         if (isValueInArr(wordArray, pressedKey)) { // checks if key pressed is in the Winning word array
             validChoices.push(pressedKey); // add to good guesses array
             numAttempts++
             // numRemaingAttempts--
             updateRemainingGuessDiv();
             updateLettersGuessedDiv(choices);
             //show correctly chosen letter to user

             var show = (showLetter(wordArray, pressedKey, validChoices)); // updates array to what user should
             updateWordDiv(show);
             removeItems(lettersLeft, pressedKey); // removes chosen letter from LettersLeft array
             winCondition(lettersLeft); // evaluates letters

         } else {

             numRemaingAttempts--;
             updateRemainingGuessDiv();
             updateLettersGuessedDiv();

             //html
             var show = (showLetter(wordArray, pressedKey, validChoices)); // should write function for this since its repeated
             updateWordDiv(show);
             winCondition(lettersLeft);
         }
     }
 }


 function isValueInArr(array, letter) // Chicken test returns true if value in array
 {
     for (var i = 0; i < array.length; i++) {
         if (array[i] == letter) {
             return true;

         }
     }

 }


 //checks for empty array, if empty it means all letters have been guessed (and removed by the removeItems fn) therefore for this game if this function is run on an array that contains 
 function winCondition(check) {

     if (numRemaingAttempts > 0) {
         if (check.length == 0) {

             //win condition met
             // winWordDiv(wordToGuess);
             correctWordsList.push(wordToGuess);
             document.querySelector("#word").innerHTML = wordToGuess;

             
             // var test = arrToUl(correctWordsList);
             // addToWinningChoicesDiv(test);

             // document.querySelector("#win-words").innerHTML = wordToGuess;


             playAgain("win")
         } else {
             return;
         }
     } else { //ran out of attempts
         playAgain("lose");
     }

 }

 function removeItems(array, removeme) {
     // loop through array and remove all indexes where value == removeme , since .splice() reduces the lenght of the array we count backward  
     //if the word is poop [p,o,o,p] and the user guesses o,  then this will remove all indexes equal to o update the passed in array to [p,p]
     for (var i = array.length - 1; i >= 0; i--) {
         if (array[i] == removeme) {
             array.splice(i, 1);
         }
     }
 }

 function playAgain(outcome) {

     if (outcome == "win") {
         numWins++;
         updateWinsDiv();
         resetGame();
         return;

     } else if (outcome == "lose") {

         updateWinsDiv();
         resetGame();


     } else {
         return;
     }

 }


 function showLetter(wordArr, letter, goodChoice) { // pass in split win word array, letter chosen and list of good answers

     var arrUpdate = wordArr.slice(); // create copy of array to fill with -
     var arrUpdate = arrUpdate.fill("-"); // replace all items in the array with -
     for (var i = 0; i < wordArr.length; i++) { //loop through word to guess array - 

         if (isValueInArr(goodChoice, wordArr[i])) { // does letter exist in good choice list?

             arrUpdate.splice(i, 1, wordArr[i]) // show letter by replacing "-" with letter

         } else {

             continue;
         }
     }
     return arrUpdate;
 }

 function updateRemainingGuessDiv() {

     var html = "<p>Remaining Attempts: " + numRemaingAttempts + "</p>";
     document.querySelector("#NumGuessesRemaining").innerHTML = html;
 }


 function updateWordDiv(arr) { // Update Letters Guessed
     var html = "<p>Current Word: " + arr.join(' ') + "</p>";
     document.querySelector("#word").innerHTML = html;
 }

 function winWordDiv(word) { // Update Letters Guessed
     var html = "<p>mystery word: " + word + "</p>";
     document.querySelector("#word").innerHTML = html;
 }

 function updateWinsDiv() {
     var html = "<p>Wins: " + numWins + "</p>";
     document.querySelector("#wins").innerHTML = html;
 }

 function updateLettersGuessedDiv(arr) {
     var html = "<p>Letters Guessed: " + choices + "</p>";
     document.querySelector("#LettersGuessed").innerHTML = html;
 }


// function addToWinningChoicesDiv(arr) {
//      // var html = "<p>Letters Guessed: " + arr + "</p>";
//      var html =  arr;
//      // document.querySelector("#win-words").innerHTML = html;
//      // document.querySelector("#win-words").appendChild(html);

//      var node = arr;
//      var 
//      document.querySelector("#win-words").childNodes[0].replaceChild(html);
//  }

 function resetGame() {

     maxAttempts = 20; //how many guesses the user gets
     numAttempts = 0; //sets attempts to 0 for new game //number of Guesses in current session
     numRemaingAttempts = 20; //number of guesses remaining
     choices = []; // empty choices array for next game
     validChoices = [];
     wordToGuess = listOfWords[Math.floor(Math.random() * listOfWords.length)];
     // updateWordDiv
     (wordArray);
     lettersLeft = wordToGuess.split(""); // contains letters that need to be guessed to win, if any letters are in this array then the game is not won - populated from
     wordArray = wordToGuess.split("");
     // updateWordDiv
     (wordArray);
     var arrUpdate = wordArray.slice(); // create copy of array to fill with *
     var arrUpdate = arrUpdate.fill("-");
     updateWordDiv(arrUpdate);
     updateRemainingGuessDiv();
     updateLettersGuessedDiv();
 }

 // creates UL to use in other functions
 function arrToUl(arr) {
     var ul = document.createElement('ul'),
         li;
     for (var i = 0; i < arr.length; i++) {
         li = document.createElement('li');
         lid = document.getElementsByTagName('li')

         li.appendChild(document.createTextNode(arr[i]));
         // li.appendChild(document.setAttribute("id", "stuff"));
         // lid.setAttribute("id",i);


         ul.setAttribute("id", "inline"); //creates id on list element to "inline" CHANGE THIS to be more dynamic
         ul.appendChild(li);
     }
     console.log(ul);
     return ul;


     // show in winning choices
 }